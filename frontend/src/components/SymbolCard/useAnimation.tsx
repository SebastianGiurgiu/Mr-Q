import React from 'react';

// Custom hook for managing animation and value updates
const useAnimation = (initialValue: number) => {
    // State to store the current value and animation class
    const [value, setValue] = React.useState<number>(initialValue);
    const [animationClass, setAnimationClass] = React.useState<string>('');

    const updateValueWithAnimation = (newValue: number) => {
        // Check if the change in value exceeds a threshold for animation
        if (value !== null) {
            if (Math.abs(value - newValue) > value * 0.25) {
                setAnimationClass('symbolCard__shake'); // Apply shake animation
            }

            // Determine whether to apply red or green shadow based on value change direction
            if (value > newValue) {
                setAnimationClass('symbolCard__redShadow'); // Apply red shadow for decrease
            } else if (value < newValue) {
                setAnimationClass('symbolCard__greenShadow'); // Apply green shadow for increase
            }
        }

        setValue(newValue);
    };

    // Cleanup animation class after a delay using useEffect
    React.useEffect(() => {
        // Cleanup the animation class after a delay
        const timeoutId = setTimeout(() => {
            setAnimationClass('');
        }, 1000);

        // Cleanup function to clear the timeout on component unmount or re-render
        return () => clearTimeout(timeoutId);
    }, [animationClass]);

    return [value, updateValueWithAnimation, animationClass] as const;
};

export default useAnimation;
