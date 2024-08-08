import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import ModalHeader from "../Modal/ModalHeader";
import ModalCloseButton from "../Modal/ModalCloseButton";
import { SelectComponent } from "../SelectComponent/SelectComponent";
import { depApi, projApi } from "@/services/apiConfig";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "age", label: "Age", type: "text" },
  { name: "department_id", label: "Department", type: "select" },
  { name: "projects", label: "Projects", type: "select" },
  // Add more fields as needed
];

const EmpModalContent = ({ handleOperation, data, setIsOpen, isOpen }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && data) {
      const initialData = data.projects?.length
        ? { ...data, project_id: data.projects[0]?.id }
        : data;
      setFormData(initialData);
    } else if (!isOpen) {
      setFormData({});
    }
  }, [isOpen, data]);

  console.log(formData);

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };

    fields.forEach((field) => {
      let value = formData[field.name];
      if (field.name === "projects") {
        value = formData["project_id"];
      }
      if (!value || (typeof value === "string" && value.trim() === "")) {
        if (!newErrors[field.name]) {
          // Only add error if not already present
          newErrors[field.name] = `${field.label} is required`;
          valid = false;
        }
      } else if (field.name === "age" && (value < 21 || value > 100)) {
        newErrors[field.name] = `${field.label} must be between 21 and 100`;
        valid = false;
      }
    });

    setErrors(newErrors);
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

  console.log(errors, formData);

  const handleChange = (name, value) => {
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (name === "projects")
      setFormData({ ...formData, ["project_id"]: value });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSelectError = useCallback((name, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  }, []);

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
                <SelectComponent
                  api={depApi}
                  valueKey="id"
                  labelKey="name"
                  value={formData[field.name] || ""}
                  title="Departments"
                  name={field.name}
                  handleChange={handleChange}
                  handleSelectError={handleSelectError}
                  placeholder="Select a department"
                  className="col-span-3"
                />
              ) : field.name === "projects" ? (
                <SelectComponent
                  api={projApi}
                  valueKey="id"
                  labelKey="name"
                  value={formData["project_id"] || ""}
                  title="Projects"
                  name={field.name}
                  handleChange={handleChange}
                  handleSelectError={handleSelectError}
                  placeholder="Select a project"
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
          <ModalCloseButton handleClose={handleDialogClose} />
          <Button
            type="submit"
            onClick={handleCreation}
            disabled={Object.values(errors).some((error) => error)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default EmpModalContent;
