import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstHabbitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabbitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabbitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabbitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabbitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabbitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
  await prisma.habbit.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create habbits
   */
  await Promise.all([
    prisma.habbit.create({
      data: {
        id: firstHabbitId,
        title: 'Beber 2L água',
        created_at: firstHabbitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
          ]
        }
      }
    }),

    prisma.habbit.create({
      data: {
        id: secondHabbitId,
        title: 'Exercitar',
        created_at: secondHabbitCreationDate,
        weekDays: {
          create: [
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    }),

    prisma.habbit.create({
      data: {
        id: thirdHabbitId,
        title: 'Dormir 8h',
        created_at: thirdHabbitCreationDate,
        weekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ]
        }
      }
    })
  ])

  await Promise.all([
    /**
     * Habbits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabbits: {
          create: {
            habbit_id: firstHabbitId,
          }
        }
      }
    }),

    /**
     * Habbits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabbits: {
          create: {
            habbit_id: firstHabbitId,
          }
        }
      }
    }),

    /**
     * Habbits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabbits: {
          create: [
            { habbit_id: firstHabbitId },
            { habbit_id: secondHabbitId },
          ]
        }
      }
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })