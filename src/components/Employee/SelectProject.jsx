import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projApi } from "@/services/apiConfig";
import { useEffect, useState } from "react";

export function SelectProject({ projvalue, name, handleChange }) {
  const [allproj, setAllProj] = useState([]);
  const [value, setValue] = useState(projvalue);

  console.log(projvalue);
  const getProjects = () => {
    projApi
      .getData()
      .then((res) => {
        setAllProj(res.data);
      })
      .catch((err) => {
        console.log("error fetching the departments", err);
      });
  };

  useEffect(() => {
    if (!allproj.length) getProjects();
  }, [allproj.length]);

  const handleSelect = (e) => {
    setValue(e);
    handleChange(name, e);
  };

  return (
    <Select defaultValue={value} onValueChange={handleSelect}>
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Select a Project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {allproj.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
