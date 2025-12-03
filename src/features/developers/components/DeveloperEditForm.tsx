import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { type DesarrolladorPayload } from "@/custom-types.d"
import { useDevelopersStore } from "@/store/desarrolladores"
import { useNavigate, useParams } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"

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

const DeveloperEditForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const developerId = Number(id)

  const developers = useDevelopersStore(state => state.developers)
  const fetchDevelopers = useDevelopersStore(state => state.fetchDevelopers)
  const updateDeveloper = useDevelopersStore(state => state.updateDeveloper)

  const [developerData, setDeveloperData] = useState<DesarrolladorPayload>(initialPayload)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (developers.length === 0) {
      fetchDevelopers()
    }
  }, [developers.length, fetchDevelopers])

  useEffect(() => {
    const developer = developers.find(d => d.codigoDesarrollador === developerId)
    if (developer) {
      const fechaContratacion = developer.fechaContratacion
        ? new Date(developer.fechaContratacion).toISOString().slice(0, 16)
        : ""

      setDeveloperData({
        nombre: developer.nombre,
        rut: developer.rut,
        correoElectronico: developer.correoElectronico,
        fechaContratacion: fechaContratacion,
        aniosExperiencia: developer.aniosExperiencia
      })
      setIsLoading(false)
    }
  }, [developers, developerId])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value

    if (value.length <= MAX_LENGTH_NOMBRE) {
      setDeveloperData({
        ...developerData,
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
      setDeveloperData({
        ...developerData,
        ["rut"]: formattedRut
      })
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value

    if (value.length <= MAX_LENGTH_EMAIL) {
      setDeveloperData({
        ...developerData,
        ["correoElectronico"]: value
      })
    }
  }

  const handleFechaContratacionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value

    setDeveloperData({
      ...developerData,
      ["fechaContratacion"]: value
    })
  }

  const handleAniosExperienciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const numericValue = Math.floor(Number(e.target.value));

    setDeveloperData({
      ...developerData,
      ["aniosExperiencia"]: isNaN(numericValue) || numericValue < 0 ? 0 : numericValue
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Datos a actualizar:", developerData);

    const updatePromise = async () => {
      setIsSubmitting(true);
      try {
        await updateDeveloper(developerId, developerData);
        return { nombre: developerData.nombre };
      } finally {
        setIsSubmitting(false);
      }
    };

    toast.promise(
      updatePromise(),
      {
        loading: "Actualizando desarrollador...",
        success: (data) => {
          setTimeout(() => navigate(`/desarrolladores/${developerId}`), 1000)
          return `¡Desarrollador ${data.nombre} ha sido actualizado exitosamente!`;
        },
        error: (err) => `Error al actualizar: ${err.message || "Inténtalo de nuevo."}`,
      }
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Editar Desarrollador</h1>
        <p className="text-muted-foreground">ID: {id}</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <FieldSet>
          <FieldGroup>

            <Field>
              <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
              <Input id="nombre" type="text" value={developerData.nombre} placeholder="Ej: Jhon Doe" onChange={handleNameChange} required />
              <FieldDescription className="text-start">Caracteres: {developerData.nombre.length}/{MAX_LENGTH_NOMBRE}</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="rut">Rut</FieldLabel>
              <Input id="rut" type="text" value={developerData.rut} placeholder="Ej: 12345678-9" onChange={handleRutChange} required />
              <FieldError className="text-start">Rut invalido</FieldError>
            </Field>

            <Field>
              <FieldLabel>Correo electrónico</FieldLabel>
              <Input id="correoElectronico" type="email" value={developerData.correoElectronico} placeholder="Ej: ejemplo@ejemplo.com" onChange={handleEmailChange} required />
              <FieldDescription className="text-start">Caracteres: {developerData.correoElectronico.length}/{MAX_LENGTH_EMAIL}</FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Fecha de contratación</FieldLabel>
              <Input id="fechaContratacion" type="datetime-local" value={developerData.fechaContratacion} onChange={handleFechaContratacionChange} required />
            </Field>

            <Field>
              <FieldLabel>Años de experiencia</FieldLabel>
              <Input id="aniosExperiencia" type="number" min={0} value={developerData.aniosExperiencia} onChange={handleAniosExperienciaChange} required />
            </Field>

          </FieldGroup>
        </FieldSet>

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Actualizar Desarrollador"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/desarrolladores/${developerId}`)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default DeveloperEditForm