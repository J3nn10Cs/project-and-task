import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "types"
import ErrorMessage from "../ErrorMessage"

type TaskFormProps = {
  errors : FieldErrors<TaskFormData>
  register : UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
  return (
    <>
      <div className='mt-4'>
        <label 
          htmlFor="name"
          className='font-semibold text-2xl'
        >
          Nombre de la tarea
        </label>
        <input
          id="name"
          type="text"
          className='border border-gray-500 w-full p-2 rounded-xl mt-3'
          placeholder='Nombre de la tarea'
          {...register("name", {
            required: "El nombre de la tarea es obligatorio",
          })}
        />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
      </div>

      <div className='mt-4'>
          <label 
            htmlFor="description"
            className='font-semibold text-2xl'
          >
            Descripcion de la tarea
          </label>
          <textarea
            id="description"
            placeholder="Descripcion de la tarea"
            className="border border-gray-500 w-full p-2 rounded-xl mt-3"
            {...register("description", {
              required: "La descripción de la tarea es obligatoria"
          })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
      </div>

      <button
        type='submit'
        className="bg-fuchsia-500 text-white font-bold w-full mt-3 p-2 rounded-2xl hover:bg-fuchsia-600"
      >
          Guardar tarea
      </button>
    </>
  )
}
