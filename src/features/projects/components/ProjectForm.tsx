import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { ProyectoPayload } from '@/custom-types.d'
import { useProjectsStore } from '@/store/proyectos'
import { useState } from 'react'
import { toast } from 'sonner'


const MAX_LENGTH_NOMBRE = 50

const initialPayload: ProyectoPayload = {
    nombre: "",
    fechaInicio: "",
    fechaTermino: ""
}

const ProjectForm = () => {
    const [newProject, setNewProject] = useState<ProyectoPayload>(initialPayload)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const createProject = useProjectsStore(state => state.createProject)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value

        if (value.length <= MAX_LENGTH_NOMBRE) {
        setNewProject({
            ...newProject,
            ["nombre"]: value
        })
        }
  }

    const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value

        setNewProject({
            ...newProject,
            ["fechaInicio"]: value
        })
    }

    const handleFechaTerminoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value

        setNewProject({
            ...newProject,
            ["fechaTermino"]: value
        })
    }



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Datos a enviar:", newProject);

    const creationPromise = async () => {
      setIsSubmitting(true);
      try {
        await createProject(newProject); 
        return { nombre: newProject.nombre }; 
      } finally {
        setIsSubmitting(false);
      }
    };

    toast.promise(
      creationPromise(),
      {
        loading: "Guardando desarrollador...",
        success: (data) => {
          setNewProject(initialPayload);
          return `Proyecto ${data.nombre || newProject.nombre} ha sido creado exitosamente!`;
        },
        error: (err) => `Error al guardar: ${err.message || "Inténtalo de nuevo."}`,
      }
    )
  }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <FieldSet>
                <FieldGroup>

                    <Field>
                        <FieldLabel htmlFor='nombre'>Nombre</FieldLabel>
                        <Input 
                            id='nombre' 
                            type='text' 
                            value={newProject.nombre} 
                            placeholder='Ej: Backoffice'
                            onChange={handleNameChange}
                            required
                        />
                        <FieldDescription 
                            className="text-start">Caracteres: {newProject.nombre.length}/{MAX_LENGTH_NOMBRE}
                        </FieldDescription>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor='startDate'>Fecha de Inicio</FieldLabel>
                        <Input 
                            id='startDate' 
                            type='datetime-local' 
                            value={newProject.fechaInicio}
                            onChange={handleFechaInicioChange}
                            required
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor='endDate'>Fecha de Termino</FieldLabel>
                        <Input 
                            id='nombre'
                            type='datetime-local' 
                            value={newProject.fechaTermino}
                            min={newProject.fechaInicio}
                            onChange={handleFechaTerminoChange}
                            required
                            disabled={newProject.fechaInicio === ""}
                        />
                        <FieldDescription 
                            className="text-start">Debe posterior a la fecha de inicio.
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
            <Button
                type="submit"
                variant="outline"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Guardando..." : "Crear Proyecto"}
            </Button>
        </form>
    )
}

export default ProjectForm