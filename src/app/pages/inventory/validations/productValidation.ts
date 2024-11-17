import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  brand: yup.string().required("La marca es requerida"),
  type: yup.string().required("El tipo es requerido"),
  price: yup
    .number()
    .typeError("El precio debe ser un número")
    .required("El precio es requerido")
    .min(1, "El precio debe ser mayor a 1"),
  stock: yup
    .number()
    .typeError("El stock debe ser un número")
    .required("El stock es requerido")
    .min(0, "El stock no puede ser negativo")
    .max(200, "El stock no puede ser mayor a 200"),
  description: yup.string().required("La descripción es requerida"),
  file: yup.mixed().when("imageUrl", {
    is: (value: string) => !value,
    then: (schema) => schema.required("Suba una imagen"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
