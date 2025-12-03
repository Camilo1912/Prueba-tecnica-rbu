import { authenticatedFetch } from "./apiClient";
import type { Desarrollador, DesarrolladorPayload, ProyectoAsignado } from "@/custom-types.d";

export const getDevelopers = async (): Promise<Desarrollador[]> => {
    return authenticatedFetch("/desarrolladores", {
        method: 'GET'
    });
}

export const createDeveloper = async (devPaylaod: DesarrolladorPayload): Promise<Desarrollador> => {
    return authenticatedFetch("/desarrolladores", {
        method: 'POST',
        body: JSON.stringify(devPaylaod)
    })
}

export const updateDeveloper = async (id: number, devPayload: DesarrolladorPayload): Promise<Desarrollador> => {
    return authenticatedFetch(`/desarrolladores/${id}`, {
        method: 'PUT',
        body: JSON.stringify(devPayload)
    })
}

export const deleteDeveloper = async (id: number): Promise<void> => {
    return authenticatedFetch(`/desarrolladores/${id}`, {
        method: 'DELETE'
    });
}

export const reactivateDeveloper = async (id: number): Promise<void> => {
    return authenticatedFetch(`/desarrolladores/${id}/reactivar`, {
        method: 'PUT'
    });
}

export const getDeveloperProjects = async (devId: number): Promise<ProyectoAsignado[]> => {
    return authenticatedFetch(`/desarrolladores/${devId}/proyectos`, {
        method: 'GET'
    });
}

export const assignProjectToDeveloper = async (proyId: number, devId: number): Promise<void> => {
    return authenticatedFetch(`/proyectos/${proyId}/desarrolladores/${devId}`, {
        method: 'POST'
    });
}

export const unassignProjectFromDeveloper = async (proyId: number, devId: number): Promise<void> => {
    return authenticatedFetch(`/proyectos/${proyId}/desarrolladores/${devId}`, {
        method: 'DELETE'
    });
}