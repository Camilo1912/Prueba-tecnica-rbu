import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDevelopersStore } from '@/store/desarrolladores'
import { useProjectsStore } from '@/store/proyectos'
import { formatDate } from '@/utils'
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

const DeveloperAssignmentsList = () => {
  const { id } = useParams()
  const developerId = Number(id)
  const [loadingAction, setLoadingAction] = useState<number | null>(null)

  const developers = useDevelopersStore(state => state.developers)
  const developerProjects = useDevelopersStore(state => state.developerProjects)
  const fetchDevelopers = useDevelopersStore(state => state.fetchDevelopers)
  const fetchDeveloperProjects = useDevelopersStore(state => state.fetchDeveloperProjects)
  const assignProject = useDevelopersStore(state => state.assignProject)
  const unassignProject = useDevelopersStore(state => state.unassignProject)
  const allProjects = useProjectsStore(state => state.projects)
  const fetchProjects = useProjectsStore(state => state.fetchProjects)


  useEffect(() => {
    if (developers.length === 0) {
      fetchDevelopers()
    }
  }, [developers.length, fetchDevelopers])

  useEffect(() => {
    if (allProjects.length === 0) {
      fetchProjects()
    }
  }, [allProjects.length, fetchProjects])

  useEffect(() => {
    if (id) {
      fetchDeveloperProjects(developerId)
    }
  }, [id, developerId, fetchDeveloperProjects])

  const developer = developers.find(
    (d) => d.codigoDesarrollador === developerId
  )

  const assignedProjectIds = new Set(developerProjects.map(p => p.codigoProyecto))
  const availableProjects = allProjects.filter(p => !assignedProjectIds.has(p.codigoProyecto))

  const handleAssign = async (projectId: number) => {
    setLoadingAction(projectId)
    try {
      await assignProject(projectId, developerId)
    } catch (error) {
      console.error("Error assigning project:", error)
    } finally {
      setLoadingAction(null)
    }
  }

  const handleUnassign = async (projectId: number) => {
    setLoadingAction(projectId)
    try {
      await unassignProject(projectId, developerId)
    } catch (error) {
      console.error("Error unassigning project:", error)
    } finally {
      setLoadingAction(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">
          Asignaciones de Proyectos
        </h1>
        <p className="text-muted-foreground">
          Desarrollador: {developer?.nombre} (ID: {id})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {developerProjects.map((project) => (
                  <TableRow key={project.codigoProyecto}>
                    <TableCell>{project.codigoProyecto}</TableCell>
                    <TableCell className="font-medium">{project.nombre}</TableCell>
                    <TableCell>{formatDate(project.fechaInicio)}</TableCell>
                    <TableCell>
                      {project.registroActivo ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleUnassign(project.codigoProyecto)}
                        disabled={loadingAction === project.codigoProyecto}
                      >
                        {loadingAction === project.codigoProyecto ? (
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
          <h2 className="text-xl font-semibold">Proyectos Disponibles</h2>
          {availableProjects.length === 0 ? (
            <p className="text-muted-foreground">No hay proyectos disponibles para asignar.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Fecha Inicio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableProjects.map((project) => (
                  <TableRow key={project.codigoProyecto}>
                    <TableCell>{project.codigoProyecto}</TableCell>
                    <TableCell className="font-medium">{project.nombre}</TableCell>
                    <TableCell>{formatDate(project.fechaInicio)}</TableCell>
                    <TableCell>
                      {project.registroActivo ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleAssign(project.codigoProyecto)}
                        disabled={loadingAction === project.codigoProyecto}
                      >
                        {loadingAction === project.codigoProyecto ? (
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

export default DeveloperAssignmentsList