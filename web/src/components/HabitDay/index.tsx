import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Checkbox } from '../Checkbox';
import { ProgressBar } from '../ProgressBar';
import { HabitsList } from './List';

interface HabitDayProps {
    date: Date;
    amount?: number;
    completed?: number;
}

export const HabitDay = ({ date, amount = 0, completed = 0 }: HabitDayProps) => {
    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;
    const dayAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx('w-10 h-10  border-2 rounded-lg', {
                    'bg-zinc-900 border-zinc-800': completedPercentage === 0,
                    'bg-purple-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
                    'bg-purple-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
                    'bg-purple-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
                    'bg-purple-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
                    'bg-purple-500 border-violet-400': completedPercentage >= 80,

                })}
            />
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>
                    <ProgressBar progress={completedPercentage} />
                    <HabitsList date={date} />
                    <Popover.Arrow 
                        height={8}
                        width={16}
                        className="fill-zinc-900" 
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};