import type { Desarrollador, Proyecto, ProyectoPayload } from "@/custom-types.d"
import { create } from "zustand"
import { getProjects, deleteProject, reactivateProject, createProject, getProjectDevelopers, assignDeveloperToProject, unassignDeveloperFromProject } from "@/api/projects"

type State = {
    projects: Proyecto[]
    projectDevelopers: Desarrollador[]
    fetchProjects: () => Promise<void>
    fetchProjectDevelopers: (proyId: number) => Promise<void>
    assignDeveloper: (proyId: number, devId: number) => Promise<void>
    unassignDeveloper: (proyId: number, devId: number) => Promise<void>
    createProject: (payload: ProyectoPayload) => Promise<void>
    deleteProject: (id: number) => Promise<void>
    reactivateProject: (id: number) => Promise<void>
}

export const useProjectsStore = create<State>((set) => {
    return {
        projects: [],
        projectDevelopers: [],
        fetchProjects: async () => {
            try {
                const projects = await getProjects()
                set({ projects })
            } catch (error) {
                console.error("Fallo en la obtención de proyectos:", error)
            }
        },
        fetchProjectDevelopers: async (proyId: number) => {
            try {
                const projects = await getProjectDevelopers(proyId)
                set({ projectDevelopers: projects })
            } catch (error) {
                console.error("Failed to fetch project developers:", error)
            }
        },
        assignDeveloper: async (proyId: number, devId: number) => {
            try {
                await assignDeveloperToProject(proyId, devId)
                const developers = await getProjectDevelopers(proyId)
                set({ projectDevelopers: developers })
            } catch (error) {
                console.error("Failed to assign developer:", error)
                throw error
            }
        },
        unassignDeveloper: async (proyId: number, devId: number) => {
            try {
                await unassignDeveloperFromProject(proyId, devId)
                const developers = await getProjectDevelopers(proyId)
                set({ projectDevelopers: developers })
            } catch (error) {
                console.error("Failed to unassign developer:", error)
                throw error
            }
        },
        createProject: async (payload: ProyectoPayload) => {
            try {
                const newProject = await createProject(payload)
                set((state) => ({
                    projects: [...state.projects, newProject] 
                }));
            } catch (error) {
                console.error("Failed to delete developer:", error)
            }
        },
        deleteProject: async (id: number) => {
            try {
                await deleteProject(id)
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.codigoProyecto === id ? { ...p, registroActivo: false } : p
                    )
                }))
            } catch (error) {
                console.error("Fallo al eliminar el proyecto:", error)
            }
        },
        reactivateProject: async (id: number) => {
            try {
                await reactivateProject(id)
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.codigoProyecto === id ? { ...p, registroActivo: true } : p
                    )
                }))
            } catch (error) {
                console.error("Fallo en la reactivación:", error)
            }
        }
    }
})