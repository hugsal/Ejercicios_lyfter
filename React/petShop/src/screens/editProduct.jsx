import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProductsStore } from "../store/productsStore";
import apiServices from "../api/apiServices";

const esquemaValidacion = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  category: Yup.string().required("La categoría es obligatoria"),
  price: Yup.number().required("El precio es obligatorio"),
  image: Yup.string()
    .url("La imagen debe ser una URL válida")
    .required("La imagen es obligatoria"),
  stock: Yup.number().required("El stock es obligatorio"),
});

function EditProduct({ setView, productId }) {
  const { products } = useProductsStore();
  const product = products.find((product) => product.id === productId);

  return (
    <>
      <h1 className="edit-product-title">Editar producto</h1>

      <section className="edit-product-card">
        <Formik
          initialValues={{
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            image: product.image,
            stock: product.stock,
          }}
          validationSchema={esquemaValidacion}
          onSubmit={async (values) => {
            try {
              await apiServices.updateProduct(productId, values);
              alert("Producto actualizado correctamente");
            } catch (error) {
              alert("Error al actualizar el producto");
            }
            setView("administration");
          }}
        >
          <Form className="edit-product-form" id="editProductForm">
            <div className="form-group">
              <label htmlFor="editProductName">Nombre</label>
              <Field
                type="text"
                id="editProductName"
                name="name"
                minLength="3"
              />
              <ErrorMessage name="name" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductDescription">Descripción</label>
              <Field
                as="textarea"
                rows={3}
                id="editProductDescription"
                name="description"
                minLength="5"
              />
              <ErrorMessage name="description" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductCategory">Categoría</label>
              <Field
                type="text"
                id="editProductCategory"
                name="category"
                minLength="3"
              />
              <ErrorMessage name="category" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductPrice">Precio</label>
              <Field
                type="number"
                id="editProductPrice"
                name="price"
                step="0.01"
                min="0.01"
              />
              <ErrorMessage name="price" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="editProductImage">URL Imagen</label>
              <Field
                type="url"
                id="editProductImage"
                name="image"
                placeholder="Ej: https://example.com/image.jpg"
              />
              <ErrorMessage name="image" component="p" />
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
