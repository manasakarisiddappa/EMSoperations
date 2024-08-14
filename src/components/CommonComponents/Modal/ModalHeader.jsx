import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";

const ModalHeader = ({ title, description }) => {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  );
};

export default ModalHeader;
