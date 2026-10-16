import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  category: Yup.string().required("La categoría es obligatoria"),
  price: Yup.number().required("El precio es obligatorio"),
  image: Yup.string()
    .url("La imagen debe ser una URL válida")
    .required("La imagen es obligatoria"),
  stock: Yup.number().required("El stock es obligatorio"),
});
