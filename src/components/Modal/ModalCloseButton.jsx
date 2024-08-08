import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";

const ModalCloseButton = ({ handleClose }) => {
  return (
    <DialogClose asChild>
      <Button type="button" variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </DialogClose>
  );
};

export default ModalCloseButton;
