// import { useEffect, useState } from "react";
import { projApi } from "@/services/apiConfig";
import { MultiSelectWithCheckbox } from "./MultiSelectWithCheckbox";
import { useEffect, useState } from "react";

const GetProjects = ({
  handleSelectError,
  name,
  values,
  handleChange,
  onDropdownClose,
}) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const fetchProjects = () => {
    projApi.getData().then((res) => {
      const message = res.message;
      if (res.success) {
        setProjects(res.data);
      } else {
        handleSelectError(name, message);
        setError(message);
        console.error(`Error fetching projects:`, message);
      }
    });
  };

  useEffect(() => {
    if (!projects.length) fetchProjects();
  }, [projects]);

  return (
    <MultiSelectWithCheckbox
      error={error}
      options={projects}
      values={values}
      name={name}
      handleChange={handleChange}
      onDropdownClose={onDropdownClose}
    />
  );
};

export default GetProjects;
