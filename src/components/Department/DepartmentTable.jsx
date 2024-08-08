import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteEntity from "../CRUDOperations/DeleteEntity";
import { depApi } from "@/services/apiConfig";
import EditEntity from "../CRUDOperations/EditEntity";
import DepModalContent from "./DepModalContent";

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
                {/* <EditDepartment refresh={refresh} data={dep} />{" "} */}
                <EditEntity
                  api={depApi}
                  refresh={refresh}
                  data={dep}
                  ModalContent={DepModalContent}
                  title="Edit Department"
                />
              </TableCell>
              <TableCell className="justify-center items-center">
                <DeleteEntity
                  entityApi={depApi}
                  id={dep.id}
                  refresh={refresh}
                  title="Delete Department"
                  description="This action cannot be undone. This will permanently delete your Department and remove it."
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DepartmentTable;
