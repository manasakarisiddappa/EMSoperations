import { projApi } from "@/services/apiConfig";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import DeleteIcon from "../DeleteIcon/DeleteIcon";
import ModalHeader from "../Modal/ModalHeader";
import { handleApiResponse } from "@/utils/apiResponseHandler";
import ModalCloseButton from "../Modal/ModalCloseButton";

const DeleteProject = ({ id, refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = () => {
    projApi.delete(id).then((res) => {
      handleApiResponse(res, [refresh]);
    });
  };

  return (
    <div>
      <Modal isOpen={openDialog} setIsOpen={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <DeleteIcon size={22} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <ModalHeader
            title="Delete Project"
            description="This action cannot be undone. This will permanently delete your
              Project and remove it."
          />
          <DialogFooter>
            <ModalCloseButton handleClose={() => setOpenDialog(false)} />
            <Button type="submit" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Modal>
    </div>
  );
};

export default DeleteProject;
