import React, { useEffect, useState } from 'react';

const useScroll = () => {
    const [scrollDirection, setScrollDirection] = useState('up');
    const [lastSrcoll, setLastScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY
            if (currentScroll > lastSrcoll) {
                setScrollDirection('down');
            }
            else {
                setScrollDirection('up');
            }
            setLastScroll(currentScroll);
        }
        window.addEventListener('scroll', handleScroll);

        // clean up
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastSrcoll])

    return scrollDirection;
};

export default useScroll;