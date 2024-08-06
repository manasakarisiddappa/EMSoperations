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
import DeleteProject from "./DeleteProject";

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
          {data.map((dep) => (
            <TableRow key={dep.id}>
              <TableCell>{dep.id} </TableCell>
              <TableCell>{dep.name} </TableCell>
              <TableCell>
                <EditProject refresh={refresh} data={dep} />{" "}
              </TableCell>
              <TableCell>
                <DeleteProject id={dep.id} refresh={refresh} />{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectTable;
