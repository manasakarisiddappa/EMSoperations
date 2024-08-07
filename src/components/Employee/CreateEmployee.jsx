import { useState } from "react";
import Modal from "../Modal/Modal";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import EmpModalContent from "./EmpModalContent";
import { empApi } from "@/services/apiConfig";
import { toast } from "react-toastify";

const CreateEmployee = ({ refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreate = (newdata) => {
    empApi
      .create(newdata)
      .then((res) => {
        toast.success(res.msg);
        console.log(res.data);
        refresh();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        console.log("error edit data", err.response.data.msg);
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
