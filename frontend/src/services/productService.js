import api from "./api";

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const productService = {
  getAll: getProducts,
  getProducts,
  getById: getProductById,
};

export default productService;