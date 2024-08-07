import Modal from "../Modal/Modal";
import { depApi } from "@/services/apiConfig";
import { DialogTrigger } from "../ui/dialog";
import DepModalContent from "./DepModalContent";
import { useState } from "react";
import EditIcon from "../EditIcon/EditIcon";
import { toast } from "react-toastify";

const EditDepartment = ({ refresh, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    depApi
      .update(id, newdata)
      .then((res) => {
        toast.success(res.msg);
        console.log(res.data);
        refresh();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        console.log("error edit data", err);
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
        <DepModalContent
          handleOperation={handleEdit}
          setIsOpen={setOpenDialog}
          data={data}
        />
      </Modal>
    </div>
  );
};

export default EditDepartment;
