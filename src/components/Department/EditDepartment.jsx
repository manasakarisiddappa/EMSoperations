import Modal from "../Modal/Modal";
import { depApi } from "@/services/apiConfig";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";
import DepModalContent from "./DepModalContent";
import { useState } from "react";

const EditDepartment = ({ refresh, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    depApi
      .update(id, newdata)
      .then((res) => {
        console.log(res.data);
        refresh();
      })
      .catch((err) => {
        console.log("error edit data", err);
      });
  };

  return (
    <div>
      <Modal isOpen={openDialog} setIsOpen={setOpenDialog}>
        <DialogTrigger asChild>
          <div>
            <Button variant="secondary" className>
              Edit
            </Button>
          </div>
        </DialogTrigger>
        <DepModalContent
          handleOperation={handleEdit}
          setIsOpen={setOpenDialog}
          data={data}
        />
      </Modal>
    </div>
  );
};

export default EditDepartment;
