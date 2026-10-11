import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProductsStore } from "../store/productsStore";

const esquemaValidacion = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
  categoria: Yup.string().required("La categoría es obligatoria"),
  precio: Yup.number().required("El precio es obligatorio"),
  imagen: Yup.string()
    .url("La imagen debe ser una URL válida")
    .required("La imagen es obligatoria"),
  stock: Yup.number().required("El stock es obligatorio"),
});

function EditProduct({ setView, productId }) {
  const { products, updateProduct } = useProductsStore();
  const product = products.find((product) => product.id === productId);
  return (
    <>
      <h1 className="edit-product-title">Editar producto</h1>

      <section className="edit-product-card">
        <Formik
          initialValues={{
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            categoria: product.categoria,
            precio: product.precio,
            imagen: product.imagen,
            stock: product.stock,
          }}
          validationSchema={esquemaValidacion}
          onSubmit={(values) => {
            updateProduct(productId, values);
            alert("Producto actualizado correctamente");
            setView("administration");
          }}
        >
          <Form className="edit-product-form" id="editProductForm">
            <div className="form-group">
              <label htmlFor="editProductName">Nombre</label>
              <Field
                type="text"
                id="editProductName"
                name="nombre"
                minLength="3"
              />
              <ErrorMessage name="nombre" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductDescription">Descripción</label>
              <Field
                as="textarea"
                rows={3}
                id="editProductDescription"
                name="descripcion"
                minLength="5"
              />
              <ErrorMessage name="descripcion" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductCategory">Categoría</label>
              <Field
                type="text"
                id="editProductCategory"
                name="categoria"
                minLength="3"
              />
              <ErrorMessage name="categoria" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductPrice">Precio</label>
              <Field
                type="number"
                id="editProductPrice"
                name="precio"
                step="0.01"
                min="0.01"
              />
              <ErrorMessage name="precio" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductImage">URL Imagen</label>
              <Field
                type="url"
                id="editProductImage"
                name="imagen"
                placeholder="Ej: https://example.com/image.jpg"
              />
              <ErrorMessage name="imagen" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductStock">Stock</label>
              <Field
                type="number"
                id="editProductStock"
                name="stock"
                min="0"
                step="1"
              />
              <ErrorMessage name="stock" component="p" />
            </div>

            <div className="edit-form-actions">
              <button
                type="button"
                className="btn-edit-cancel"
                onClick={() => setView("administration")}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-edit-submit">
                Guardar cambios
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
}

export default EditProduct;
