import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import ModalHeader from "../Modal/ModalHeader";
import ModalCloseButton from "../Modal/ModalCloseButton";

const ProjectModalContent = ({ handleOperation, setIsOpen, data }) => {
  const [newProj, setNewProj] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (data) setNewProj(data.name);
  }, [data]);

  const validate = () => {
    let valid = true;
    let errors = {};
    if (!newProj || newProj.trim() === "") {
      errors.name = "Project name is required";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleCreation = () => {
    if (validate()) {
      if (data) handleOperation(data.id, { name: newProj });
      else handleOperation({ name: newProj });

      handleDialogClose();
    }
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setErrors("");
    setNewProj("");
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <ModalHeader
          title={data ? "Edit Project" : "New Project"}
          description="Provide Project name & Click save when youre done."
        />

        <div className="grid gap-4 py-4">
          {errors.name && (
            <Label htmlFor="name" className="text-red-600 text-xs w-max ml-24">
              {errors.name}
            </Label>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              value={newProj}
              className="col-span-3"
              onChange={(e) => setNewProj(e.target.value)}
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

export default ProjectModalContent;
