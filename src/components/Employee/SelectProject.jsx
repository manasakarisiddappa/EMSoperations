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

export function SelectProject({
  projvalue,
  name,
  handleChange,
  handleSelectError,
}) {
  const [allproj, setAllProj] = useState([]);
  const [value, setValue] = useState(projvalue);
  const [error, setError] = useState("");

  const getProjects = () => {
    projApi.getData().then((res) => {
      if (res.success) {
        setAllProj(res.data);
      } else {
        handleSelectError(name, res.message);
        setError(res.message);
        console.log("error fetching the Projects", res.message);
      }
    });
  };

  useEffect(() => {
    if (!allproj.length) getProjects();
  }, [allproj]);

  const handleSelect = (e) => {
    setValue(e);
    handleChange(name, e);
  };

  console.log(allproj);

  return (
    <Select
      defaultValue={value}
      onValueChange={handleSelect}
      disabled={error ? true : false}
    >
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
