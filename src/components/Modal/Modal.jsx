import { Dialog } from "@/components/ui/dialog";

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </Dialog>
    </div>
  );
};

export default Modal;
