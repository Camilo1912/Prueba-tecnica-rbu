import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { type DesarrolladorPayload } from "@/custom-types.d"
import { useDevelopersStore } from "@/store/desarrolladores"
import { useNavigate } from "react-router-dom"


const MAX_LENGTH_NOMBRE = 200;
const MAX_LENGTH_RUT = 10;
const MAX_DIGITS_RUT = 9;
const MAX_LENGTH_EMAIL = 100;

const initialPayload: DesarrolladorPayload = {
  nombre: "",
  rut: "",
  correoElectronico: "",
  fechaContratacion: "",
  aniosExperiencia: 0
};

const DeveloperForm = () => {
  const [newDeveloper, setNewDeveloper] = useState<DesarrolladorPayload>(initialPayload)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createDeveloper = useDevelopersStore(state => state.createDeveloper);
  const navigate = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value

    if (value.length <= MAX_LENGTH_NOMBRE) {
      setNewDeveloper({
        ...newDeveloper,
        ["nombre"]: value
      })
    }
  }

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    const cleanedValue = value.replace(/[^0-9kK]/g, '');

    const limitedDigits = cleanedValue.substring(0, MAX_DIGITS_RUT);

    let formattedRut = limitedDigits;

    if (limitedDigits.length > 1) {
        const cuerpo = limitedDigits.slice(0, -1);
        const dv = limitedDigits.slice(-1).toUpperCase(); 

        formattedRut = `${cuerpo}-${dv}`;
    }

    if (formattedRut.length <= MAX_LENGTH_RUT) {
      setNewDeveloper({
        ...newDeveloper,
        ["rut"]: formattedRut
      })
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value

    if (value.length <= MAX_LENGTH_EMAIL) {
      setNewDeveloper({
        ...newDeveloper,
        ["correoElectronico"]: value
      })
    }
  }

  const handleFechaContratacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value

    setNewDeveloper({
      ...newDeveloper,
      ["fechaContratacion"]: value
    })
  }

  const handleAniosExperienciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const numericValue = Math.floor(Number(e.target.value));

    setNewDeveloper({
      ...newDeveloper,
      ["aniosExperiencia"]: isNaN(numericValue) || numericValue < 0 ? 0 : numericValue
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Datos a enviar:", newDeveloper);

    const creationPromise = async () => {
      setIsSubmitting(true);
      try {
        await createDeveloper(newDeveloper); 
        return { nombre: newDeveloper.nombre }; 
      } finally {
        setIsSubmitting(false);
      }
    };

    toast.promise(
      creationPromise(),
      {
        loading: "Guardando desarrollador...",
        success: (data) => {
          setNewDeveloper(initialPayload);
          return `¡Desarrollador ${data.nombre || newDeveloper.nombre} ha sido creado exitosamente!`;
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
            <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
            <Input id="nombre" type="text" value={newDeveloper.nombre} placeholder="Ej: Jhon Doe" onChange={handleNameChange} required/>
            <FieldDescription className="text-start">Caracteres: {newDeveloper.nombre.length}/{MAX_LENGTH_NOMBRE}</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="rut">Rut</FieldLabel>
            <Input id="rut" type="text" value={newDeveloper.rut} placeholder="Ej: 12345678-9" onChange={handleRutChange} required/>
            <FieldError className="text-start">Rut invalido</FieldError>
          </Field>

          <Field>
            <FieldLabel>Correo electrónico</FieldLabel>
            <Input id="correoElectronico" type="email" value={newDeveloper.correoElectronico} placeholder="Ej: ejemplo@ejemplo.com" onChange={handleEmailChange} required/>
            <FieldDescription className="text-start">Caracteres: {newDeveloper.correoElectronico.length}/{MAX_LENGTH_EMAIL}</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Fecha de contratación</FieldLabel>
            <Input id="fechaContratacion" type="datetime-local" value={newDeveloper.fechaContratacion} onChange={handleFechaContratacionChange} required/>
          </Field>

          <Field>
            <FieldLabel>Años de experiencia</FieldLabel>
            <Input id="aniosExperiencia" type="number" min={0} value={newDeveloper.aniosExperiencia} onChange={handleAniosExperienciaChange} required/>
          </Field>

        </FieldGroup>
      </FieldSet>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          >
          {isSubmitting ? "Guardando..." : "Crear Desarrollador"}
        </Button>
        <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/desarrolladores`)}
            disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default DeveloperForm


