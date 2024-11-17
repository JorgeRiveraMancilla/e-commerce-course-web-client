import { UploadFile } from "@mui/icons-material";
import { FormControl, Typography, FormHelperText, Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {}

export const AppDropzone = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const dzStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    height: 200,
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
    textAlign: "center",
  };

  const dzActive = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acceptedFiles: any) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      field.onChange(acceptedFiles[0]);
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ width: "100%" }}>
      <FormControl
        component={Box}
        sx={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
        error={!!fieldState.error}
      >
        <input {...getInputProps()} />

        <UploadFile sx={{ fontSize: "64px", marginBottom: 2 }} />

        <Typography variant="h6">Arrastra y suelta una imagen aquí</Typography>

        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
};
