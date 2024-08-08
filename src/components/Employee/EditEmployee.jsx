import Modal from "../Modal/Modal";
import { empApi } from "@/services/apiConfig";
import { DialogTrigger } from "../ui/dialog";
import EmpModalContent from "./EmpModalContent";
import { useState } from "react";
import EditIcon from "../EditIcon/EditIcon";
import { handleApiResponse } from "@/utils/apiResponseHandler";

const EditEmployee = ({ refresh, refresh2, data }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newdata) => {
    empApi.update(id, newdata).then((res) => {
      handleApiResponse(res, [refresh, refresh2]);
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
        <EmpModalContent
          handleOperation={handleEdit}
          setIsOpen={setOpenDialog}
          data={data}
        />
      </Modal>
    </div>
  );
};

export default EditEmployee;
