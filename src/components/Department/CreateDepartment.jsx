import { depApi } from "@/services/apiConfig";
import DepModalContent from "./DepModalContent";
import Modal from "../Modal/Modal";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { handleApiResponse } from "@/utils/apiResponseHandler";

const CreateDepartment = ({ refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreate = (newdata) => {
    depApi.create(newdata).then((res) => {
      handleApiResponse(res, [refresh]);
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
        <DepModalContent
          handleOperation={handleCreate}
          setIsOpen={setOpenDialog}
        />
      </Modal>
    </div>
  );
};

export default CreateDepartment;
