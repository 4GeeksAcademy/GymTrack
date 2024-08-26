import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { CarouselHome } from "../component/carouselHome";
import Streak from "../component/streak";
import { EmptyRoutine } from "../component/emptyRoutine";

export const MyRoutine = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.oneWeeklyRoutineUser(1);
	}, [])

	return (
		<>
			{store.oneWeeklyRoutineUserList && store.oneWeeklyRoutineUserList.length > 0 ? (
				<div className="w-11/12 md:w-3/4 min-h-[80vh] mx-auto flex rounded-md flex-col items-center gap-4 py-5 px-5 bg-neutral-800 border-neutral-700 relative">

					<CarouselHome />
					{/* <Streak /> */}
				</div>
			) : (

				<EmptyRoutine />
			)}
		</>
	);
};
