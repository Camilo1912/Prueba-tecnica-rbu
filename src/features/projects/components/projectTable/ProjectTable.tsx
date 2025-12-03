import { useProjectsStore } from "@/store/proyectos"
import { DataTable } from "./DataTable"
import { columns } from "./columns"


const ProjectTable = () => {
    const { projects, deleteProject, reactivateProject } = useProjectsStore()

    return (
        <div className="pt-2">
            <DataTable columns={columns} data={projects} meta={{ deleteProject, reactivateProject }} />
        </div>
    )
}

export default ProjectTable