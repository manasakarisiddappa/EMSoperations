import { useState } from "react";
import Modal from "../Modal/Modal";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import EmpModalContent from "./EmpModalContent";
import { empApi } from "@/services/apiConfig";
import { handleApiResponse } from "@/utils/apiResponseHandler";

const CreateEmployee = ({ refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreate = (newdata) => {
    empApi.create(newdata).then((res) => {
      handleApiResponse(res, [refresh]);
    });
  };

  return (
    <div>
      <Modal isOpen={openDialog} setIsOpen={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="w-max">
            <Button className="">Create</Button>
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
