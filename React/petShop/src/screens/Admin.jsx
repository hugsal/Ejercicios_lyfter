import { useProductsStore } from "../store/productsStore";
import ProductForm from "../components/ProductForm";
import apiServices from "../api/apiServices";

function Admin({ setView, setProductId }) {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);

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
                <th>Categoría</th>
                <th>Stock</th>
                <th>Acciones</th>
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
                            const products = await apiServices.getProducts();
                            setProducts(products);
                          } catch (error) {
                            alert(error.message);
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
        <ProductForm
          className="admin-form"
          initialValues={{
            name: "",
            description: "",
            category: "",
            price: "",
            image: "",
            stock: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await apiServices.createProduct(values);
              alert("Producto agregado correctamente");
              const products = await apiServices.getProducts();
              setProducts(products);
              resetForm();
            } catch (error) {
              alert(error.message);
            }
          }}
          errorMessage="Por favor completa todos los campos antes de agregar el producto."
        >
          <button type="submit" className="btn-admin-submit">
            Agregar producto
          </button>
        </ProductForm>
      </section>
    </>
  );
}

export default Admin;
