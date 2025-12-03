import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDevelopersStore } from "@/store/desarrolladores"
import { formatDate } from "@/utils"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const DeveloperDetailsPage = () => {
    const { id } = useParams()
    const developers = useDevelopersStore(state => state.developers)
    const fetchDevelopers = useDevelopersStore(state => state.fetchDevelopers)
    const developerProjects = useDevelopersStore(state => state.developerProjects)
    const fetchDeveloperProjects = useDevelopersStore(state => state.fetchDeveloperProjects)

    useEffect(() => {
        if (developers.length === 0) {
            console.log("trying to fetch developers")
            fetchDevelopers()
        }
    }, [developers.length, fetchDevelopers])

    useEffect(() => {
        if (id) {
            fetchDeveloperProjects(Number(id))
        }
    }, [id, fetchDeveloperProjects])
    
    const developer = developers.find(
        (d) => d.codigoDesarrollador === Number(id)
    );

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold">
                    Detalle de Desarrollador {id}
                </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <Label>Nombre</Label>
                    <span>{developer?.nombre}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Rut</Label>
                    <span>{developer?.rut}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Correo electrónico</Label>
                    <span>{developer?.correoElectronico}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Fehca de contratación</Label>
                    <span>{developer ? formatDate(developer.fechaContratacion) : <>na</>}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Años de experiencia</Label>
                    <span>{developer?.aniosExperiencia}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Estado</Label>
                    <span>{developer?.registroActivo ? "Activo" : "Inactivo"}</span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Proyectos Asignados</h2>
                {developerProjects.length === 0 ? (
                    <p className="text-muted-foreground">No hay proyectos asignados a este desarrollador.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Código</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Fecha Inicio</TableHead>
                                <TableHead>Fecha Término</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {developerProjects.map((project) => (
                                <TableRow key={project.codigoProyecto}>
                                    <TableCell>{project.codigoProyecto}</TableCell>
                                    <TableCell className="font-medium">{project.nombre}</TableCell>
                                    <TableCell>{formatDate(project.fechaInicio)}</TableCell>
                                    <TableCell>{formatDate(project.fechaTermino)}</TableCell>
                                    <TableCell>
                                        {project.registroActivo ? "Activo" : "Inactivo"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    )
}

export default DeveloperDetailsPage