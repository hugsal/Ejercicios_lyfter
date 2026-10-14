import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { useApi } from "../hooks/useApi";
import apiServices from "../api/apiServices";

function Products() {
  const { data: products, loading, error } = useApi(apiServices.getProducts);

  if (loading) return <Loading />;

  if (error)
    return <p>Error al cargar los productos. {JSON.stringify(error)}</p>;

  return (
    <>
      <h2 className="catalog-title">Catálogo de productos</h2>
      <section className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

export default Products;
