import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditProject from "./EditProject";
import { projApi } from "@/services/apiConfig";
import DeleteEntity from "../CRUDOperations/DeleteEntity";

const ProjectTable = ({ data, refresh }) => {
  return (
    <div>
      <Table className="w-auto mt-5">
        <TableCaption>All Projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-center">Id</TableHead>
            <TableHead className=" text-center">Name</TableHead>
            <TableHead className=" text-center">Edit</TableHead>
            <TableHead className=" text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id} </TableCell>
              <TableCell>{project.name} </TableCell>
              <TableCell>
                <EditProject refresh={refresh} data={project} />{" "}
              </TableCell>
              <TableCell>
                <DeleteEntity
                  entityApi={projApi}
                  id={project.id}
                  refresh={refresh}
                  title="Delete Project"
                  description="This action cannot be undone. This will permanently delete your Project and remove it."
                />
                {/* <DeleteProject id={project.id} refresh={refresh} />{" "} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectTable;
