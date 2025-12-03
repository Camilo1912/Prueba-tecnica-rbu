import { columns } from "./columns"
import { DataTable } from "./DataTable"
import { useDevelopersStore } from "@/store/desarrolladores"


const DeveloperTable = () => {
  const { developers, deleteDeveloper, reactivateDeveloper } = useDevelopersStore()

  return (
    <div className="pt-2">
      <DataTable columns={columns} data={developers} meta={{ deleteDeveloper, reactivateDeveloper }} />
    </div>
  )
}

export default DeveloperTable