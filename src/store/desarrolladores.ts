import { create } from 'zustand'
import { type Desarrollador, type DesarrolladorPayload, type Proyecto } from '../custom-types.d'
import { getDevelopers, deleteDeveloper, reactivateDeveloper, createDeveloper, getDeveloperProjects, assignProjectToDeveloper, unassignProjectFromDeveloper, updateDeveloper } from '@/api/developers'

type State = {
    developers: Desarrollador[]
    developerProjects: Proyecto[]
    fetchDevelopers: () => Promise<void>
    fetchDeveloperProjects: (devId: number) => Promise<void>
    assignProject: (proyId: number, devId: number) => Promise<void>
    unassignProject: (proyId: number, devId: number) => Promise<void>
    createDeveloper: (dev: DesarrolladorPayload) => Promise<void>
    updateDeveloper: (devId: number, dev: DesarrolladorPayload) => Promise<void>
    deleteDeveloper: (id: number) => Promise<void>
    reactivateDeveloper: (id: number) => Promise<void>
}

export const useDevelopersStore = create<State>((set) => {
    return {
        developers: [],
        developerProjects: [],
        fetchDevelopers: async () => {
            try {
                const developers = await getDevelopers()
                set({ developers })
            } catch (error) {
                console.error("Failed to fetch developers:", error)
            }
        },
        fetchDeveloperProjects: async (devId: number) => {
            try {
                const projects = await getDeveloperProjects(devId)
                set({ developerProjects: projects })
            } catch (error) {
                console.error("Failed to fetch developer projects:", error)
            }
        },
        assignProject: async (proyId: number, devId: number) => {
            try {
                await assignProjectToDeveloper(proyId, devId)
                const projects = await getDeveloperProjects(devId)
                set({ developerProjects: projects })
            } catch (error) {
                console.error("Failed to assign project:", error)
                throw error
            }
        },
        unassignProject: async (proyId: number, devId: number) => {
            try {
                await unassignProjectFromDeveloper(proyId, devId)
                const projects = await getDeveloperProjects(devId)
                set({ developerProjects: projects })
            } catch (error) {
                console.error("Failed to unassign project:", error)
                throw error
            }
        },
        createDeveloper: async (dev: DesarrolladorPayload) => {
            try {
                const newDeveloper = await createDeveloper(dev)
                set((state) => ({
                    developers: [...state.developers, newDeveloper] 
                }));
            } catch (error) {
                console.error("Failed to delete developer:", error)
            }
        },
        updateDeveloper: async (id: number, dev: DesarrolladorPayload) => {
            try {
                const updatedDeveloper = await updateDeveloper(id, dev)
                set((state) => ({
                    developers: state.developers.map((d) =>
                        d.codigoDesarrollador === id ? updatedDeveloper : d
                    )
                }));
            } catch (error) {
                console.error("Failed to update developer:", error)
                throw error
            }
        },
        deleteDeveloper: async (id: number) => {
            try {
                await deleteDeveloper(id)
                set((state) => ({
                    developers: state.developers.map((d) =>
                        d.codigoDesarrollador === id ? { ...d, registroActivo: false } : d
                    )
                }))
            } catch (error) {
                console.error("Failed to delete developer:", error)
            }
        },
        reactivateDeveloper: async (id: number) => {
            try {
                await reactivateDeveloper(id)
                set((state) => ({
                    developers: state.developers.map((d) =>
                        d.codigoDesarrollador === id ? { ...d, registroActivo: true } : d
                    )
                }))
            } catch (error) {
                console.error("Failed to reactivate developer:", error)
            }
        }
    }
})