import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { Checkbox } from "../../Checkbox";

interface HabitListProps {
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

export const HabitList = ({ date }: HabitListProps) => {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString(),
            },
        }).then((response) => {
            setHabitsInfo(response.data);
        });
    }, []);

    const handleToggleHabit = async (habitId: string) => {
        await api.patch(`/habits/${habitId}/toggle`);
    
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

        let completedHabits: string[] = [];
    
        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter((id) => id !== habitId);
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        });
    };

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map((habit) => (
                <Checkbox 
                    key={habit.id}
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                    checked={habitsInfo?.completedHabits.includes(habit.id)}
                    disabled={isDateInPast}
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