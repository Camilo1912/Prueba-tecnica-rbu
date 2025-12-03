import { type ColumnDef } from "@tanstack/react-table";
import { type Proyecto } from "@/custom-types.d";

import { DiamondPlusIcon, Edit, FolderRootIcon, MoreHorizontal, PowerIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/utils";
import { NavLink } from "react-router-dom";


export const columns: ColumnDef<Proyecto>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre"
    },
    {
        accessorKey: "fechaInicio",
        header: "Fecha de inicio",
        cell: ({ row }) => {
            return formatDate(row.original.fechaInicio)
        }
    },
    {
        accessorKey: "fechaTermino",
        header: "Fecha de término",
        cell: ({ row }) => {
            return formatDate(row.original.fechaTermino)
        }
    },
    {
        accessorKey: "registroActivo",
        header: "Estado",
        cell: ({ row }) => {
            const project = row.original

            return (
                <>{project.registroActivo ?
                    <div className="bg-green-300 text-white rounded-full font-bold px-2 w-fit">Activo</div>
                    :
                    <div className="bg-red-400 text-white rounded-full font-bold px-2 w-fit">Inactivo</div>
                }</>
            )
        }
    },
    {
        header: "Acciones",
        id: "actions",
        cell: ({ row, table }) => {
            const project = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <NavLink to={`/proyectos/${project.codigoProyecto}`}>
                            <DropdownMenuItem><FolderRootIcon></FolderRootIcon>Ver detalles</DropdownMenuItem>
                        </NavLink>
                        <NavLink to={`/proyectos/${project.codigoProyecto}/editar`}>
                            <DropdownMenuItem><Edit></Edit>Editar</DropdownMenuItem>
                        </NavLink>
                        <NavLink to={`/proyectos/${project.codigoProyecto}/asignar-desarrollador`}>
                            <DropdownMenuItem><DiamondPlusIcon></DiamondPlusIcon>Gestionar asignaciones</DropdownMenuItem>
                        </NavLink>
                        <DropdownMenuSeparator />
                        {project.registroActivo ?
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => (table.options.meta as any)?.deleteProject(project.codigoProyecto)}
                            >
                                <Trash2Icon className="text-red-600"></Trash2Icon>Eliminar
                            </DropdownMenuItem>
                            :
                            <DropdownMenuItem
                                onClick={() => (table.options.meta as any)?.reactivateProject(project.codigoProyecto)}
                            >
                                <PowerIcon></PowerIcon>Reactivar
                            </DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]