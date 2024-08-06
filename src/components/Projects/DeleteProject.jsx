import { projApi } from "@/services/apiConfig";
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

const DeleteProject = ({ id, refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = () => {
    projApi
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
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              Project and remove it.
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

export default DeleteProject;
