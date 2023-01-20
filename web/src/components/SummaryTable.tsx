import { HabbitDay } from "./HabbitDay"
import {generateDatesFromYearBeggining} from "../utils/generate-dates-from-year-beggining"

export function SummaryTable(){
    const weekDays = ['D', 'S', 'T', 'Q', "Q", 'S', "S"]
    const summaryDates = generateDatesFromYearBeggining()
    
    const minimunSummaryDatesSize = 18 * 7
    const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length

    return(
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, index) => {
                    return(
                        <div key={weekDay} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summaryDates.map((date, index) => {
                        return <HabbitDay key={index}/>
                    })
                }

                {
                    amountOfDaysToFill > 0 && Array.from({length:amountOfDaysToFill}).map((_, index) => {
                        return(
                            <div key={index} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed"/>
                        )
                    })
                }
            </div>
        </div>
    )
}