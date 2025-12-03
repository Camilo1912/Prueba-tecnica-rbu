import { Label } from "@/components/ui/label"
import { useProjectsStore } from "@/store/proyectos"
import { formatDate } from "@/utils"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const ProjectDetailsPage = () => {
    const { id } = useParams()
    const projects = useProjectsStore(state => state.projects)
    const projectDevelopers = useProjectsStore(state => state.projectDevelopers)
    const fetchProjects = useProjectsStore(state => state.fetchProjects)
    const fetchProjectDevelopers = useProjectsStore(state => state.fetchProjectDevelopers)

    useEffect(() => {
        if (projects.length === 0) {
            console.log("trying to fetch projects")
            fetchProjects()
        }
    }, [projects.length, fetchProjects])

    useEffect(() => {
        if (id) {
            fetchProjectDevelopers(Number(id))
        }
    }, [id, fetchProjectDevelopers])

    const project = projects.find(
        (p) => p.codigoProyecto === Number(id)
    );

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Detalle de proyecto {id}
                </h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <Label>Nombre</Label>
                    <span>{project?.nombre}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Código de Proyecto</Label>
                    <span>{project?.codigoProyecto}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Fecha de Inicio</Label>
                    <span>{project ? formatDate(project.fechaInicio) : "N/A"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Fecha de Término</Label>
                    <span>{project ? formatDate(project.fechaTermino) : "N/A"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Label>Estado</Label>
                    {project?.registroActivo ? "Activo" : "Inactivo"}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Desarrolladores Asignados</h2>
                {projectDevelopers.length === 0 ? (
                    <p className="text-muted-foreground">No hay desarrolladores asignados a este proyecto.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Código</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>RUT</TableHead>
                                <TableHead>Correo Electrónico</TableHead>
                                <TableHead>Años de Experiencia</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projectDevelopers.map((developer) => (
                                <TableRow key={developer.codigoDesarrollador}>
                                    <TableCell>{developer.codigoDesarrollador}</TableCell>
                                    <TableCell className="font-medium">{developer.nombre}</TableCell>
                                    <TableCell>{developer.rut}</TableCell>
                                    <TableCell>{developer.correoElectronico}</TableCell>
                                    <TableCell>{developer.aniosExperiencia}</TableCell>
                                    <TableCell>
                                        {developer.registroActivo ? "Activo" : "Inactivo"}
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

export default ProjectDetailsPage
