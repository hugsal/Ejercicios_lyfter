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

function Admin({ setView, setProductId }) {
  const { products, setProducts } = useProductsStore();

  return (
    <>
      <section className="admin-header">
        <h1 className="admin-title">Administración de productos</h1>
        <p className="admin-subtitle">
          En esta sección puedes gestionar el catálogo de productos de Hug's
          Store.
        </p>
      </section>
      <section className="admin-card">
        <h2 className="admin-card-title">Listado de Productos</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Stock</th>
                <th style={{ textAlign: "right" }}>Acciones</th>
              </tr>
            </thead>
            <tbody id="products-table">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="cell-id">{product.id}</td>
                  <td className="cell-name">{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td className="cell-actions">
                    <div className="actions-group">
                      <button
                        className="btn-action-edit"
                        onClick={() => {
                          setProductId(product.id);
                          setView("editProduct");
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-action-delete"
                        onClick={async () => {
                          try {
                            await apiServices.deleteProduct(product.id);
                            alert("Producto eliminado correctamente");
                            const productsData =
                              await apiServices.getProducts();
                            setProducts(productsData);
                          } catch (error) {
                            alert("Error al eliminar el producto");
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-card">
        <h2 className="admin-card-title">Agregar nuevo producto</h2>
        <Formik
          initialValues={{
            name: "",
            description: "",
            category: "",
            price: "",
            image: "",
            stock: "",
          }}
          validationSchema={esquemaValidacion}
          onSubmit={async (values, { resetForm }) => {
            try {
              await apiServices.createProduct(values);
              alert("Producto agregado correctamente");
              resetForm();
              const productsData = await apiServices.getProducts();
              setProducts(productsData);
            } catch (error) {
              alert("Error al agregar el producto");
            }
          }}
        >
          <Form className="admin-form" id="add-product-form">
            <div className="form-group">
              <label htmlFor="addProductName">Nombre</label>
              <Field
                id="addProductName"
                name="name"
                placeholder="Ej: Pelota de Juguete Resistente"
              />
              <ErrorMessage name="name" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductDescription">Descripción</label>
              <Field
                as="textarea"
                rows={3}
                id="addProductDescription"
                name="description"
                placeholder="Una descripción detallada del producto..."
              />
              <ErrorMessage name="description" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductCategory">Categoria</label>
              <Field
                type="text"
                id="addProductCategory"
                name="category"
                placeholder="Ej: Juguetes"
              />
              <ErrorMessage name="category" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductPrice">Precio</label>
              <Field
                type="number"
                id="addProductPrice"
                name="price"
                placeholder="Ej: 19.99"
                step="0.01"
                min="0.01"
              />
              <ErrorMessage name="price" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductImage">URL Imagen</label>
              <Field
                type="url"
                id="addProductImage"
                name="image"
                placeholder="Ej: https://example.com/image.jpg"
              />
              <ErrorMessage name="image" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductStock">Stock</label>
              <Field
                type="number"
                id="addProductStock"
                name="stock"
                placeholder="Ej: 50"
                min="0"
                step="1"
              />
              <ErrorMessage name="stock" component="p" />
            </div>

            <button type="submit" className="btn-admin-submit">
              Agregar producto
            </button>
          </Form>
        </Formik>
      </section>
    </>
  );
}

export default Admin;
