import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectsStore } from '@/store/proyectos'
import { useDevelopersStore } from '@/store/desarrolladores'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const ProjectAssignmentsList = () => {
    const { id } = useParams()
    const projectId = Number(id)

    const projects = useProjectsStore(state => state.projects)
    const projectDevelopers = useProjectsStore(state => state.projectDevelopers)
    const fetchProjects = useProjectsStore(state => state.fetchProjects)
    const fetchProjectDevelopers = useProjectsStore(state => state.fetchProjectDevelopers)
    const assignDeveloper = useProjectsStore(state => state.assignDeveloper)
    const unassignDeveloper = useProjectsStore(state => state.unassignDeveloper)

    const allDevelopers = useDevelopersStore(state => state.developers)
    const fetchDevelopers = useDevelopersStore(state => state.fetchDevelopers)

    const [loadingAction, setLoadingAction] = useState<number | null>(null)

    useEffect(() => {
        if (projects.length === 0) {
            fetchProjects()
        }
    }, [projects.length, fetchProjects])

    useEffect(() => {
        if (allDevelopers.length === 0) {
            fetchDevelopers()
        }
    }, [allDevelopers.length, fetchDevelopers])

    useEffect(() => {
        if (id) {
            fetchProjectDevelopers(projectId)
        }
    }, [id, projectId, fetchProjectDevelopers])

    const project = projects.find(
        (p) => p.codigoProyecto === projectId
    )

    const assignedDeveloperIds = new Set(projectDevelopers.map(d => d.codigoDesarrollador))
    const availableDevelopers = allDevelopers.filter(d => !assignedDeveloperIds.has(d.codigoDesarrollador))

    const handleAssign = async (developerId: number) => {
        setLoadingAction(developerId)
        try {
            await assignDeveloper(projectId, developerId)
        } catch (error) {
            console.error("Error assigning developer:", error)
        } finally {
            setLoadingAction(null)
        }
    }

    const handleUnassign = async (developerId: number) => {
        setLoadingAction(developerId)
        try {
            await unassignDeveloper(projectId, developerId)
        } catch (error) {
            console.error("Error unassigning developer:", error)
        } finally {
            setLoadingAction(null)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Asignaciones de Desarrolladores
                </h1>
                <p className="text-muted-foreground">
                    Proyecto: {project?.nombre} (ID: {id})
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                    <TableHead>Experiencia</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projectDevelopers.map((developer) => (
                                    <TableRow key={developer.codigoDesarrollador}>
                                        <TableCell>{developer.codigoDesarrollador}</TableCell>
                                        <TableCell className="font-medium">{developer.nombre}</TableCell>
                                        <TableCell>{developer.rut}</TableCell>
                                        <TableCell>{developer.aniosExperiencia} años</TableCell>
                                        <TableCell>
                                                {developer.registroActivo ? "Activo" : "Inactivo"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleUnassign(developer.codigoDesarrollador)}
                                                disabled={loadingAction === developer.codigoDesarrollador}
                                            >
                                                {loadingAction === developer.codigoDesarrollador ? (
                                                    <Spinner />
                                                ) : (
                                                    "Desasignar"
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Desarrolladores Disponibles</h2>
                    {availableDevelopers.length === 0 ? (
                        <p className="text-muted-foreground">No hay desarrolladores disponibles para asignar.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>RUT</TableHead>
                                    <TableHead>Experiencia</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {availableDevelopers.map((developer) => (
                                    <TableRow key={developer.codigoDesarrollador}>
                                        <TableCell>{developer.codigoDesarrollador}</TableCell>
                                        <TableCell className="font-medium">{developer.nombre}</TableCell>
                                        <TableCell>{developer.rut}</TableCell>
                                        <TableCell>{developer.aniosExperiencia} años</TableCell>
                                        <TableCell>
                                            {developer.registroActivo ? "Activo" : "Inactivo"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => handleAssign(developer.codigoDesarrollador)}
                                                disabled={loadingAction === developer.codigoDesarrollador || !developer.registroActivo}
                                            >
                                                {loadingAction === developer.codigoDesarrollador ? (
                                                    <Spinner />
                                                ) : (
                                                    "Asignar"
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectAssignmentsList
