import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import ModalHeader from "../Modal/ModalHeader";
import ModalCloseButton from "../Modal/ModalCloseButton";

const DepModalContent = ({ handleOperation, setIsOpen, data }) => {
  const [newDep, setNewDep] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (data) setNewDep(data.name);
  }, [data]);

  const validate = () => {
    let valid = true;
    let errors = {};
    if (!newDep || newDep.trim() === "") {
      errors.name = "Department name is required";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleCreation = () => {
    if (validate()) {
      if (data) handleOperation(data.id, { name: newDep });
      else handleOperation({ name: newDep });

      handleDialogClose();
    }
  };

  const handleOnFocus = () => {
    setErrors("");
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setErrors("");
    setNewDep("");
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <ModalHeader
          title={data ? "Edit Department" : "New Department"}
          description="Provide department name & Click save when youre done."
        />

        <div className="grid gap-4 py-4">
          {errors.name && (
            <Label htmlFor="name" className="text-red-600 text-xs w-max ml-24">
              {errors.name}
            </Label>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Department Name
            </Label>
            <Input
              id="name"
              onFocus={handleOnFocus}
              value={newDep}
              className="col-span-3"
              onChange={(e) => setNewDep(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <ModalCloseButton handleClose={handleDialogClose} />
          <Button type="submit" onClick={handleCreation}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DepModalContent;
