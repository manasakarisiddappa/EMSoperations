import { empApi } from "@/services/apiConfig";
import { useState } from "react";
import Modal from "../Modal/Modal";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import DeleteIcon from "../DeleteIcon/DeleteIcon";
import { toast } from "react-toastify";
import ModalHeader from "../Modal/ModalHeader";

const DeleteEmployee = ({ id, refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = () => {
    empApi
      .delete(id)
      .then((res) => {
        toast.success(res.msg);
        console.log(res.msg);
        refresh();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        console.log("error deleting data", err);
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
            title="Delete Employee"
            description="This action cannot be undone. This will permanently delete your
              Employee and remove it."
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpenDialog(false)}
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Modal>
    </div>
  );
};

export default DeleteEmployee;
