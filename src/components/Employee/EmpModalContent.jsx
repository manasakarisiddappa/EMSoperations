import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import ModalHeader from "../CommonComponents/Modal/ModalHeader";
import ModalCloseButton from "../CommonComponents/Modal/ModalCloseButton";
import GetDepartments from "../CommonComponents/SelectComponent/GetDepartments";
import GetProjects from "../CommonComponents/SelectMultipleComponent/GetProject";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "age", label: "Age", type: "text" },
  { name: "department_id", label: "Department", type: "select" },
  { name: "project_ids", label: "Projects", type: "select" },
  // Add more fields as needed
];
const MAX_PROJECTS = 3;

const EmpModalContent = ({ handleOperation, data, setIsOpen, isOpen }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [projectNames, setProjectNames] = useState([]);

  useEffect(() => {
    if (isOpen && data) {
      let initialData;

      if (data.projects?.length) {
        initialData = {
          ...data,
          project_ids: data.projects.map((project) => project.id),
        };
        setProjectNames(data.projects.map((project) => project.name));
      } else {
        initialData = data;
      }
      setFormData(initialData);
    } else if (!isOpen) {
      setFormData({});
    }
  }, [isOpen, data]);

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };

    fields.forEach((field) => {
      let value = formData[field.name];
      // if (field.name === "projects") {
      //   value = formData["project_ids"];
      // }
      if (
        !value ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "object" && !value.length)
      ) {
        // Only add error if not already present
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
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
    setProjectNames([]);
  };

  console.log(errors, formData, projectNames);

  const handleChange = (name, value) => {
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name, value, displayName, checked = false) => {
    if (checked && formData[name]?.length >= MAX_PROJECTS) {
      setErrors({
        ...errors,
        [name]: `Cannot select more than ${MAX_PROJECTS} projects.`,
      });
      return;
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    const updatedProjectIds = checked
      ? [...(formData[name] || []), value]
      : formData[name].filter((id) => id !== value);

    setFormData({ ...formData, [name]: updatedProjectIds });
    setProjectNames(
      checked
        ? [...projectNames, displayName]
        : projectNames.filter((name) => name !== displayName)
    );
  };

  const handleDropdownClose = (isOpen) => {
    if (!isOpen) {
      if (errors["project_ids"] && formData["project_ids"]?.length) {
        setErrors({ ...errors, ["project_ids"]: "" });
      }
    }
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
              {field.name === "project_ids" && projectNames.length ? (
                <>
                  <Label htmlFor={field.name} className="text-right col-span-1">
                    Selected Projects
                  </Label>

                  <div className="text-sm col-start-2 col-end-5 flex items-center gap-2 text-clip">
                    {projectNames.length
                      ? projectNames.map((project) => (
                          <span key={project}>{project}</span>
                        ))
                      : "none"}
                  </div>
                </>
              ) : (
                ""
              )}
              {errors[field.name] && (
                <Label
                  htmlFor={field.name}
                  className="text-red-600 text-xs col-span-4 text-right"
                >
                  {errors[field.name]}
                </Label>
              )}
              <Label htmlFor={field.name} className="text-right col-span-1">
                {field.label}
              </Label>
              {field.name === "department_id" ? (
                <GetDepartments
                  value={formData[field.name] || ""}
                  name={field.name}
                  handleChange={handleChange}
                  handleSelectError={handleSelectError}
                  className="col-span-3"
                />
              ) : field.name === "project_ids" ? (
                <GetProjects
                  name="project_ids"
                  values={formData["project_ids"]}
                  handleChange={handleCheckboxChange}
                  handleSelectError={handleSelectError}
                  onDropdownClose={handleDropdownClose}
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
