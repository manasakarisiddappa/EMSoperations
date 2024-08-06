import { useState } from "react";
import Modal from "../Modal/Modal";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import EmpModalContent from "./EmpModalContent";
import { empApi } from "@/services/apiConfig";

const CreateEmployee = ({ refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreate = (newdata) => {
    empApi
      .create(newdata)
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
          <div className="flex justify-end mb-2">
            <Button>Create</Button>
          </div>
        </DialogTrigger>
        <EmpModalContent
          handleOperation={handleCreate}
          setIsOpen={setOpenDialog}
        />
      </Modal>
    </div>
  );
};

export default CreateEmployee;
