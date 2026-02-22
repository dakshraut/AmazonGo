export const formatPrice = (price) => {
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN");
};

export const calcTotal = (items) => {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
};