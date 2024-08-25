import { FormControlLabel, Checkbox } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}

export const AppCheckbox = ({ name, control, label, disabled }: Props) => {
  const { field } = useController({
    control: control,
    defaultValue: false,
    name: name,
  });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          checked={field.value}
          color="secondary"
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};
