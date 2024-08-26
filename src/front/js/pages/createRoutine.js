import React, { useState, useContext, useEffect } from "react"
import { Context } from "../store/appContext"
import { toast } from "react-toastify"

const MultiStepForm = () => {
  const { store, actions } = useContext(Context)
  const [step, setStep] = useState(1) // Para controlar el paso actual
  const [formData, setFormData] = useState({
    routineName: '',
    selectedWeek: '',
    selectedDay: '',
    exercises: ''
  })
  const [addedExercises, setAddedExercises] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const toggleDropdown = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  const closeDropdown = () => setIsOpen(false)

  const handleInputChange = (input) => (e) => {
    setFormData({
      ...formData,
      [input]: e.target.value
    })
  }


  const handleNextStep = () => setStep(step + 1)
  const handlePreviousStep = () => setStep(step - 1)

  const handleCreateRoutine = async (e) => {
    e.preventDefault()

    // Crear una promesa para manejar la creación de la rutina
    const createRoutine = new Promise(async (resolve, reject) => {
      try {
        const routineResponse = await actions.postRoutine(formData.routineName)
        if (!routineResponse || routineResponse.error) {
          throw new Error('Error al crear la rutina')
        }
        // Si la rutina se crea correctamente, resolver la promesa
        resolve('Rutina creada exitosamente')
        // Avanzar al siguiente paso
        handleNextStep()
      } catch (error) {
        // Rechazar la promesa en caso de error
        reject('Error al crear la rutina')
      }
    })

    // Usar toast.promise para mostrar los estados de la promesa
    toast.promise(
      createRoutine,
      {
        pending: 'Creando rutina...',
        success: 'Rutina creada exitosamente 👌',
        error: 'No se pudo crear la rutina 🤯',
      }
    )

    // Manejar el resultado de la promesa si es necesario
    createRoutine.then(() => {
      // Puedes realizar acciones adicionales aquí si es necesario
    }).catch((error) => {
      console.error(error)
    })
  }


  const handleChooseDays = async (e) => {
    e.preventDefault();

    // Crear una promesa para manejar la asociación de la rutina con los días
    const chooseDays = new Promise(async (resolve, reject) => {
      try {
        const weekResponse = await actions.postWeeklyRoutine(
          store.routineData.id.toString(),
          formData.selectedWeek,
          formData.selectedDay
        );
        if (!weekResponse || weekResponse.error) {
          throw new Error('Error al asociar la rutina con los días');
        }
        // Si se asocian correctamente, resolver la promesa
        resolve('Rutina asociada exitosamente');
        // Avanzar al siguiente paso
        handleNextStep();
      } catch (error) {
        // Rechazar la promesa en caso de error
        reject('Error al asociar la rutina con los días');
      }
    });

    // Usar toast.promise para mostrar los estados de la promesa
    toast.promise(
      chooseDays,
      {
        pending: 'Guardando día y semana...',
        success: 'Guardado exitosamente 👌',
        error: 'No se pudo guardar 🤯',
      }
    );

    // Manejar el resultado de la promesa si es necesario
    chooseDays.then(() => {
      // Puedes realizar acciones adicionales aquí si es necesario
    }).catch((error) => {
      console.error(error);
    });
  };


  const handleAddExercises = async (id, name) => {
    const isExerciseAdded = addedExercises.some(exercise => exercise.id === id);

    const actionPromise = new Promise(async (resolve, reject) => {
      try {
        let response;
        if (isExerciseAdded) {
          // Elimina el ejercicio si ya está agregado
          response = await actions.deleteExerciseRoutine(store.routineData.id.toString(), id.toString());
          if (!response || response.error) throw new Error('Error al eliminar el ejercicio');
          resolve('Ejercicio eliminado exitosamente');
        } else {
          // Agrega el ejercicio si no está en la rutina
          response = await actions.postExerciseRoutine(store.routineData.id.toString(), id.toString());
          if (!response || response.error) throw new Error('Error al agregar el ejercicio');
          resolve('Ejercicio agregado exitosamente');
        }
      } catch (error) {
        reject(isExerciseAdded ? 'No se pudo eliminar el ejercicio' : 'No se pudo agregar el ejercicio');
      }
    });

    toast.promise(
      actionPromise,
      {
        pending: isExerciseAdded ? 'Eliminando ejercicio...' : 'Agregando ejercicio...',
        success: isExerciseAdded ? 'Ejercicio eliminado exitosamente 👌' : 'Ejercicio agregado exitosamente 👌',
        error: isExerciseAdded ? 'No se pudo eliminar el ejercicio 🤯' : 'No se pudo agregar el ejercicio 🤯',
      }
    );

    actionPromise.then(() => {
      setAddedExercises(prevExercises => {
        if (isExerciseAdded) {
          // Elimina el ejercicio de la lista
          return prevExercises.filter(exercise => exercise.id !== id);
        } else {
          // Agrega el ejercicio a la lista
          return [...prevExercises, { id, name }];
        }
      });
    }).catch(error => {
      console.error(error);
    });
  };



  const isExerciseSelected = (id) => {
    return addedExercises.some(exercise => exercise.id === id)
  }

  const handleStepCircle = (index) => {
    if (step > index) {
      return "bg-emerald-800 text-emerald-500" // Completado
    } else if (step === index) {
      return "bg-emerald-500 text-emerald-100" // Paso actual
    } else {
      return "bg-neutral-800 text-neutral-300" // No alcanzado
    }
  }

  const handleProgressBar = (step) => {
    if (step == 1) {
      return "w-5" // paso 1
    } else if (step == 2) {
      return "w-1/2" // paso 2
    } else {
      return "w-full" // paso 3
    }
  }

  const handleStepText = (index) => {
    if (step > index) {
      return "text-emerald-400" // Completado
    } else if (step === index) {
      return "text-emerald-50" // Paso actual
    } else {
      return "text-neutral-500" // No alcanzado
    }
  }

  const filteredExercises = store.allExerciseList.filter((item) => {
    const matchesCategory = selectedCategory === "" || item.category === selectedCategory;
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  })

  useEffect(() => {
    actions.allExercise()
    actions.category()
  }, [])

  return (
    <div className="w-3/4 mx-auto flex rounded-md flex-col items-center gap-4 justify-between overflow-y-auto py-5 px-5 h-full bg-neutral-800 border-neutral-700 relative">

      {/* form title */}
      <span className="relative flex justify-center w-full sm:w-3/4">
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-3/4 bg-red bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75"
        ></div>
        <span className="relative z-10 text-white font-bold px-2 sm:px-6 bg-neutral-800 sm:text-xl">Crea tu rutina</span>
      </span>

      {/* form steps */}
      <div className="w-full mb-10">
        <h2 className="sr-only">Steps</h2>

        <div className="relative after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-neutral-200">
          <div className={`absolute bottom-0 h-1 transition-all ease-in rounded-full bg-emerald-500 ${handleProgressBar(step)}`}></div>
          <ol className="grid grid-cols-3 text-sm font-medium text-neutral-500">
            <li className="relative flex justify-start text-emerald-600">
              <span className={`absolute -bottom-[1.90rem] start-0 rounded-full transition-all ease-in ${handleStepCircle(1)}`}>
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>

              <span className={`hidden sm:block ${handleStepText(1)}`}> Nombre </span>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={`${handleStepText(1)} size-6 sm:hidden icon icon-tabler icons-tabler-outline icon-tabler-pencil`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
            </li>

            <li className="relative flex justify-center text-emerald-600">
              <span className={`absolute -bottom-[1.90rem] left-1/2 transform -translate-x-1/2 rounded-full transition-all ease-in ${handleStepCircle(2)}`}>
                {
                  step >= 2 ? (
                    <svg
                      className="size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="size-6 rounded-full border-[3px] border-neutral-800 bg-neutral-400">
                    </div>
                  )
                }
              </span>

              <span className={`hidden sm:block ${handleStepText(2)}`}> Dia y semana </span>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={`${handleStepText(2)} mx-auto size-6 sm:hidden icon icon-tabler icons-tabler-outline icon-tabler-calendar-month`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
            </li>

            <li className="relative flex justify-end">
              <span className={`absolute -bottom-[1.90rem] end-0 rounded-full transition-all ease-in ${handleStepCircle(3)}`}>
                {
                  step == 3 ? (
                    <svg
                      className="size-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="size-6 rounded-full border-[3px] border-neutral-800 bg-neutral-400">
                    </div>
                  )
                }
              </span>

              <span className={`hidden sm:block ${handleStepText(3)}`}> Ejercicios </span>

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class={`${handleStepText(3)} size-6 sm:hidden icon icon-tabler icons-tabler-outline icon-tabler-barbell`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M2 12h1" /><path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" /><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M9 12h6" /><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" /><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" /><path d="M22 12h-1" /></svg>
            </li>
          </ol>
        </div>
      </div>
      <form className="w-full">
        {step === 1 && (
          <>

            {/* Paso 1: Nombre de la rutina */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-bold text-neutral-200">Nombre de la Rutina</label>
              <input
                id="name"
                type="text"
                value={formData.routineName}
                onChange={handleInputChange("routineName")}
                className="w-full p-2 rounded bg-neutral-700 border border-neutral-600 focus:ring-emerald-500 focus:border-emerald-500 text-neutral-200 caret-emerald-500"
                required
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={handleCreateRoutine}
                className="disabled:bg-emerald-300 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
                disabled={formData.routineName == '' ? true : false}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="w-full flex flex-col">
            {/* Paso 2: Semana y Día */}
            <div className="w-full flex gap-5 flex-col sm:flex-row sm:gap-10 sm:justify-between mb-5">
              <div className="w-full sm:w-1/2">
                <label htmlFor="week" className="block mb-2 text-sm font-bold text-neutral-100">Semana</label>
                <select
                  id="week"
                  value={formData.selectedWeek}
                  onChange={handleInputChange("selectedWeek")}
                  className="w-full p-2 rounded bg-neutral-700 border border-neutral-600 focus:ring-emerald-500 focus:border-emerald-500 text-neutral-200"
                  required
                >
                  <option value="">Elige una semana</option>
                  <option value="SEMANA1">Semana 1</option>
                  <option value="SEMANA2">Semana 2</option>
                  <option value="SEMANA3">Semana 3</option>
                  <option value="SEMANA4">Semana 4</option>
                  <option value="SEMANA5">Semana 5</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="day" className="block mb-2 text-sm font-bold text-neutral-100">Días</label>
                <select
                  id="day"
                  value={formData.selectedDay}
                  onChange={handleInputChange("selectedDay")}
                  className="w-full p-2 rounded bg-neutral-700 border border-neutral-600 focus:ring-emerald-500 focus:border-emerald-500 text-neutral-200"
                  required
                >
                  <option value="">Elige un día</option>
                  <option value="LUNES">Lunes</option>
                  <option value="MARTES">Martes</option>
                  <option value="MIERCOLES">Miércoles</option>
                  <option value="JUEVES">Jueves</option>
                  <option value="VIERNES">Viernes</option>
                  <option value="SABADO">Sábado</option>
                  <option value="DOMINGO">Domingo</option>
                </select>
              </div>
            </div>
            <div className="w-full flex gap-4 flex-col items-center sm:flex-row sm:w-fit self-end">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-transparent hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={handleChooseDays}
                className="disabled:bg-emerald-300 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
                disabled={formData.selectedDay == '' || formData.selectedWeek == '' ? true : false}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className='w-full flex flex-col'>
            {/* Paso 3: Ejercicios */}
            <div className="flex flex-row flex-wrap gap-2 w-full items-end justify-end mb-5">

              {/* search input */}
              <div className="relative">
                <label htmlFor="Search" className="sr-only"> Search for... </label>
                <input
                  type="text"
                  id="Search"
                  placeholder="buscar ejercicios..."
                  className="border-none max-w-40 h-8 rounded-md px-4 py-2 pe-10 shadow-sm sm:text-sm dark:bg-neutral-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                  <span
                    className="text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    <span className="sr-only">Search</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                </span>
              </div>

              {/* filtrar */}
              <div>
                <select
                  name="HeadlineAct"
                  id="HeadlineAct"
                  className="bg-neutral-900 border-none text-neutral-300 text-sm/none font-medium ms-2 md:me-2 px-4 py-2 h-8 rounded-md focus:ring-transparent focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option className="flex items-center border-e px-4 py-2 text-sm/none font-medium text-neutral-600 dark:border-e-neutral-800 dark:text-neutral-300" value="">
                    Filtrar
                  </option>
                  {store.allCategoryList.map((item, index) => (
                    <option key={index} className="lowercase px-4 py-2" value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* lista de ejercicios */}
              <div className="relative">
                <div className="inline-flex items-center overflow-hidden rounded-md h-8 border bg-white dark:border-neutral-800 dark:bg-neutral-900">
                  <div
                    className="border-e px-4 py-2 text-sm/none font-medium text-neutral-600 dark:border-e-neutral-800 dark:text-neutral-300"
                  >
                    Ejercicios
                    <span className={`bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-medium ms-2 me-2 px-2.5 py-0.5 rounded-full`}>
                      {addedExercises.length}
                    </span>
                  </div>

                  <button
                    className="h-full p-2 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div
                    className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-neutral-100 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
                    role="menu"
                  >
                    {addedExercises.length > 0 ? (
                      addedExercises.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                          role="menuitem"
                        >
                          {item.name}
                          <button onClick={() => handleAddExercises(item.id, item.name)} type="button" className="w-fit flex p-1 cursor-pointer items-center justify-center rounded-lg border-neutral-200 bg-white text-neutral-500 hover:text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:peer-checked:text-neutral-300 active:scale-95 transition-all ease-in">
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x size-4"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </div>
                          </button>
                        </div>
                      ))) : (
                      <div
                        className="block rounded-lg px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                        role="menuitem"
                        onClick={closeDropdown}
                      >
                        No hay ejercicios
                      </div>
                    )
                    }
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-4">
              {filteredExercises.map((item, index) => {
                return (
                  <article className="flex-grow flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 max-w-full flex bg-white transition-all shadow-xl dark:bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden">
                    <div className="hidden sm:block sm:basis-36">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                        className="aspect-square h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex flex-1 flex-col gap-4 justify-between">
                      <div className="flex flex-col gap-3 dark:border-white/10">
                        <h3 className="font-bold uppercase text-neutral-900 dark:text-white">
                          {item.name}
                        </h3>
                        <span className="rounded-full bg-neutral-800 px-2 w-fit py-1 text-xs font-medium lowercase text-neutral-400 text-center">
                          {item.category}
                        </span>
                      </div>
                      <div className="self-end">
                        <input
                          checked={isExerciseSelected(item.id)}
                          onChange={() => handleAddExercises(item.id, item.name)}
                          type="checkbox"
                          id={`react-${index}`}
                          className="peer hidden"
                        />
                        <label
                          htmlFor={`react-${index}`}
                          className="dark:hover:text-emearld-400 flex size-6 cursor-pointer items-center justify-center rounded-lg bg-white p-5 text-neutral-500 transition-all ease-in hover:bg-neutral-50 hover:text-emerald-400 active:scale-95 peer-checked:bg-gradient-to-br peer-checked:from-emerald-600 peer-checked:to-green-400 peer-checked:text-neutral-700 dark:border-emerald-600 dark:bg-neutral-800 dark:text-emerald-600 dark:hover:bg-neutral-700 dark:peer-checked:text-neutral-900"
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-plus size-8"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M12 5l0 14" />
                              <path d="M5 12l14 0" />
                            </svg>
                          </div>
                        </label>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="w-full flex gap-4 flex-col items-center sm:flex-row sm:w-fit self-end">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-transparent hover:bg-neutral-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="disabled:bg-emerald-300 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded w-full sm:w-auto transition-all ease-in"
                disabled={addedExercises.length == 0 ? true : false}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export const CreateRoutine = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <MultiStepForm />
    </div>
  )
}
