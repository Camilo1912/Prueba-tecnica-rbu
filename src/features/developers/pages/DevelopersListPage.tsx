
import { ButtonGroup } from '@/components/ui/button-group'
import DeveloperTable from '../components/developerTable/DeveloperTable'
import { RefreshCcwIcon, UserRoundPlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDevelopersStore } from '@/store/desarrolladores'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'

const DevelopersListPage = () => {
    const fetchDevelopers = useDevelopersStore(state => state.fetchDevelopers)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchDevelopers()
    }, [])

    const handleFetchDevelopers = () => {
        setIsLoading(true)
        console.log("Developers loaded button")
        fetchDevelopers().finally(() => setIsLoading(false))
    }

    return (
        <>
            <div className='flex justify-between items-center w-full'>
                <span className='text-3xl py-4'>Listado de Desarrolladores</span>
                <ButtonGroup>
                    <ButtonGroup>
                        <Button 
                            variant="default"
                            onClick={() => navigate("/desarrolladores/crear")}
                            >
                            <UserRoundPlusIcon/>
                            Nuevo Desarrollador
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="outline" disabled={isLoading} onClick={handleFetchDevelopers}>
                            {isLoading ? <><Spinner/>Cargando...</>: <RefreshCcwIcon></RefreshCcwIcon>}
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
            <DeveloperTable/>
        </>
    )
}

export default DevelopersListPage