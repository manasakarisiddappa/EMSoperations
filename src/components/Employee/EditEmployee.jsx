import Modal from "../Modal/Modal";
import { empApi } from "@/services/apiConfig";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";
import EmpModalContent from "./EmpModalContent";
import { useState } from "react";

const EditEmployee = ({ refresh, refresh2, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    empApi
      .update(id, newdata)
      .then((res) => {
        console.log(res.data);
        refresh();
        refresh2();
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
        <EmpModalContent
          handleOperation={handleEdit}
          setIsOpen={setOpenDialog}
          data={data}
        />
      </Modal>
    </div>
  );
};

export default EditEmployee;
