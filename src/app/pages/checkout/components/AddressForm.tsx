import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { AppTextInput } from "../../../components/AppTextInput";
import { AppCheckbox } from "../../../components/AppCheckbox";

export const AddressForm = () => {
  const { control, formState } = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom marginBottom={2}>
        Dirección de entrega
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput
            control={control}
            name="fullName"
            label="Nombre completo"
          />
        </Grid>

        <Grid item xs={12}>
          <AppTextInput control={control} name="address1" label="Dirección 1" />
        </Grid>

        <Grid item xs={12}>
          <AppTextInput control={control} name="address2" label="Dirección 2" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="city" label="Ciudad" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="state" label="Comuna" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="postalCode"
            label="Código Postal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="country" label="País" />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <AppCheckbox
          disabled={!formState.isDirty}
          name="saveAddress"
          label="Save this as default address"
          control={control}
        />
      </Grid>
    </>
  );
};
