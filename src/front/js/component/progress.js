import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Progress = ({ percentage }) => {

    return (
        <div className="flex flex-col items-center justify-center gap-4 pb-11">
            <h3 className="text-neutral-50 mx-auto w-max text-md">Tu progreso</h3>
            <div className="w-[200px]
            ">
                <CircularProgressbar value={percentage}
                    text={`${typeof percentage === 'number' ? percentage.toFixed(0) : '0'}%`}
                    styles={buildStyles({

                        strokeLinecap: 'butt',

                        textSize: '16px',

                        pathTransitionDuration: 0.1,

                        pathColor: `rgba(16, 185, 129, ${percentage})`,
                        textColor: '#10b981',
                        trailColor: '#404040',
                        backgroundColor: '#0a0a0a',
                    })} />
            </div>
        </div>
    )
};