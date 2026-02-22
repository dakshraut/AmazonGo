import api from "./api";

const getCart = async () => (await api.get("/cart")).data;
const add = async (item) => api.post("/cart", item);
const remove = async (id) => api.delete(`/cart/${id}`);

export default { getCart, add, remove };