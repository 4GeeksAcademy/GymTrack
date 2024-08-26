import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";
import { LogoGymtrack } from "./logoGymtrack";

import { HomeIcon, BarbellIcon, ChartbarIcon, StretchingIcon, ScaleIcon, LoginIcon, SignUpIcon, CloseIcon } from "./icons";

export const SideMenu = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const menuItems = [
    {
      to: '/',
      label: 'Inicio',
      icon: <HomeIcon strokeWidth={location.pathname === '/' ? '2' : '1.5'} />
    },
    {
      to: '/routine',
      label: 'Mi rutina',
      icon: <BarbellIcon strokeWidth={location.pathname === '/routine/new' ? '2' : '1.5'} />
    },
    {
      to: '/stats',
      label: 'Estadísticas',
      icon: <ChartbarIcon strokeWidth={location.pathname === '/stats' ? '2' : '1.5'} />
    },
    {
      to: '/exercises',
      label: 'Ejercicios',
      icon: <StretchingIcon strokeWidth={location.pathname === '/exercises' ? '2' : '1.5'} />
    },
    {
      to: '/weight',
      label: 'Peso corporal',
      icon: <ScaleIcon strokeWidth={location.pathname === '/weight' ? '2' : '1.5'} />
    },
    {
      to: '/profile',
      label: 'Perfil',
      icon: <LoginIcon strokeWidth={location.pathname === '/profile' ? '2' : '1.5'} />
    }
  ];


  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-neutral-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 md:w-64 w-screen h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} backdrop-blur`}
        aria-label="Sidenav"
      >
        <div className="flex flex-col overflow-y-auto py-5 px-3 h-full border-r bg-neutral-900/75 border-neutral-700 w-screen md:w-64">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center">
              <LogoGymtrack logoSize="medium" />
            </div>
            <button
              onClick={closeSidebar}
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-neutral-500 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
            >
              <span className="sr-only">Close sidebar</span>
              <CloseIcon />
            </button>
          </div>
          {store.currentUser ? (
            <div className="flex flex-col h-full justify-between">
              <ul className="space-y-2">
                {menuItems.map(item => (
                  <li key={item.to} className="flex items-center justify-between">
                    <Link
                      to={item.to}
                      onClick={closeSidebar}
                      className={`flex items-center w-full p-2 text-base font-normal rounded-lg group hover:bg-neutral-700 dark:hover:bg-neutral-800 ${location.pathname === item.to ? 'text-emerald-500' : 'text-neutral-900 dark:text-neutral-200'
                        }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  actions.logout();
                  closeSidebar();
                }}
                type="button"
                className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <ul className="space-y-2 flex flex-col w-full">
              <li className="flex w-full items-center active:scale-95 transition-all">
                <Link to='/login'
                  className="flex w-full justify-center items-center gap-2 rounded border border-emerald-600 px-12 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500"
                  onClick={closeSidebar}
                >
                  <LoginIcon />
                  <span className="text-sm font-bold"> Iniciar Sesión </span>
                </Link>
              </li>
              <li className="flex w-full items-center active:scale-95 transition-all">
                <Link to='/signup'
                  onClick={closeSidebar}
                  className="flex w-full justify-center items-center gap-2 rounded border border-emerald-600 px-12 py-3 text-sm font-medium text-emerald-400 hover:bg-emerald-600 hover:text-neutral-900 focus:outline-none active:bg-emerald-500 transition-all duration-100 ease-in"
                >
                  <SignUpIcon />
                  <span className="text-sm font-bold"> Registrarse </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </aside>

      <div
        className={`fixed top-0 right-0 h-screen transition-opacity duration-300 z-[30] backdrop-blur ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ width: isSidebarOpen ? `calc(100% - 16rem)` : '0' }}
        onClick={closeSidebar}
      ></div>
    </>
  );
};
