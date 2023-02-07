import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import { Checkbox } from "./Checkbox";

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
];

export const NewHabitForm = () => {
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);

    const createNewHabit = async (event: FormEvent) => {
        event.preventDefault();

        if (!title || weekDays.length === 0) {
            return;
        }

        await api.post('habits', {
            title,
            weekDays,
        });

        setTitle('');
        setWeekDays([]);
    };

    const handleToggleWeekDay = (weekDay: number) => {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
            setWeekDays(weekDaysWithRemovedOne);
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay];
            setWeekDays(weekDaysWithAddedOne);
        }
    };

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label 
                htmlFor="title"
                className="font-semibold leading-tight"
            >
                Qual seu comprometimento?
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                className="
                    p-4 rounded-lg mt-3 bg-zinc-800 
                    text-white placeholder:text-zinc-400"
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="mt-3 flex flex-col gap-2">
                {availableWeekDays.map((weekDay, index) => (
                    <Checkbox 
                        key={weekDay}
                        onCheckedChange={() => handleToggleWeekDay(index)}
                        checked={weekDays.includes(index)}
                    >
                        <span className="text-white leading-tight">
                            {weekDay}
                        </span>
                    </Checkbox>
                ))}
            </div>

            <button
                type="submit"
                className="
                    mt-6 rounded-lg p-4 flex items-center justify-center
                    gap-3 font-semibold bg-green-600 hover:bg-green-500"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    );
};
