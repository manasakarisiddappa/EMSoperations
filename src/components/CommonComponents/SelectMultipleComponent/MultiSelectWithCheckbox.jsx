import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../../ui/checkbox";

export function MultiSelectWithCheckbox({
  options,
  values = [],
  name,
  handleChange,
  onDropdownClose,
  error,
}) {
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
          {options.map((item) => (
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
