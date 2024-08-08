import { useState } from "react";
import Modal from "../Modal/Modal";
import { DialogTrigger } from "../ui/dialog";
import { handleApiResponse } from "@/utils/apiResponseHandler";
import EditIcon from "../EditIcon/EditIcon";

const EditEntity = ({ api, refresh, refresh2, data, ModalContent, title }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (id, newData) => {
    api.update(id, newData).then((res) => {
      handleApiResponse(res, refresh2 ? [refresh, refresh2] : [refresh]);
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
        <ModalContent
          handleOperation={handleEdit}
          setIsOpen={setOpenDialog}
          data={data}
          title={title}
          isOpen={openDialog}
        />
      </Modal>
    </div>
  );
};

export default EditEntity;
