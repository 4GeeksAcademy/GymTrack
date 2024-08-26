import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import "../../styles/home.css";
import ProfileIcon from "../component/profileIcon";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";
import { Badge } from "../component/badge";
import { CloseIcon } from "../component/icons";

export const Profile = () => {
  const { store, actions } = useContext(Context)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPopoverHover, setIsPopoverHover] = useState(false)
  const [userData, setUserData] = useState({
    height: 0,
    weight: 0,
  })

  const calcIMC = () => {
    const height = store.lastOnePhysicalUserInformation.height / 100
    const weight = store.lastOnePhysicalUserInformation.weight
    const result = weight / (height * height)
    return result.toFixed(1)
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    const editInfoPromise = new Promise(async (resolve, reject) => {
      const success = await actions.postPhysicalInformation(
        userData.height,
        userData.weight,
      );
      if (success === true) {
        setIsModalOpen(false)
        resolve("Registro exitoso");
        actions.get_last_one_physical_user_information()
        calcIMC()
      } else {
        reject("Error al registrarse");
      }
      success = true
    });

    toast.promise(
      editInfoPromise,
      {
        pending: 'Guardando...',
        success: 'Guardado exitoso 😎',
        error: 'Error al guardar'
      }
    );
  };

  useEffect(() => {
    actions.get_last_one_physical_user_information()
    calcIMC()
  }, [])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleDeleteSubmit = async (e) => {
    e.preventDefault()

    // Crear una promesa para manejar el login
    const deleteAccount = new Promise(async (resolve, reject) => {
      const success = await actions.deleteAccount()
      if (success === true) {
        resolve("Cuenta Eliminada")
      } else {
        reject("Elimincacion fallida")
      }
    })

    toast.promise(
      deleteAccount,
      {
        pending: 'Eliminando...',
        success: 'Cuenta eliminada exitosamente 👌',
        error: 'No se pudo eliminar su cuenta 🤯'
      }
    )

    deleteAccount.then(() => {
      navigate("/")
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="sm:w-2/3 w-11/12 mx-auto flex flex-col items-center gap-4 justify-between overflow-y-auto py-5 px-3 h-full bg-neutral-800 border-neutral-700 relative min-h-[800px]">
      <h1 className="text-neutral-50 font-bold text-3xl">Perfil</h1>
      <div className="flex flex-col items-center">
        {
          !store.currentUser ? <>
            <div role="status" className="animate-pulse rtl:space-x-reverse md:flex md:items-center">
              <div className="size-40 rounded-full flex items-center justify-center bg-neutral-300 dark:bg-neutral-700">
                <svg className="w-10 h-10 text-neutral-200 dark:text-neutral-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <spanath d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </> : <ProfileIcon gender={store.currentUser.user.sex} />
        }

        <h2 className=" text-neutral-50 font-bold text-3xl">
          {!store.currentUser
            ? <>
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-10 bg-neutral-200 rounded-full dark:bg-neutral-700 w-20"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
            : store.currentUser.user.name
          }
        </h2>
        <span className="text-neutral-400 font-bold text-base">
          {!store.currentUser
            ? <>
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-4 bg-neutral-200 rounded-full dark:bg-neutral-700 w-32 mt-3"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
            : store.currentUser.user.email
          }
        </span>
      </div>
      <div className="flex flex-col text-neutral-200 sm:w-11/12 w-4/6 p-6 gap-4">

        {/* <div className="grid gap-1">
					<div className="text-xs font-bold  text-neutral-400">Email</div>
					<div>marilop@gmail.com</div>
				</div> */}
        <div className="grid gap-1">
          <div className="text-xs font-bold text-neutral-400">Fecha de nacimiento</div>
          <div className="text-lg">
            {
              !store.currentUser
                ? <>
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-28"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
                : new Date(store.currentUser.user.birthday).toLocaleDateString("es-UY", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })
            }
          </div>
        </div>
        <div className="grid gap-1">
          <div className="text-xs font-bold  text-neutral-400">Sexo</div>
          <div className="text-lg">
            {!store.currentUser ? (
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-32 mt-3"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : store.currentUser.user.sex === 'male' ? 'Masculino'
              : store.currentUser.user.sex === 'female' ? 'Femenino'
                : 'Desconocido'}
          </div>
        </div>
        <div className="grid gap-1">
          <div className="text-xs font-bold  text-neutral-400">Peso</div>
          <div className="text-lg">
            {!store.lastOnePhysicalUserInformation
              ? <>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-16"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
              : `${store.lastOnePhysicalUserInformation.weight} kg`
            }
          </div>
        </div>
        <div className="grid gap-1">
          <div className="text-xs font-bold  text-neutral-400">Altura</div>
          <div className="text-lg">
            {!store.lastOnePhysicalUserInformation
              ? <>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-20"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
              : `${store.lastOnePhysicalUserInformation.height} cm`
            }
          </div>
        </div>

        <div className="grid gap-1">
          <div className="text-xs font-bold  text-neutral-400">
            <div className="flex items-center gap-2">
              IMC
              <span
                className="text-white group"
                onClick={() => setIsPopoverHover(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-info-square-rounded"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" /></svg>
              </span>
            </div>

            <div data-popover id="popover-default" role="tooltip" className={`w-72 md:w-96 p-1 sm:p-4 absolute right-1/2 -translate-y-3/4 translate-x-1/2 z-10 text-sm text-neutral-500 bg-white border border-neutral-200 rounded-lg shadow-sm ${isPopoverHover ? 'opacity-100 visible' : 'opacity-0 invisible'} dark:text-neutral-400 dark:border-neutral-600 dark:bg-neutral-800`}>
              <div className="flex items-center justify-between px-1 bg-neutral-100 border-b border-neutral-200 rounded-t-lg dark:border-neutral-600 dark:bg-neutral-700">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Tabla de IMC</h3>
                <button
                  onClick={() => setIsPopoverHover(false)}
                  className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="px-3 py-2">
                <div className="relative overflow-y-auto">
                  <table className="w-full text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
                    <thead className="text-xs text-neutral-700 border-b border-neutral-700 dark:text-neutral-400 uppercase">
                      <tr>
                        <th scope="col" className="text-left text-xs lowercasse px-6 py-2">
                          Composición corporal
                        </th>
                        <th scope="col" className="px-6 py-2">
                          IMC
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      <tr className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
                        <th scope="row" className="px-6 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                          Peso inferior al normal
                        </th>
                        <td className="px-6 py-2">
                          Menos de 18.5
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-neutral-800 dark:border-neutral-700">
                        <th scope="row" className="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                          Normal
                        </th>
                        <td className="px-6 py-2">
                          18.5 – 24.9
                        </td>
                      </tr>
                      <tr className="bg-white border-b dark:border-neutral-700 dark:bg-neutral-800">
                        <th scope="row" className="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                          Peso superior al normal
                        </th>
                        <td className="px-6 py-2">
                          25.0 – 29.9
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-neutral-800">
                        <th scope="row" className="px-6 py-2 font-medium text-neutral-900 whitespace-nowrap dark:text-white">
                          Obesidad
                        </th>
                        <td className="px-6 py-2">
                          Más de 30.0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
              <div data-popper-arrow></div>
            </div>

          </div>
          <div className="text-lg" >
            {!store.lastOnePhysicalUserInformation
              ? <>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded-full dark:bg-neutral-700 w-20"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
              : <div className="flex items-center gap-3">
                {calcIMC()}
                <Badge imc={calcIMC()} />
              </div>
            }
          </div>
        </div>
      </div>

      {/* modal toggle */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="block text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded text-sm px-5 py-3 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          type="button"
        >
          Editar información física
        </button>
        {/* <button type="button" className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" href="#">Desactivar cuenta</button> */}
        {/* <!-- Modal toggle --> */}
        <button onClick={() => setIsDeleteModalOpen(true)} className="place-self-center inline-block rounded border border-current px-5 py-3 text-sm font-medium text-neutral-400 hover:text-red-300 transition hover:scale-105 hover:shadow-xl focus:outline-none active:text-red-500 active:scale-95" type="button">
          Eliminar cuenta
        </button>

        {/* <!-- Main modal --> */}
        <div tabIndex="-1" aria-hidden="true" className={`${isDeleteModalOpen ? '' : 'hidden'}  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative rounded-lg shadow dark:bg-neutral-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-700">
                <h3 className="text-xl text-neutral-50 font-bold">
                  Eliminar cuenta permanentemente
                </h3>
                <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white">
                  <CloseIcon />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-xs font-bold uppercase text-neutral-400">
                  Su cuenta se eliminara de manera permanente, asi como sus rutinas e informacion fisica.
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-4 md:p-5 border-t border-neutral-200 rounded-b dark:border-neutral-600">
                <button onClick={handleDeleteSubmit} type="button" className="transition-all duration-200 text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800">Eliminar Cuenta</button>
                <button onClick={() => setIsDeleteModalOpen(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-neutral-900 focus:outline-none bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-neutral-100 dark:focus:ring-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <div id="crud-modal" tabIndex="-1" aria-hidden="true" className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen bg-neutral-950/40 backdrop-blur-sm transition-all ease-in flex`}>
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-neutral-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-neutral-600">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Información física
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 bg-transparent hover:bg-neutral-200 hover:text-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-4">
              <div className="flex flex-col gap-4">
                <div className='flex flex-col md:flex-row gap-4 w-full'>
                  <div className="w-full">
                    <label htmlFor="weight" className="block mb-1 text-sm font-medium text-neutral-900 dark:text-white">Peso (kg)</label>
                    <input value={userData.weight}
                      onChange={handleChange} type="number" name="weight" id="weight" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="76,8" required min={0} max={500} />
                  </div>
                  <div className="w-full">
                    <label htmlFor="height" className="block mb-1 text-sm font-medium text-neutral-900 dark:text-white">Altura (cm)</label>
                    <input value={userData.height}
                      onChange={handleChange} type="number" name="height" id="height" className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500" placeholder="178 cm" required min={0} max={250} />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="date" className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Fecha de hoy
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={new Date().toISOString().split('T')[0]}
                    className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-neutral-600 dark:border-neutral-500 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-emerald-500 focus:border-emerald-500"
                    readOnly
                  />
                </div>
              </div>
              <button type="submit" className="text-white inline-flex items-center bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition-all ease-in">
                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
