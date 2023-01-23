import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'

import { ProgressBar } from './ProgressBar'



interface HabbitDayProps {
    completed: number,
    amount: number
}

export function HabbitDay(props: HabbitDayProps){
    const amountCompletedPercentage = Math.round(props.completed/props.amount * 100)

    return(
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg",
            {'bg-violet-500 border-violet-400': amountCompletedPercentage >= 80,
            'bg-violet-600 border-violet-500': amountCompletedPercentage >= 60 && amountCompletedPercentage < 80,
            'bg-violet-700 border-violet-500': amountCompletedPercentage >= 40 && amountCompletedPercentage < 60,
            'bg-violet-800 border-violet-600': amountCompletedPercentage >= 20 && amountCompletedPercentage < 40,
            'bg-violet-900 border-violet-700': amountCompletedPercentage >= 0 && amountCompletedPercentage < 20,
            'bg-zinc-900 border-zinc-800': amountCompletedPercentage == 0


            }) }/>

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className='font-semibold text-zinc-400'></span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'></span>

                    <ProgressBar progress={40}/>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}