import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { SelectDepartment } from "./SelectDepartment";
import { fields } from "./EmpInputFields";

const EmpModalContent = ({ handleOperation, data, setIsOpen }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const validate = () => {
    let valid = true;
    let errors = {};
    fields.forEach((field) => {
      const value = formData[field.name];

      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[field.name] = `${field.label} is required`;
        valid = false;
      }
    });
    setErrors(errors);
    return valid;
  };

  const handleCreation = () => {
    if (validate()) {
      if (data) {
        handleOperation(data.id, formData);
      } else {
        handleOperation(formData);
      }

      handleDialogClose();
    }
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setErrors({});
    setFormData({});
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? "Edit" : "New"} Employee</DialogTitle>
          <DialogDescription>
            Provide Employee details & Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              {field.type === "select" ? (
                <SelectDepartment
                  depvalue={formData[field.name] || ""}
                  name={field.name}
                  handleChange={handleChange}
                />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  className="col-span-3"
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              )}
              {errors[field.name] && (
                <Label
                  htmlFor={field.name}
                  className="text-red-600 text-xs col-span-4 text-right"
                >
                  {errors[field.name]}
                </Label>
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={handleDialogClose}
            >
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleCreation}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default EmpModalContent;
