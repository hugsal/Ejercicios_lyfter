import { useProductsStore } from "../store/productsStore";
import ProductForm from "../components/ProductForm";

function EditProduct({ setView, productId }) {
  const products = useProductsStore((state) => state.products);
  const updateProduct = useProductsStore((state) => state.updateProduct);

  const product = products.find((product) => product.id === productId);

  if (!product) {
    setView("administration");
    return;
  }

  return (
    <>
      <h1 className="edit-product-title">Editar producto</h1>

      <section className="edit-product-card">
        <ProductForm
          className="edit-product-form"
          initialValues={{
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            categoria: product.categoria,
            precio: product.precio,
            imagen: product.imagen,
            stock: product.stock,
          }}
          onSubmit={(values) => {
            updateProduct(productId, values);
            alert("Producto actualizado correctamente");
            setView("administration");
          }}
          errorMessage="Por favor completa todos los campos antes de guardar los cambios."
        >
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
        </ProductForm>
      </section>
    </>
  );
}

export default EditProduct;
