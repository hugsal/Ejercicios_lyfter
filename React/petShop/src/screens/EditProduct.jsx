import { useEffect } from "react";
import { useProductsStore } from "../store/productsStore";
import ProductForm from "../components/ProductForm";
import apiServices from "../api/apiServices";

function EditProduct({ setView, productId }) {
  const products = useProductsStore((state) => state.products);
  const setProducts = useProductsStore((state) => state.setProducts);

  const product = products.find((product) => product.id === productId);

  useEffect(() => {
    if (!product) {
      setView("administration");
    }
  }, [product, setView]);

  if (!product) {
    return null;
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
              await apiServices.updateProduct(productId, values);
              alert("Producto actualizado correctamente");
              const products = await apiServices.getProducts();
              setProducts(products);
              setView("administration");
            } catch (error) {
              alert(error.message);
            }
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
