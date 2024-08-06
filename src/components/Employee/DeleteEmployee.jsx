import { empApi } from "@/services/apiConfig";
import { useState } from "react";
import Modal from "../Modal/Modal";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const DeleteEmployee = ({ id, refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = () => {
    empApi
      .delete(id)
      .then((res) => {
        console.log(res.msg);
        refresh();
      })
      .catch((err) => {
        console.log("error deleting data", err);
      });
  };

  return (
    <div>
      <Modal isOpen={openDialog} setIsOpen={setOpenDialog}>
        <DialogTrigger asChild>
          <div>
            <Button variant="destructive">Delete</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              Employee and remove it.
            </DialogDescription>
          </DialogHeader>
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
