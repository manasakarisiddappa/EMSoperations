import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteDepartment from "./DeleteDepartment";
import EditDepartment from "./EditDepartment";

const DepartmentTable = ({ data, refresh }) => {
  return (
    <div>
      <Table className="w-auto mt-5">
        <TableCaption>All Departments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-left">Id</TableHead>
            <TableHead className=" text-left">Name</TableHead>
            <TableHead className=" text-left">Edit</TableHead>
            <TableHead className=" text-left">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((dep) => (
            <TableRow key={dep.id}>
              <TableCell className=" text-left">{dep.id} </TableCell>
              <TableCell className=" text-left">{dep.name} </TableCell>
              <TableCell className="justify-center items-center">
                <EditDepartment refresh={refresh} data={dep} />{" "}
              </TableCell>
              <TableCell className="justify-center items-center">
                <DeleteDepartment id={dep.id} refresh={refresh} />{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepartmentTable;
