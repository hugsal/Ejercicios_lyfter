import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import ProductForm from "../components/ProductForm";
import apiServices from "../api/apiServices";
import { useParams } from "react-router";
import Loading from "../components/Loading";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useApi(() => apiServices.getProductById(id), [id]);

  if (loading) return <Loading />;

  if (!product) {
    return (
      <section className="empty-state">
        <svg
          className="empty-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            strokeLinecap="round"
            d="M9 10h.01M15 10h.01M16 16c-.8-1.2-2.1-2-4-2s-3.2.8-4 2"
          />
        </svg>
        <h3>No se encontró el producto.</h3>
      </section>
    );
  }

  return (
    <>
      <h1 className="edit-product-title">Editar producto</h1>

      <section className="edit-product-card">
        <ProductForm
          className="edit-product-form"
          initialValues={{
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            image: product.image,
            stock: product.stock,
          }}
          onSubmit={async (values) => {
            try {
              await apiServices.updateProduct(id, values);
              alert("Producto actualizado correctamente");
              navigate("/admin");
            } catch (error) {
              console.error(error.message);
            }
          }}
          errorMessage="Por favor completa todos los campos antes de guardar los cambios."
        >
          <div className="edit-form-actions">
            <Link to="/admin" className="btn-edit-cancel">
              Cancelar
            </Link>
            <button type="submit" className="btn-edit-submit">
              Guardar cambios
            </button>
          </div>
        </ProductForm>
      </section>
    </>
  );
}

export default EditProduct;
