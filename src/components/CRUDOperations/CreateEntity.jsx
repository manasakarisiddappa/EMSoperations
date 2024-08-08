import { useState } from "react";
import Modal from "../Modal/Modal";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { handleApiResponse } from "@/utils/apiResponseHandler";

const CreateEntity = ({ entityApi, ModalContent, refresh, buttonLabel }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreate = (newdata) => {
    entityApi.create(newdata).then((res) => {
      handleApiResponse(res, [refresh]);
    });
  };

  return (
    <div>
      <Modal isOpen={openDialog} setIsOpen={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="w-max">
            <Button>{buttonLabel}</Button>
          </div>
        </DialogTrigger>
        <ModalContent
          handleOperation={handleCreate}
          setIsOpen={setOpenDialog}
        />
      </Modal>
    </div>
  );
};

export default CreateEntity;
