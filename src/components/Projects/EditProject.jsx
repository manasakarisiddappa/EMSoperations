import Modal from "../Modal/Modal";
import { projApi } from "@/services/apiConfig";
import { DialogTrigger } from "../ui/dialog";
import ProjectModalContent from "./ProjectModalContent";
import { useState } from "react";
import EditIcon from "../EditIcon/EditIcon";
import { handleApiResponse } from "@/utils/apiResponseHandler";

const EditProject = ({ refresh, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    projApi.update(id, newdata).then((res) => {
      handleApiResponse(res, [refresh]);
    });
  };

  return (
    <div>
      <Modal isOpen={openDialog} setIsOpen={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <EditIcon size={25} />
          </div>
        </DialogTrigger>
        <ProjectModalContent
          handleOperation={handleEdit}
          setIsOpen={setOpenDialog}
          data={data}
        />
      </Modal>
    </div>
  );
};

export default EditProject;
