import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Progress } from "./progress";

export const ExercisesList = ({ weeklyRoutine }) => {
  const { store, actions } = useContext(Context);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleChange = async (e, exercise) => {
    // e.persist()
    if (e.target.checked == true) {
      setDone(done + 1)
      await actions.oneExerciseRoutine(weeklyRoutine.routine.id, exercise);
      const exerciseRoutine = await store.oneExerciseRoutine;
      await actions.postFollowUp(weeklyRoutine.id, exerciseRoutine.id)
    }
    if (e.target.checked == false) {
      setDone(done - 1)
      console.log(done);
      await actions.oneExerciseRoutine(weeklyRoutine.routine.id, exercise);
      const exerciseRoutine = await store.oneExerciseRoutine;
      await actions.deleteFollowUp(weeklyRoutine.id, exerciseRoutine.id)
    }
  }

  useEffect(() => {
    setTotal(weeklyRoutine.routine.exercises.length);
  }, [weeklyRoutine.routine.exercises]);

  useEffect(() => {
    setDone(weeklyRoutine.routine.exercises.filter(item => item.exercise.done === true).length);
  }, [weeklyRoutine.routine.exercises]);

  useEffect(() => {
    if (total > 0) {
      setPercentage((done / total) * 100)
    }
  }, [done, total]);

  useEffect(() => {
    console.log("done:", done);

  }, [done]);


  return (
    <>
      <div className="flex flex-col w-full gap-6">
        <div >
          <p className="font-bold text-lg md:text-xl text-white text-center">{weeklyRoutine.routine.name.toUpperCase()} | {weeklyRoutine.day}</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center lg:w-2/3 justify-center gap-4 mx-auto w-[80%]">

          <div className="lg:w-2/3 space-y-3 rounded-lg h-96 overflow-y-scroll pr-4">
            {weeklyRoutine.routine.exercises.map((item, index) => {
              return (
                < label
                  key={index}
                  htmlFor={`option ${index}`}
                  className="flex items-center cursor-pointer gap-4 rounded-lg border p-4 transition border-emerald-700 bg-neutral-700 "
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.exercise.done}
                      className="myCheckbox size-4 rounded border-emerald-300 bg-gray-800 ring-offset-emerald-900"
                      id={`option ${index}`}
                      name="name"
                      onChange={(e) => {
                        item.exercise.done = !item.exercise.done
                        handleChange(e, item.exercise.id)
                      }}
                    />
                    {/* {`option ${index}` == false ? setDone(done + 1) : null} */}
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.exercise.name}</p>
                  </div>
                </label>
              )
            })}
          </div >
          <Progress percentage={percentage} />
        </div>
      </div >
    </>
  );
};