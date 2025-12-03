import { type ColumnDef } from "@tanstack/react-table";
import { type Desarrollador } from "@/custom-types.d";

import { BookUserIcon, DiamondPlusIcon, Edit, MoreHorizontal, PowerIcon, Trash2Icon } from "lucide-react"
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

export const columns: ColumnDef<Desarrollador>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre"
    },
    {
        accessorKey: "rut",
        header: "RUT"
    },
    {
        accessorKey: "correoElectronico",
        header: "Email"
    },
    {
        accessorKey: "fechaContratacion",
        header: "Fecha de contratación",
        cell: ({ row }) => {
            return formatDate(row.original.fechaContratacion)
        }
    },
    {
        accessorKey: "aniosExperiencia",
        header: "Años de experiencia"
    },
    {
        accessorKey: "registroActivo",
        header: "Estado",
        cell: ({ row }) => {
            const dev = row.original

            return (
                <>{dev.registroActivo ? 
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
            const dev = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <NavLink to={`/desarrolladores/${dev.codigoDesarrollador}`}>
                            <DropdownMenuItem><BookUserIcon></BookUserIcon>Ver detalles</DropdownMenuItem>
                        </NavLink>
                        <NavLink to={`/desarrolladores/${dev.codigoDesarrollador}/editar`}>
                            <DropdownMenuItem><Edit></Edit>Editar</DropdownMenuItem>
                        </NavLink>
                        <NavLink to={`/desarrolladores/${dev.codigoDesarrollador}/asignar-proyecto`}>
                            <DropdownMenuItem><DiamondPlusIcon></DiamondPlusIcon>Asignar proyecto</DropdownMenuItem>
                        </NavLink>
                        <DropdownMenuSeparator />
                        {dev.registroActivo ?
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => (table.options.meta as any)?.deleteDeveloper(dev.codigoDesarrollador)}
                            >
                                <Trash2Icon className="text-red-600"></Trash2Icon>Eliminar
                            </DropdownMenuItem>
                            :
                            <DropdownMenuItem
                                onClick={() => (table.options.meta as any)?.reactivateDeveloper(dev.codigoDesarrollador)}
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