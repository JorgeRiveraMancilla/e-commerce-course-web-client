import { LoadingButton } from "@mui/lab";
import {
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, FieldValues, FormProvider } from "react-hook-form";
import agent from "../../api/agent";
import { useAppDispatch } from "../../store/configureStore";
import { clearBasket } from "../../store/slices/basketSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressForm } from "./components/AddressForm";
import { Review } from "./components/Review";
import { PaymentForm } from "./components/PaymentForm";
import { validationSchema } from "./validations/addressFormValidation";

const steps = [
  "Dirección de entrega",
  "Revisa tu pedido",
  "Detalles de la compra",
];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error("Unknown step");
  }
}

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
  });

  useEffect(() => {
    agent.Account.getAddress().then((response) => {
      if (response) {
        methods.reset({
          ...methods.getValues(),
          ...response,
          saveAddress: false,
        });
      }
    });
  }, [methods]);

  const handleNext = async (data: FieldValues) => {
    const { saveAddress, ...address } = data;

    if (activeStep === steps.length - 1) {
      setLoading(true);

      try {
        const order = await agent.Order.create({
          saveAddress,
          address,
        });
        setOrderNumber(order);
        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Compra
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Gracias por su pedido.
              </Typography>

              <Typography variant="subtitle1">
                Su número de pedido es #{orderNumber}. No le hemos enviado un
                correo electrónico con la confirmación de su pedido y no le
                enviaremos una actualización cuando se haya enviado su pedido,
                ya que esta es una tienda falsa.
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Volver
                  </Button>
                )}

                <LoadingButton
                  loading={loading}
                  disabled={!methods.formState.isValid}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1
                    ? "Realizar pedido"
                    : "Siguiente"}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  );
};
