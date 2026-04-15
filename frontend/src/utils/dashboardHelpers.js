/**
 * Dashboard Helper Functions
 * 
 * These functions enable cross-component communication for real-time dashboard updates
 * without modifying existing code. Use these from any component when data changes.
 */

/**
 * Triggers wishlist update event
 * Call this from product page when user adds/removes from wishlist
 * 
 * @param {Object} wishlistData - Current wishlist array
 * @param {string} action - 'add' or 'remove'
 * @param {Object} product - Product object (for add action)
 * 
 * Example:
 * triggerWishlistUpdate(updatedWishlist, 'add', productObject);
 */
export const triggerWishlistUpdate = (wishlistData, action = 'update', product = null) => {
  const event = new CustomEvent('wishlistUpdated', {
    detail: {
      wishlist: wishlistData,
      action,
      product,
      timestamp: new Date().toISOString()
    }
  });
  window.dispatchEvent(event);
  console.log('[Dashboard] Wishlist update triggered:', action, product?.name);
};

/**
 * Triggers order placed event
 * Call this from checkout when user completes a purchase
 * 
 * @param {Object} orderData - Complete order object with all details
 * 
 * Example:
 * triggerOrderUpdate({
 *   id: 'ORD-2026-001',
 *   date: new Date().toISOString(),
 *   items: cartItems,
 *   total: 129.99,
 *   status: 'pending'
 * });
 */
export const triggerOrderUpdate = (orderData) => {
  const event = new CustomEvent('orderPlaced', {
    detail: {
      order: orderData,
      timestamp: new Date().toISOString()
    }
  });
  window.dispatchEvent(event);
  console.log('[Dashboard] Order placed event triggered:', orderData.id);
};

/**
 * Generates unique order ID in ORD-XXXXXX format
 */
export const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `ORD-${random}`;
};

/**
 * Creates order object from cart items
 * Use this when placing an order to ensure consistent structure
 * 
 * @param {Array} cartItems - Array of cart items
 * @param {Object} shippingAddress - Shipping address object
 * @returns {Object} Complete order object
 */
export const createOrderFromCart = (cartItems, shippingAddress = {}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    })),
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    status: 'pending',
    trackingId: null,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: shippingAddress,
    createdAt: new Date().toISOString()
  };
};

/**
 * Get time-based greeting
 */
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
};

/**
 * Get account tier based on spending
 */
export const getAccountTier = (totalSpent) => {
  if (totalSpent >= 2000) return { tier: 'Platinum', badge: '★★★', color: '#e74c3c' };
  if (totalSpent >= 500) return { tier: 'Gold', badge: '★★', color: '#f39c12' };
  return { tier: 'Silver', badge: '★', color: '#95a5a6' };
};

/**
 * Save orders to localStorage
 */
export const saveOrders = (orders) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log('[Dashboard] Orders saved to localStorage');
  } catch (error) {
    console.error('[Dashboard] Error saving orders:', error);
  }
};

/**
 * Save wishlist to localStorage
 */
export const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('[Dashboard] Wishlist saved to localStorage');
  } catch (error) {
    console.error('[Dashboard] Error saving wishlist:', error);
  }
};

/**
 * Load orders from localStorage
 */
export const loadOrders = () => {
  try {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('[Dashboard] Error loading orders:', error);
    return [];
  }
};

/**
 * Load wishlist from localStorage
 */
export const loadWishlist = () => {
  try {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('[Dashboard] Error loading wishlist:', error);
    return [];
  }
};

/**
 * Sleep utility for async operations
 */
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
  triggerWishlistUpdate,
  triggerOrderUpdate,
  generateOrderId,
  createOrderFromCart,
  getTimeBasedGreeting,
  getAccountTier,
  saveOrders,
  saveWishlist,
  loadOrders,
  loadWishlist,
  sleep,
  getTimeBasedGreeting,
  getAccountTier,
};
