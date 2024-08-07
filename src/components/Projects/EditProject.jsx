import Modal from "../Modal/Modal";
import { projApi } from "@/services/apiConfig";
import { DialogTrigger } from "../ui/dialog";
import ProjectModalContent from "./ProjectModalContent";
import { useState } from "react";
import EditIcon from "../EditIcon/EditIcon";
import { toast } from "react-toastify";

const EditProject = ({ refresh, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    projApi
      .update(id, newdata)
      .then((res) => {
        console.log(res.data);
        toast.success(res.msg);
        refresh();
      })
      .catch((err) => {
        console.log("error edit data", err);
        toast.error(err.response.data.msg);
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
