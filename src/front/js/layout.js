import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { CreateRoutine } from "./pages/createRoutine";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Single } from "./pages/single";
import { Private } from "./pages/private";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Profile } from "./pages/profile";
import { ToastContainer } from "react-toastify";

import { VistaPrueba } from "./pages/vistaPrueba.jsx";
import { MyRoutine } from "./pages/myroutine";
import { Exercises } from "./pages/exercises";
import { ErrorView } from "./pages/error";
import { Stats } from "./pages/stats";
import ProtectedRoute from "./component/protectedRoute";


const usePageTitle = (defaultTitle) => {
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'Inicio | GYMTRACK';
                break;
            case '/vistaprueba':
                document.title = 'Vista Prueba | GYMTRACK';
                break;
            case '/exercises':
                document.title = 'Ejercicios | GYMTRACK';
                break;
            case '/routine':
                document.title = 'Mi rutina | GYMTRACK';
                break;
            case '/stats':
                document.title = 'Estadísticas | GYMTRACK';
                break;
            case '/login':
                document.title = 'Iniciar sesión | GYMTRACK';
                break;
            case '/signup':
                document.title = 'Registrarse | GYMTRACK';
                break;
            case '/private':
                document.title = 'Private | GYMTRACK';
                break;
            case '/profile':
                document.title = 'Perfil | GYMTRACK';
                break;
            case '/routine/create':
                document.title = 'Crear rutina | GYMTRACK';
                break;
            case '/single':
                document.title = 'Single | GYMTRACK';
                break;
            default:
                document.title = defaultTitle;
        }
    }, [location, defaultTitle]);
};

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div className="bg-neutral-900 min-h-screen flex flex-col gap-6">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <PageTitleManager defaultTitle="GYMTRACK" />
                    <Navbar />
                    <Routes>
                        {/* Rutas publicas */}
                        <Route element={<Home />} path="/" />
                        <Route element={<VistaPrueba />} path="/vistaprueba" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ErrorView />} path="/*" />

                        {/* Rutas protegidas */}
                        <Route element={<ProtectedRoute><Stats /></ProtectedRoute>} path="/stats" />
                        <Route element={<ProtectedRoute><Exercises /></ProtectedRoute>} path="/exercises" />
                        <Route element={<ProtectedRoute><Private /></ProtectedRoute>} path="/private" />
                        <Route element={<ProtectedRoute><Profile /></ProtectedRoute>} path="/profile" />

                        {/* Routine routes */}
                        <Route element={<ProtectedRoute><MyRoutine /></ProtectedRoute>} path="/routine" />
                        <Route element={<ProtectedRoute><CreateRoutine /></ProtectedRoute>} path="/routine/create" />

                        {/* Template ruta protegida */}
                        {/* <Route element={<ProtectedRoute>< VIEW /></ProtectedRoute>} path="" /> */}
                    </Routes>
                    <ToastContainer pauseOnHover={false} closeOnClick autoClose={2500} theme="dark" />
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

const PageTitleManager = ({ defaultTitle }) => {
    usePageTitle(defaultTitle);
    return null;
};

export default injectContext(Layout);
