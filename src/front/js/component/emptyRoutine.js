import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const EmptyRoutine = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="w-3/4 min-h-[60vh] mx-auto flex rounded-md flex-col items-center gap-4 py-5 px-5 bg-neutral-800 border-neutral-700 relative">

				{/* Title */}
				<span className="relative flex justify-center w-full sm:w-3/4">
					<div
						className="absolute inset-x-0 top-1/2 h-px -translate-y-3/4 bg-red bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
					></div>
					<span className="relative z-10 text-white font-bold px-2 sm:px-6 bg-neutral-800 sm:text-xl">Mi rutina</span>
				</span>

				{/* Content */}
				<div className="h-full flex flex-col gap-4 justify-center m-auto  text-neutral-50">
					<h3>Aún no tienes una rutina semanal asignada.</h3>
					<div className="flex flex-col gap-4">
						Para comenzar, por favor utiliza el siguiente botón.
						<Link role="button"
							className="transition-all duration-100 rounded border w-max mx-auto border-emerald-600 px-12 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500"
							to="/routine/create">Crear una rutina</Link>
					</div>
				</div>
			</div>
		</>
	);
};
