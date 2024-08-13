import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
}

export const RadioButtonGroup = ({
  options,
  onChange,
  selectedValue,
}: Props) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
