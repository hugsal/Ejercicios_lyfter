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

function Admin({ setView, setProductId }) {
  const { products, deleteProduct, createProduct } = useProductsStore();
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
                  <td className="cell-name">{product.nombre}</td>
                  <td>${product.precio}</td>
                  <td>{product.categoria}</td>
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
                        onClick={() => {
                          deleteProduct(product.id);
                          alert("Producto eliminado correctamente");
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
            nombre: "",
            descripcion: "",
            categoria: "",
            precio: "",
            imagen: "",
            stock: "",
          }}
          validationSchema={esquemaValidacion}
          onSubmit={(values, { resetForm }) => {
            createProduct(values);
            alert("Producto agregado correctamente");
            resetForm();
          }}
        >
          <Form className="admin-form" id="add-product-form">
            <div className="form-group">
              <label htmlFor="addProductName">Nombre</label>
              <Field
                id="addProductName"
                name="nombre"
                placeholder="Ej: Pelota de Juguete Resistente"
              />
              <ErrorMessage name="nombre" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductDescription">Descripción</label>
              <Field
                as="textarea"
                rows={3}
                id="addProductDescription"
                name="descripcion"
                placeholder="Una descripción detallada del producto..."
              />
              <ErrorMessage name="descripcion" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductCategory">Categoria</label>
              <Field
                type="text"
                id="addProductCategory"
                name="categoria"
                placeholder="Ej: Juguetes"
              />
              <ErrorMessage name="categoria" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductPrice">Precio</label>
              <Field
                type="number"
                id="addProductPrice"
                name="precio"
                placeholder="Ej: 19.99"
                step="0.01"
                min="0.01"
              />
              <ErrorMessage name="precio" component="p" />
            </div>

            <div className="form-group">
              <label htmlFor="addProductImage">URL Imagen</label>
              <Field
                type="url"
                id="addProductImage"
                name="imagen"
                placeholder="Ej: https://example.com/image.jpg"
              />
              <ErrorMessage name="imagen" component="p" />
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
