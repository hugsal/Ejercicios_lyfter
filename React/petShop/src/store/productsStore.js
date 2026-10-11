import { create } from "zustand";

export const useProductsStore = create((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: (product) => {
    const state = get();
    const sortedProducts = [...state.products].sort((a, b) => b.id - a.id);
    const maxId = sortedProducts[0].id;
    set((state) => {
      const productWithId = { ...product, id: maxId + 1 };
      return { products: [...state.products, productWithId] };
    });
  },
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  updateProduct: (productId, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? updatedProduct : product,
      ),
    })),
}));
