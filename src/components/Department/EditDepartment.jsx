import Modal from "../Modal/Modal";
import { depApi } from "@/services/apiConfig";
import { DialogTrigger } from "../ui/dialog";
import DepModalContent from "./DepModalContent";
import { useState } from "react";
import EditIcon from "../EditIcon/EditIcon";
import { handleApiResponse } from "@/utils/apiResponseHandler";

const EditDepartment = ({ refresh, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    depApi.update(id, newdata).then((res) => {
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
