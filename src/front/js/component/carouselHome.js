import React, { useContext, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { ExercisesList } from "../component/exercisesList";
import { Progress } from "../component/progress";
import { AddIcon, EditIcon } from "./icons";
import { Link } from "react-router-dom";

/* const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; */

const CarouselComplete = () => {
    const { store, actions } = useContext(Context);

    /*     useEffect(() => {
            actions.oneWeeklyRoutineUser(1);
        }, []) */
    // console.log(store.oneWeeklyRoutineUserList);

    return (
        <>

            {/* Title */}
            <span className="relative flex justify-center w-full sm:w-3/4">
                <div
                    className="absolute inset-x-0 top-1/2 h-px -translate-y-3/4 bg-red bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
                ></div>
                <span className="relative z-10 text-neutral-50 font-bold px-2 sm:px-6 bg-neutral-800 text-xl">Mi rutina</span>
            </span>

            {/* Buttons */}
            <div className="relative w-full z-10 flex items-center">
                <div className="md:absolute md:right-10 m-auto flex gap-2">
                    <button className="p-2 transition-all duration-150 rounded-lg border border-emerald-600 bg-transparent text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"><EditIcon /></button>
                    <Link to="/routine/create" className="p-2 transition-all duration-150 rounded-lg border border-emerald-600 bg-transparent text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"><AddIcon /></Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 justify-center m-auto w-full">
                <Carousel showThumbs={false} showStatus={false} swipeable={false}>

                    {store.oneWeeklyRoutineUserList.sort((a, b) => a.day - b.day).map((item, index) => (
                        <div key={index} className="w-full mx-auto min-h-[60vh] flex">
                            <ExercisesList weeklyRoutine={item} />
                        </div>
                    ))}
                </Carousel>
            </div>

        </>
    );
};

export const CarouselHome = () => {
    const { store, actions } = useContext(Context);

    /*    const randomValues = Array.from({ length: 3 }).map(() => ({
           exerciseValue: getRandomValue(1, 100),
           progressValue: getRandomValue(1, 100)
       })); */

    return (
        <>
            <CarouselComplete
            /*   randomValues={randomValues} */
            />
        </>
    );
};