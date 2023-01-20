import dayjs from 'dayjs'

export function generateDatesFromYearBeggining(){
    const fistDayOfTheYear = dayjs().startOf('year')
    const today = dayjs().toDate()

    const dates : Date[] = []
    let compareDate = fistDayOfTheYear

    while(compareDate.isBefore(dayjs(today))){
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates;
}