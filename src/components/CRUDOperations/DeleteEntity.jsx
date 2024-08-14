import { useState } from "react";
import Modal from "../CommonComponents/Modal/Modal";
import { DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import DeleteIcon from "../Icons/DeleteIcon";
import ModalHeader from "../CommonComponents/Modal/ModalHeader";
import { handleApiResponse } from "@/utils/apiResponseHandler";
import ModalCloseButton from "../CommonComponents/Modal/ModalCloseButton";

const DeleteEntity = ({ entityApi, id, refresh, title, description }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    entityApi.delete(id).then((res) => {
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
          <ModalHeader title={title} description={description} />
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

export default DeleteEntity;
