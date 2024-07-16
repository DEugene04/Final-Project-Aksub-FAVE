import React from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const ScrollAnimation = ({ animationName, children }) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return (
        <div ref={ref} className={`animate__animated category__choice ${inView ? `animate__${animationName}` : ''}`}>
            {children}
        </div>
    );
};

export default ScrollAnimation;
