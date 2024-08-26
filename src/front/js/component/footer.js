import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { LogoGymtrack } from "./logoGymtrack";


export const Footer = () => {
	const location = useLocation();


	return (location.pathname != "/login" && location.pathname != "/signup") && (
		<footer className="bg-gradient-to-t from-neutral-800 to-neutral-900 ">


			<div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
					<a
						className="inline-block rounded-full bg-emerald-600 p-2 text-white shadow transition hover:bg-emerald-500 sm:p-3 lg:p-4"
						href="#"
					>
						<span className="sr-only">Back to top</span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>

				<div className="lg:flex lg:items-end lg:justify-between">
					<div>
						<div className="flex justify-center items-center text-teal-600 lg:justify-start">
							<LogoGymtrack logoSize="large" />

						</div>

						<p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-neutral-500 lg:text-left">
							GymTrack es tu aliado en cada paso de tu camino hacia un estilo de vida más saludable. Nos dedicamos a ofrecerte herramientas personalizadas y un soporte continuo para que puedas alcanzar tus objetivos de fitness con confianza y motivación.						</p>
					</div>

					<ul
						className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
					>
						<li>
							<a className="text-neutral-200 transition hover:text-neutral-200/75" href="#"> About </a>
						</li>

						<li>
							<a className="text-neutral-200 transition hover:text-neutral-200/75" href="#"> Services </a>
						</li>

						<li>
							<a className="text-neutral-200 transition hover:text-neutral-200/75" href="#"> Projects </a>
						</li>

						<li>
							<a className="text-neutral-200 transition hover:text-neutral-200/75" href="#"> Blog </a>
						</li>
					</ul>
				</div>

				<p className="mt-12 text-center text-sm text-neutral-500 lg:text-right">
					Copyright &copy; 2024. All rights reserved. GYMTRACK
				</p>
			</div>
		</footer>
	);
}


