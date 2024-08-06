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
import { useEffect, useState } from "react";

export function SelectDepartment({ depvalue, name, handleChange }) {
  const [alldep, setAllDep] = useState([]);
  const [value, setValue] = useState(depvalue);

  useEffect(() => {
    depApi
      .getData()
      .then((res) => {
        setAllDep(res.data);
      })
      .catch((err) => {
        console.log("error fetching the departments", err);
      });
  }, []);

  const handleSelect = (e) => {
    setValue(e);
    handleChange(name, e);
  };

  return (
    <Select defaultValue={value} onValueChange={handleSelect}>
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
