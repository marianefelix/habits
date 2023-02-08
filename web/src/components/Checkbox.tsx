import React from 'react';

import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Check } from 'phosphor-react';

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
    children: React.ReactNode;
}

export const Checkbox = ({ children, ...props }: CheckboxProps) => {
    return (
        <CheckboxRadix.Root
            className="flex items-center gap-3 group"
           {...props}
        >
            <div className="h-8 w-8 rounded-lg 
                flex items-center justify-center 
                bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
            >
                <CheckboxRadix.Indicator>
                    <Check size={20} className="text-white" />
                </CheckboxRadix.Indicator>
            </div>
            {children}
        </CheckboxRadix.Root>
    );
};