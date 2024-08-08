import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { depApi } from "@/services/apiConfig";
import { useCallback, useEffect, useState } from "react";

export function SelectDepartment({
  depvalue,
  name,
  handleChange,
  handleSelectError,
}) {
  const [alldep, setAllDep] = useState([]);
  const [value, setValue] = useState(depvalue);
  const [error, setError] = useState("");

  const getDepartment = useCallback(() => {
    depApi.getData().then((res) => {
      const message = res.message;
      if (res.success) {
        setAllDep(res.data);
      } else {
        handleSelectError(name, message);
        setError(message);
        console.log("error fetching the departments", message);
      }
    });
  }, [handleSelectError, name]);

  useEffect(() => {
    if (!alldep.length) getDepartment();
  }, [alldep]);

  const handleSelect = (e) => {
    setValue(e);
    handleChange(name, e);
  };

  return (
    <Select
      defaultValue={value}
      onValueChange={handleSelect}
      disabled={error ? true : false}
    >
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Select a depeartment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Departments</SelectLabel>
          {alldep.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
