import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { Context } from "../store/appContext";

export const GraficoHistorico = () => {
    const { store, actions } = useContext(Context);
    const [pesos, setPesos] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [alturas, setAlturas] = useState([]);
    const [imc, setIMC] = useState([]);

    useEffect(() => {
        if (store.lastPhysicalUserInformationList.length > 0) {
            const pesosTemp = [];
            const alturasTemp = [];
            const fechasTemp = [];
            const imcTemp = [];

            store.lastPhysicalUserInformationList.forEach((item) => {
                pesosTemp.push(item.weight);
                alturasTemp.push(item.height);

                console.log(item)
                fechasTemp.push(item.date);
                const calculatedIMC = (item.weight / Math.pow(item.height / 100, 2)).toFixed(2);
                imcTemp.push(parseFloat(calculatedIMC));
            });

            setPesos(pesosTemp);
            setAlturas(alturasTemp);
            setFechas(fechasTemp);
            setIMC(imcTemp);
        }
    }, [store.lastPhysicalUserInformationList]);

    useEffect(() => {
        if (pesos.length > 0 && alturas.length > 0 && imc.length > 0 && fechas.length > 0) {
            const options = {
                series: [
                    {
                        name: "Peso",
                        data: pesos,
                        color: "#4ade80",
                    },
                    {
                        name: "Altura",
                        data: alturas,
                        color: "#1A56DB",
                    },
                    {
                        name: "IMC",
                        data: imc,
                        color: "#7E3BF2",
                    },
                ],
                chart: {
                    type: "area",
                    height: 350,
                    toolbar: { show: false },
                },
                xaxis: {
                    categories: fechas,
                    labels: {
                        rotate: -45,
                    },
                },
                yaxis: [
                    {
                        title: { text: "Peso (Kg)" },
                        labels: {
                            formatter: (value) => `${value} Kg`,
                        },
                    },
                    {
                        opposite: true,
                        title: { text: "Altura (cm)" },
                        labels: {
                            formatter: (value) => `${value} cm`,
                        },
                    },
                    {
                        opposite: true,
                        title: { text: "IMC" },
                        labels: {
                            formatter: (value) => value,
                        },
                    },
                ],
                tooltip: {
                    shared: true,
                    intersect: false,
                },
            };

            const chart = new ApexCharts(document.getElementById("combined-chart"), options);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [pesos, alturas, imc, fechas]);

    useEffect(() => {
        actions.get_last_physical_user_information();
        console.log(store.lastPhysicalUserInformationList);
    }, [actions]);

    return (
        <div className="w-2/3 bg-white rounded-lg shadow dark:bg-neutral-800 p-4 md:p-6 mx-auto">
            <span className="relative flex justify-center w-full sm:w-3/4 mx-auto">
                <div
                    className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
                ></div>
                <span className="relative z-10 text-neutral-50 font-bold px-2 sm:px-6 bg-neutral-800 text-xl">Historico corporal</span>
            </span>
            <div id="combined-chart"></div>
        </div>
    );
};
