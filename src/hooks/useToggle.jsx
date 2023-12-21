import { useState } from 'react';

export default function useToggle(defaultValue = false) {
    const [value, setValue] = useState(defaultValue);

    const toggleValue = (stateValue) => {
        if (typeof stateValue !== 'undefined') {
            if (typeof stateValue === 'boolean') {
                setValue(stateValue);
            } else {
                setValue((currentValue) => !currentValue);
            }
        } else {
            setValue((currentValue) => !currentValue);
        }
    };

    return [value, toggleValue];
}
