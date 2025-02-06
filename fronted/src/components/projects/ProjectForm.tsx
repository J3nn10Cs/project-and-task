import ErrorMessage from "../ErrorMessage";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProjectFormData } from "types";

type ProjectFormProps = {
  register : UseFormRegister<ProjectFormData>
  errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({errors, register} : ProjectFormProps) {
  return (
    <>
      <div className="p-3">
        <label 
          htmlFor="projectName"
          className="font-bold text-xs"
        >Nombre del proyecto</label>
        <input
          className="w-full border border-gray-300 rounded-xs p-2 mt-2" 
          type="text"
          id="projectName"
          placeholder="Nombre del proyecto"
          {...register("projectName", {
            required : "El titulo del proyecto es obligatorio"
          })}
        />
        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>
      <div className="p-3">
        <label 
          htmlFor="clientName"
          className="font-bold text-xs"
        >Nombre del cliente</label>
        <input
          className="w-full border border-gray-300 rounded-xs p-2 mt-2" 
          type="text"
          id="clientName"
          placeholder="Nombre del proyecto"
          {...register("clientName", {
            required : "El titulo del proyecto es obligatorio"
          })}
        />
        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>
      <div className="p-3">
        <label 
          htmlFor="description"
          className="font-bold text-xs"
        >Descripcion</label>
        <input
          className="w-full border border-gray-300 rounded-xs p-2 mt-2" 
          type="text"
          id="description"
          placeholder="Nombre del proyecto"
          {...register("description", {
            required : "El titulo del proyecto es obligatorio"
          })}
        />
        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}
