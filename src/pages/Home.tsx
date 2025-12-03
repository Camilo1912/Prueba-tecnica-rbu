import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { testConnection } from '@/api/connection'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const HomePage = () => {
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkConnection = async () => {
            setIsLoading(true)
            try {
                const response = await testConnection()
                setIsConnected(response.isConnected)
            } catch (error) {
                console.error("Error checking connection:", error)
                setIsConnected(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkConnection()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-2">
                    Sistema de Gestión
                </h1>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-card">
                <h2 className="text-xl font-semibold">Estado del Servicio</h2>

                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Spinner />
                        <span className="text-muted-foreground">Verificando conexión...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {isConnected ? 
                            <span className="bg-green-300 text-white rounded-full font-bold px-2 w-fit">Conectado</span> 
                            : 
                            <span className="bg-red-400 text-white rounded-full font-bold px-2 w-fit">Desconectado</span>
                        }
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <Button
                    size="lg"
                    onClick={() => navigate('/desarrolladores')}
                    disabled={isLoading}
                >
                    Ver Desarrolladores
                </Button>
                <Button
                    size="lg"
                    onClick={() => navigate('/proyectos')}
                    disabled={isLoading}
                >
                    Ver Proyectos
                </Button>
            </div>
        </div>
    )
}

export default HomePage
