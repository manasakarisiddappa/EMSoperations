import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectComponent({
  valueKey,
  labelKey,
  value,
  name,
  title,
  handleChange,
  placeholder,
  options,
  error,
}) {
  const handleSelect = (e) => {
    handleChange(name, e);
  };

  return (
    <Select
      value={value}
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
