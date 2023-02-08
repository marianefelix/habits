import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { Checkbox } from "../../Checkbox";

interface HabitsListProps {
    date: Date;
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string;
        title: string;
        created_at: string;
    }>;
    completedHabits: string[];
}

export const HabitsList = ({ date }: HabitsListProps) => {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString(),
            },
        }).then((response) => {
            setHabitsInfo(response.data);
        });
    }, []);

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map((habit) => (
                <Checkbox 
                    key={habit.id}
                    checked={habitsInfo?.completedHabits.includes(habit.id)}
                >
                    <span
                        className="font-semibold text-xl text-white
                        leading-tight group-data-[state=checked]:line-through 
                        group-data-[state=checked]:text-zinc-400"
                    >
                        {habit.title}
                    </span>
                </Checkbox>
            ))}
        </div>
    );
};