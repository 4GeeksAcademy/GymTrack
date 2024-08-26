

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";
import { ImageSpotlightBorder } from "./imageSpotlightBorder"
import imgHome from "../../img/home-img-01.jpg"
import TextTypingEffectWithTextsFadeOut from "./textTypingEffectWithTexts";

export const HomeBanner = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();


    return (
        <>
            <div className="overflow-hidden flex flex-col sm:grid sm:grid-cols-2 items-center w-11/12 mx-auto">
                <div className="mx-auto my-4 justify-center md:w-10/12 flex flex-col gap-4 items-center text-center ltr:sm:text-left rtl:sm:text-right h-full">



                    {
                        !store.currentUser
                            ? <>
                                <div className="md:h-auto min-h-32 flex items-center">
                                    <TextTypingEffectWithTextsFadeOut />
                                </div>

                                <p className="hidden text-gray-500 md:mt-4 md:block">
                                    Ya sea que quieras ganar masa muscular, perder peso, o simplemente mantener un estilo de vida saludable, GymTrack está aquí para ayudarte en cada paso del camino. Regístrate ahora y empieza a transformar tu rutina de ejercicio en un plan efectivo y motivador.
                                </p>

                                <div className="mb-0 md:mt-8 flex gap-2">
                                    <Link
                                        to="./signup"
                                        className="flex items-center rounded border border-emerald-600 md:px-12 px-8 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500 transition-all duration-100 ease-in"
                                    >
                                        Registrarse
                                    </Link>
                                    <Link
                                        to="./login"
                                        className="flex items-center rounded border border-emerald-600 md:px-12 px-8 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500 transition-all duration-100 ease-in"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </div>
                            </>
                            : <>
                                <div className="md:h-auto">
                                    <h2 className="text-4xl text-white">Bienvenido de vuelta, {store.currentUser.user.name}</h2>
                                </div>

                                <p className="hidden text-gray-500 md:mt-4 md:block">
                                    Sigue adelante con tu plan personalizado para alcanzar tus metas, ya sea ganar masa muscular, perder peso, o mantener un estilo de vida saludable. Continúa transformando tu rutina en un plan efectivo y motivador con las herramientas que necesitas, justo aquí, a tu alcance.
                                </p>

                                <div className="mb-0 md:mt-8 flex gap-2">
                                    <Link
                                        to="./routine"
                                        className="flex items-center rounded border border-emerald-600 px-8 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500 transition-all duration-100 ease-in"
                                    >
                                        Ir a Mi rutina
                                    </Link>
                                    <Link
                                        to="./stats"
                                        className="flex items-center rounded border border-emerald-600 px-8 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500 transition-all duration-100 ease-in"
                                    >
                                        Ir a Estadisticas
                                    </Link>
                                </div>
                            </>
                    }
                </div>

                <ImageSpotlightBorder src={imgHome} alt="Home Image" />
            </div>
        </>
    );
};
