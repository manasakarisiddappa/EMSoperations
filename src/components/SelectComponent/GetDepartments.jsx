import { depApi } from "@/services/apiConfig";
import { useEffect, useState } from "react";
import { SelectComponent } from "./SelectComponent";

const GetDepartments = ({ handleSelectError, name, value, handleChange }) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  const fetchData = () => {
    depApi.getData().then((res) => {
      const message = res.message;
      if (res.success) {
        setOptions(res.data);
      } else {
        handleSelectError(name, message);
        setError(message);
        console.log(`Error fetching ${name}`, message);
      }
    });
  };

  useEffect(() => {
    if (!options.length) fetchData();
  }, [options]);

  return (
    <SelectComponent
      error={error}
      options={options}
      valueKey="id"
      labelKey="name"
      title="Departments"
      name={name}
      handleChange={handleChange}
      placeholder="Select a department"
      value={value}
    />
  );
};

export default GetDepartments;
