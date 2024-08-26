import React, { useState } from "react";

export const SectionTabs = () => {
	// Cambiar acá para poner cual de todos es el principal
	const [activeTab, setActiveTab] = useState('Routines');

	const handleTabChange = (e) => {
		setActiveTab(e.target.value);
	};

	const handleTabClick = (e, tabName) => {
		e.preventDefault();
		setActiveTab(tabName);
	};

	const handleSectionClick = (e) => {
		e.preventDefault();
	};

	const renderContent = () => {


		switch (activeTab) {
			case 'Routines':
				return (
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16  animate__animated animate__fadeIn">
						<div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
							<img
								alt=""
								src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg"
								className="absolute inset-0 h-full w-full object-cover   animate__animated animate__fadeIn"
							/>
						</div>
						<div className="lg:py-24 flex flex-col items-center md:items-start">
							<h2 className="text-3xl font-bold sm:text-4xl text-neutral-50">Rutinas</h2>
							<p className="mt-4 text-neutral-200">
								Consulta una visión general de tu día, con un resumen de tus rutinas, y progreso hacia tus objetivos. Todo en un solo lugar para comenzar tu día con el pie derecho.
							</p>
							<a
								onClick={(e) => handleSectionClick(e)}
								href="#"
								className="mt-8 inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
							>
								Ver Rutinas
							</a>
						</div>
					</div>
				);
			case 'Stats':
				return (
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16  animate__animated animate__fadeIn">
						<div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
							<img
								alt=""
								src="https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg"
								className="absolute inset-0 h-full w-full object-cover  animate__animated animate__fadeIn"
							/>
						</div>
						<div className="lg:py-24 flex flex-col items-center md:items-start">
							<h2 className="text-3xl font-bold sm:text-4xl text-neutral-50">Estadísticas</h2>
							<p className="mt-4 text-neutral-200">
								Revisa un resumen de tu progreso, con mejoras en fuerza, resistencia y composición corporal, para ver claramente cómo has avanzado desde el inicio.
							</p>
							<a
								onClick={(e) => handleSectionClick(e)}
								href="#"
								className="mt-8 inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
							>
								Ver Estadísticas
							</a>
						</div>
					</div>
				);
			case 'Archive':
				return (
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16  animate__animated animate__fadeIn">
						<div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
							<img
								alt=""
								src="https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg"
								className="absolute inset-0 h-full w-full object-cover  animate__animated animate__fadeIn"
							/>
						</div>
						<div className="lg:py-24 flex flex-col items-center md:items-start">
							<h2 className="text-3xl font-bold sm:text-4xl text-neutral-50">Archive</h2>
							<p className="mt-4 text-neutral-200">
								Archive Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veniam sed recusandae!
							</p>
							<a
								onClick={(e) => handleSectionClick(e)}
								href="#"
								className="mt-8 inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
							>
								View Archive
							</a>
						</div>
					</div>
				);
			case 'Notifications':
			default:
				return (
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16  animate__animated animate__fadeIn">
						<div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
							<img
								alt=""
								src="https://images.pexels.com/photos/703012/pexels-photo-703012.jpeg"
								className="absolute inset-0 h-full w-full object-cover  animate__animated animate__fadeIn"
							/>
						</div>
						<div className="lg:py-24 flex flex-col items-center md:items-start">
							<h2 className="text-3xl font-bold sm:text-4xl text-neutral-50">Notifications</h2>
							<p className="mt-4 text-neutral-200">
								Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam veniam sed recusandae!
							</p>
							<a
								onClick={(e) => handleSectionClick(e)}
								href="#"
								className="mt-8 inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
							>
								View Notifications
							</a>
						</div>
					</div>
				);
		}
	};

	return (
		<div>
			<div className="flex justify-center ">
				<div className="md:w-max ">
					<nav className="-mb-px flex gap-6 flex-wrap justify-center md:justify-start md:flex-nowrap" aria-label="Tabs">
						<a
							href="#"
							onClick={(e) => handleTabClick(e, 'Routines')}
							className={`w-2/5 text-center md:text-start md:w-auto shrink-0 border-b-2 px-1 pb-4 text-sm font-medium transition-all ${activeTab === 'Routines'
								? 'border-emerald-500 text-neutral-200'
								: 'border-transparent text-emerald-500 hover:border-emerald-300 hover:text-emerald-700'
								}`}
						>
							Rutinas
						</a>

						<a
							href="#"
							onClick={(e) => handleTabClick(e, 'Stats')}
							className={`w-2/5 text-center md:text-start md:w-auto shrink-0 border-b-2 px-1 pb-4 text-sm font-medium transition-all ${activeTab === 'Stats'
								? 'border-emerald-500 text-neutral-200'
								: 'border-transparent text-emerald-500 hover:border-emerald-300 hover:text-emerald-700'
								}`}
						>
							Estadísticas
						</a>

						<a
							href="#"
							onClick={(e) => handleTabClick(e, 'Archive')}
							className={`w-2/5 text-center md:text-start md:w-auto shrink-0 border-b-2 px-1 pb-4 text-sm font-medium transition-all  ${activeTab === 'Archive'
								? 'border-emerald-500 text-neutral-200'
								: 'border-transparent text-emerald-500 hover:border-emerald-300 hover:text-emerald-700'
								}`}
						>
							Archive
						</a>

						<a
							href="#"
							onClick={(e) => handleTabClick(e, 'Notifications')}
							className={`w-2/5 text-center md:text-start md:w-auto shrink-0 border-b-2 px-1 pb-4 text-sm font-medium transition-all  ${activeTab === 'Notifications'
								? 'border-emerald-500 text-neutral-200'
								: 'border-transparent text-emerald-500 hover:border-emerald-300 hover:text-emerald-700'
								}`}
						>
							Notifications
						</a>
					</nav>
				</div>
			</div>

			<section>
				<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
					{renderContent()}
				</div>
			</section>
		</div>
	);
};
