import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { SelectDepartment } from "./SelectDepartment";
import { fields } from "./EmpInputFields";
import { SelectProject } from "./SelectProject";
import ModalHeader from "../Modal/ModalHeader";

const EmpModalContent = ({ handleOperation, data, setIsOpen }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (data) {
      if (data.projects.length)
        setFormData({ ...data, ["project_id"]: data.projects[0]?.id });
      else setFormData(data);
    }
  }, [data]);

  const validate = () => {
    let valid = true;
    let errors = {};

    fields.forEach((field) => {
      let value = formData[field.name];
      if (field.name === "projects") {
        value = formData["project_id"];
      }
      if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[field.name] = `${field.label} is required`;
        valid = false;
      } else if (field.name === "age" && (value < 21 || value > 100)) {
        errors[field.name] = `${field.label} must be between 21 and 100`;
        valid = false;
      }
    });

    console.log(valid);
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
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (name === "projects")
      setFormData({ ...formData, ["project_id"]: value });
    else setFormData({ ...formData, [name]: value });
  };

  console.log(formData, errors);

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <ModalHeader
          title={data ? "Edit Employee" : "New Employee"}
          description="Provide Employee details & Click save when youre done."
        />
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor={field.name} className="text-right col-span-1">
                {field.label}
              </Label>
              {field.name === "department_id" ? (
                <SelectDepartment
                  depvalue={formData[field.name] || ""}
                  name={field.name}
                  handleChange={handleChange}
                  className="col-span-3"
                />
              ) : field.name === "projects" ? (
                <SelectProject
                  projvalue={
                    formData[field.name]?.length
                      ? formData[field.name][0]?.id
                      : "" || ""
                  }
                  name={field.name}
                  handleChange={handleChange}
                  className="col-span-3"
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
