import Modal from "../Modal/Modal";
import { projApi } from "@/services/apiConfig";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";
import ProjectModalContent from "./ProjectModalContent";
import { useState } from "react";

const EditProject = ({ refresh, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    projApi
      .update(id, newdata)
      .then((res) => {
        console.log(res.data);
        refresh();
      })
      .catch((err) => {
        console.log("error edit data", err);
      });
  };

  return (
    <div>
      <Modal isOpen={openDialog} setIsOpen={setOpenDialog}>
        <DialogTrigger asChild>
          <div>
            <Button variant="secondary" className>
              Edit
            </Button>
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
