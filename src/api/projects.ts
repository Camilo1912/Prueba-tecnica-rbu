import { authenticatedFetch } from "./apiClient";
import type { DesarrolladorAsignado, Proyecto, ProyectoPayload } from "@/custom-types.d";

export const getProjects = async (): Promise<Proyecto[]> => {
    return authenticatedFetch("/proyectos");
}

export const deleteProject = async (id: number): Promise<void> => {
    return authenticatedFetch(`/proyectos/${id}`, {
        method: 'DELETE'
    });
}

export const reactivateProject = async (id: number): Promise<void> => {
    return authenticatedFetch(`/proyectos/${id}/reactivar`, {
        method: 'PUT'
    });
}

export const createProject = async (payload: ProyectoPayload): Promise<Proyecto> => {
    return authenticatedFetch("/proyectos", {
        method: 'POST',
        body: JSON.stringify(payload)
    })
}

export const getProjectDevelopers = async (proyId: number): Promise<DesarrolladorAsignado[]> => {
    return authenticatedFetch(`/proyectos/${proyId}/desarrolladores`, {
        method: 'GET'
    });
}

export const assignDeveloperToProject = async (projectId: number, developerId: number): Promise<void> => {
    return authenticatedFetch(`/proyectos/${projectId}/desarrolladores/${developerId}`, {
        method: 'POST'
    });
}

export const unassignDeveloperFromProject = async (projectId: number, developerId: number): Promise<void> => {
    return authenticatedFetch(`/proyectos/${projectId}/desarrolladores/${developerId}`, {
        method: 'DELETE'
    });
}