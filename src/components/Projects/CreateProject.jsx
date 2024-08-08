import { projApi } from "@/services/apiConfig";
import ProjectModalContent from "./ProjectModalContent";
import Modal from "../Modal/Modal";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { handleApiResponse } from "@/utils/apiResponseHandler";

const CreateProject = ({ refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreate = (newdata) => {
    projApi.create(newdata).then((res) => {
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
        <ProjectModalContent
          handleOperation={handleCreate}
          setIsOpen={setOpenDialog}
        />
      </Modal>
    </div>
  );
};

export default CreateProject;
