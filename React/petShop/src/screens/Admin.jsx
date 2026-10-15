import { Link } from "react-router";
import Loading from "../components/Loading";
import ProductForm from "../components/ProductForm";
import apiServices from "../api/apiServices";
import { useApi } from "../hooks/useApi";

function Admin() {
  const { data: products, loading, refetch } = useApi(apiServices.getProducts);

  if (loading) return <Loading />;

  return (
    <>
      <section className="admin-header">
        <h1 className="admin-title">Administración de productos</h1>
        <p className="admin-subtitle">
          En esta sección puedes gestionar el catálogo de productos de PawStore.
        </p>
      </section>
      <section className="admin-card">
        {loading ? (
          <Loading />
        ) : (
          <>
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
                          <Link
                            to={`/admin/editar/${product.id}`}
                            className="btn-action-edit"
                          >
                            Editar
                          </Link>
                          <button
                            className="btn-action-delete"
                            onClick={async () => {
                              try {
                                await apiServices.deleteProduct(product.id);
                                alert("Producto eliminado correctamente");
                                refetch();
                              } catch (error) {
                                console.error(error.message);
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
          </>
        )}
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
              refetch();
              resetForm();
            } catch (error) {
              console.error(error.message);
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
