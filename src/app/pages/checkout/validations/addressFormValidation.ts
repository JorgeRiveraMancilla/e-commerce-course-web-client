import * as yup from "yup";

export const validationSchema = [
  yup.object({
    fullName: yup.string().required("El nombre completo es requerido"),
    address1: yup.string().required("La línea 1 de la dirección es requerida"),
    address2: yup.string().required("La línea 2 de la dirección es requerida"),
    city: yup.string().required("La ciudad es requerida"),
    state: yup.string().required("El estado es requerido"),
    postalCode: yup.string().required("El código postal es requerido"),
    country: yup.string().required("El país es requerido"),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required("El nombre en la tarjeta es requerido"),
  }),
];
