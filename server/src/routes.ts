import { FastifyInstance } from 'fastify'
import {prisma} from './lib/prisma'
import {z} from 'zod'
import dayjs from 'dayjs'

export async function appRoutes(app: FastifyInstance){
    app.post('/habbits', async (req,rres) => {
        const createHabbitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        })
        
        const {title, weekDays} = createHabbitBody.parse(req.body)
        const today = dayjs().startOf('day').toDate()

        await prisma.habbit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map( weekDay => {
                        return {
                            week_day: weekDay,
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async(req, res) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const {date} = getDayParams.parse(req.query)
        const parsedDate = dayjs(date).startOf('day')
        const weekDay = dayjs(parsedDate).get('day')

        const possibleHabbits = await prisma.habbit.findMany({
            where: {
                created_at: {
                    lte: date, 
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate()
            },
            include: {
                dayHabbits: true,
            }
        })

        const completedHabbits = day?.dayHabbits.map(dayHabbit => {
            return dayHabbit.habbit_id 
        })

        return possibleHabbits


    })

    app.patch('/habbits/:id/toggle', async (req, res) => {
        const toggleHabbitParams = z.object({
            id: z.string().uuid()
        })

        const {id} = toggleHabbitParams.parse(req.params)

        const today = dayjs().startOf('day').toDate()

        let day = await prisma.day.findUnique({
            where: {
                date: today,
            }
        })

        if(!day){
            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
        }

        const dayHabbit = await prisma.dayHabbit.findUnique({
            where: {
                day_id_habbit_id: {
                    day_id: day.id,
                    habbit_id: id
                }
            }
        })

        if(dayHabbit){
            await prisma.dayHabbit.delete({
                where: {
                    id: dayHabbit.id
                }
            })
        }else {
            await prisma.dayHabbit.create({
                data: {
                    day_id: day.id,
                    habbit_id: id
                }
            })
        }
    })

    app.get('/summary', async (req, res) => {

        const summary = await prisma.$queryRaw`
        SELECT D.id, D.date, (
            SELECT cast(count(*) as float) FROM day_habbits DH where DH.day_id = D.id 
        ) as completed, 
        (
            SELECT cast(count(*) as float) FROM habbit_week_days HWD
            JOIN habbits H ON H.id = HWD.habbit_id 
            WHERE HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int) /* Parsing the timestamp date on database */
            AND H.created_at <= D.date
        ) as amount FROM days D
        `
        return summary;
    })
}