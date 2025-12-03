import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Spinner } from '@/components/ui/spinner'
import { PlusIcon, RefreshCcwIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProjectTable from '../components/projectTable/ProjectTable'
import { useProjectsStore } from '@/store/proyectos'
import { useNavigate } from 'react-router-dom'

const ProjectsListPage = () => {
    const fetchProjects = useProjectsStore(state => state.fetchProjects)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const handleFetchProject = () => {
        setIsLoading(true)
        console.log("Projects loaded button")
        fetchProjects().finally(() => setIsLoading(false))
    }

    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <span className='text-3xl py-4'>Listado de Proyectos</span>
                <ButtonGroup>
                    <ButtonGroup>
                        <Button variant="outline" disabled={isLoading} onClick={handleFetchProject} >
                            {isLoading ? <><Spinner/>Cargando...</>: <RefreshCcwIcon></RefreshCcwIcon>}
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="default" onClick={() => navigate("/proyectos/crear")}><PlusIcon/>Nuevo Proyecto</Button>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
            <ProjectTable/>
        </>
    )
}

export default ProjectsListPage