export type Desarrollador = {
    codigoDesarrollador: number;
    nombre: string;
    rut: string;
    correoElectronico: string;
    fechaContratacion: string;
    aniosExperiencia: number;
    registroActivo: boolean;
}

export type DesarrolladorPayload = {
    nombre: string;
    rut: string;
    correoElectronico: string;
    fechaContratacion: string;
    aniosExperiencia: number;
}

export type Proyecto = {
    codigoProyecto: number;
    nombre: string;
    fechaInicio: string;
    fechaTermino: string;
    registroActivo: boolean;
}

export type ProyectoPayload = {
    nombre: string;
    fechaInicio: string;
    fechaTermino: string;
}

export type ProyectoAsignado = {
    codigoProyecto: number;
    nombre: string;
    fechaInicio: string;
    fechaTermino: string;
    registroActivo: boolean;
}

export type DesarrolladorAsignado = {
    codigoDesarrollador: number;
    nombre: string;
    rut: string;
    correoElectronico: string;
    fechaContratacion: string;
    aniosExperiencia: number;
    registroActivo: boolean;
}

export type TestConnectionResponse = {
    isConnected: boolean;
}


// export type EstadoFiltro = {
//     developerName: string,
//     status: 'Activo' | 'Inactivo' | 'Todos'
//     setFilter: (key, value) => void;
// }