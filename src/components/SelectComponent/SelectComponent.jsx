import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";

export function SelectComponent({
  api,
  valueKey,
  labelKey,
  defaultValue,
  name,
  title,
  handleChange,
  handleSelectError,
  placeholder,
}) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  const fetchData = useCallback(() => {
    api.getData().then((res) => {
      const message = res.message;
      if (res.success) {
        setOptions(res.data);
      } else {
        handleSelectError(name, message);
        setError(message);
        console.log(`Error fetching ${name}`, message);
      }
    });
  }, [api, handleSelectError, name]);

  useEffect(() => {
    if (!options.length) fetchData();
  }, [options, fetchData]);

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
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
