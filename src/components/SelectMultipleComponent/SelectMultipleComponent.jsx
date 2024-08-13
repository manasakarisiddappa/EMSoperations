import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import { projApi } from "@/services/apiConfig";

export function MultiSelectWithCheckbox({
  name,
  values = [],
  handleChange,
  handleSelectError,
  onDropdownClose,
}) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    projApi.getData().then((res) => {
      const message = res.message;
      if (res.success) {
        setProjects(res.data);
      } else {
        handleSelectError("projects", message);
        setError(message);
        console.log(`Error fetching `, message);
      }
    });
  }, []);

  return (
    <Select disabled={error ? true : false} onOpenChange={onDropdownClose}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder="Select Projects"
          value={values?.length > 0 ? values.join(", ") : ""}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((item) => (
            <div key={item.id} className="flex items-center gap-2 ml-3">
              <Checkbox
                id={item.id}
                checked={values?.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleChange(name, item.id, item.name, checked)
                }
              />

              <label htmlFor={item.id}>{item.name}</label>
            </div>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
