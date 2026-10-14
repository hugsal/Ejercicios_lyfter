import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  categoria: Yup.string().required("La categoría es obligatoria"),
  precio: Yup.number().required("El precio es obligatorio"),
  imagen: Yup.string()
    .url("La imagen debe ser una URL válida")
    .required("La imagen es obligatoria"),
  stock: Yup.number().required("El stock es obligatorio"),
});
