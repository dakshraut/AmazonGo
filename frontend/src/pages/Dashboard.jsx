import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  loadOrders,
  saveOrders,
  loadWishlist,
  saveWishlist,
  getTimeBasedGreeting,
  getAccountTier
} from '../utils/dashboardHelpers';
import '../pages/Dashboard.css';

/**
 * Professional Real-Time Dashboard
 * 
 * Key Features:
 * - Real-time updates using custom events (orderPlaced, wishlistUpdated)
 * - Cross-tab synchronization using storage events
 * - Automatic stats calculation
 * - Non-intrusive: reads-only from localStorage, doesn't modify other features
 * - Helper functions available for other components (see dashboardHelpers.js)
 */
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State: Orders and Wishlist
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // State: Statistics (recalculates when orders change)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    itemsBought: 0,
    activeOrders: 0,
  });

  // State: Time and UI
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [accountTier, setAccountTier] = useState({ tier: 'Silver', badge: '★' });
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('items');

  /**
   * Initialize sample data on first load
   * Only creates sample data if localStorage is empty
   */
  const initializeSampleData = useCallback(() => {
    if (!localStorage.getItem('orders')) {
      const sampleOrders = [
        {
          id: 'ORD-234892',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { productId: 1, name: 'Premium Headphones', price: 79.99, quantity: 1, image: '🎧' },
            { productId: 2, name: 'USB-C Cable', price: 19.99, quantity: 2, image: '🔌' },
            { productId: 3, name: 'Phone Case', price: 29.99, quantity: 1, image: '📱' }
          ],
          subtotal: 159.96,
          shipping: 0,
          tax: 12.80,
          total: 172.76,
          status: 'delivered',
          trackingId: 'TRACK123456',
          estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          shippingAddress: { city: 'San Francisco', state: 'CA' },
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          timeline: [
            { step: 'Ordered', completed: true },
            { step: 'Confirmed', completed: true },
            { step: 'Shipped', completed: true },
            { step: 'Delivered', completed: true }
          ]
        },
        {
          id: 'ORD-234891',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { productId: 4, name: 'Wireless Mouse', price: 34.99, quantity: 1, image: '🖱️' },
            { productId: 5, name: 'Mechanical Keyboard', price: 89.99, quantity: 1, image: '⌨️' }
          ],
          subtotal: 124.98,
          shipping: 0,
          tax: 10.00,
          total: 134.98,
          status: 'delivered',
          trackingId: 'TRACK789012',
          estimatedDelivery: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          shippingAddress: { city: 'New York', state: 'NY' },
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          timeline: [
            { step: 'Ordered', completed: true },
            { step: 'Confirmed', completed: true },
            { step: 'Shipped', completed: true },
            { step: 'Delivered', completed: true }
          ]
        },
        {
          id: 'ORD-234890',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { productId: 6, name: 'Laptop Stand', price: 49.99, quantity: 1, image: '💻' },
            { productId: 7, name: '4K Monitor', price: 299.99, quantity: 1, image: '🖥️' },
            { productId: 8, name: 'USB Hub', price: 39.99, quantity: 2, image: '🔌' }
          ],
          subtotal: 729.95,
          shipping: 0,
          tax: 58.40,
          total: 788.35,
          status: 'shipped',
          trackingId: 'TRACK345678',
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          shippingAddress: { city: 'Austin', state: 'TX' },
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          timeline: [
            { step: 'Ordered', completed: true },
            { step: 'Confirmed', completed: true },
            { step: 'Shipped', completed: true },
            { step: 'Delivered', completed: false }
          ]
        },
        {
          id: 'ORD-234889',
          date: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
          items: [
            { productId: 9, name: 'Webcam Pro', price: 149.99, quantity: 1, image: '📷' }
          ],
          subtotal: 149.99,
          shipping: 10,
          tax: 12.80,
          total: 172.79,
          status: 'pending',
          trackingId: null,
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          shippingAddress: { city: 'Seattle', state: 'WA' },
          createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
          timeline: [
            { step: 'Ordered', completed: true },
            { step: 'Confirmed', completed: false },
            { step: 'Shipped', completed: false },
            { step: 'Delivered', completed: false }
          ]
        }
      ];
      saveOrders(sampleOrders);
    }

    if (!localStorage.getItem('wishlist')) {
      const sampleWishlist = [
        { id: 'WISH001', productId: 100, name: 'Premium Mechanical Keyboard RGB', price: 199.99, image: '⌨️', dateAdded: new Date().toISOString() },
        { id: 'WISH002', productId: 101, name: '4K Webcam Ultra', price: 299.99, image: '📷', dateAdded: new Date().toISOString() },
        { id: 'WISH003', productId: 102, name: 'Wireless Charging Pad Pro', price: 79.99, image: '🔌', dateAdded: new Date().toISOString() }
      ];
      saveWishlist(sampleWishlist);
    }
  }, []);

  /**
   * Load orders and wishlist from localStorage
   * Called on mount and when storage events are triggered
   */
  const loadDataFromStorage = useCallback(() => {
    const loadedOrders = loadOrders();
    const loadedWishlist = loadWishlist();
    setOrders(loadedOrders);
    setWishlist(loadedWishlist);
  }, []);

  /**
   * Calculate statistics from current orders
   * Runs automatically whenever orders change
   */
  const calculateStats = useCallback(() => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const itemsBought = orders.reduce((sum, order) => {
      const items = Array.isArray(order.items) ? order.items : [];
      return sum + items.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0);
    }, 0);
    const activeOrders = orders.filter(order => 
      order.status === 'pending' || order.status === 'confirmed' || order.status === 'shipped'
    ).length;

    setStats({
      totalOrders,
      totalSpent: parseFloat(totalSpent.toFixed(2)),
      itemsBought,
      activeOrders,
    });

    // Update account tier based on spending
    setAccountTier(getAccountTier(totalSpent));
  }, [orders]);

  /**
   * Handle custom events from other components
   */
  const handleWishlistUpdated = useCallback((event) => {
    console.log('[Dashboard] Wishlist updated event received:', event.detail);
    loadDataFromStorage();
    showToast(`${event.detail.action === 'add' ? 'Added to' : 'Removed from'} wishlist`, 'success');
  }, [loadDataFromStorage]);

  const handleOrderPlaced = useCallback((event) => {
    console.log('[Dashboard] Order placed event received:', event.detail);
    loadDataFromStorage();
    showToast(`New order placed: ${event.detail.order.id}`, 'success');
  }, [loadDataFromStorage]);

  /**
   * Handle cross-tab synchronization
   * Updates dashboard when localStorage changes in another tab
   */
  const handleStorageChange = useCallback((event) => {
    if (event.key === 'orders' || event.key === 'wishlist') {
      console.log('[Dashboard] Storage changed in another tab:', event.key);
      loadDataFromStorage();
    }
  }, [loadDataFromStorage]);

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000);
  };

  /**
   * Mount: Initialize data and setup event listeners
   */
  useEffect(() => {
    // Initialize sample data if empty
    initializeSampleData();

    // Load data from localStorage
    loadDataFromStorage();

    // Setup event listeners for real-time updates
    window.addEventListener('wishlistUpdated', handleWishlistUpdated);
    window.addEventListener('orderPlaced', handleOrderPlaced);
    window.addEventListener('storage', handleStorageChange);

    // Update time every minute
    const timeTimer = setInterval(() => setCurrentDateTime(new Date()), 60000);

    // Cleanup
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdated);
      window.removeEventListener('orderPlaced', handleOrderPlaced);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(timeTimer);
    };
  }, [initializeSampleData, loadDataFromStorage, handleWishlistUpdated, handleOrderPlaced, handleStorageChange]);

  /**
   * Dependency: Recalculate stats whenever orders change
   */
  useEffect(() => {
    calculateStats();
  }, [orders, calculateStats]);

  /**
   * Helper: Get recent orders sorted by date
   */
  const getRecentOrders = useCallback((limit = 5) => {
    return orders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }, [orders]);

  /**
   * Helper: Get most recent order
   */
  const getMostRecentOrder = useCallback(() => {
    if (orders.length === 0) return null;
    return orders.reduce((latest, current) => 
      new Date(current.date) > new Date(latest.date) ? current : latest
    );
  }, [orders]);

  /**
   * Helper: Format functions for display
   */
  const getStatusColor = (status) => {
    const colors = {
      delivered: '#27ae60',
      shipped: '#f39c12',
      confirmed: '#3399cc',
      pending: '#e74c3c',
      cancelled: '#c0392b'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusIcon = (status) => {
    const icons = {
      delivered: '✓',
      shipped: '📦',
      confirmed: '✓',
      pending: '⏳',
      cancelled: '✕'
    };
    return icons[status] || '○';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + 
           ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  /**
   * Helper: Wishlist management
   */
  const removeFromWishlist = useCallback((itemId) => {
    const updated = wishlist.filter(item => item.id !== itemId);
    setWishlist(updated);
    saveWishlist(updated);
    showToast('Removed from wishlist', 'success');
  }, [wishlist]);

  const addWishlistToCart = (item) => {
    showToast(`Added "${item.name}" to cart!`, 'success');
  };

  // Get derived data
  const recentOrders = getRecentOrders();
  const mostRecentOrder = getMostRecentOrder();
  const greeting = getTimeBasedGreeting();

  return (
    <div className="dashboard-container">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        {/* Welcome Header */}
        <div className="welcome-header">
          <div className="welcome-text">
            <div className="welcome-row">
              <h1>{greeting}, {user?.displayName || 'Guest'}! 👋</h1>
              <div className={`tier-badge tier-${accountTier.tier.toLowerCase()}`}>
                {accountTier.badge} {accountTier.tier}
              </div>
            </div>
            <p>{formatDateTime(currentDateTime)}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Spent</h3>
              <p className="stat-value">${stats.totalSpent.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🛍️</div>
            <div className="stat-content">
              <h3>Items Bought</h3>
              <p className="stat-value">{stats.itemsBought}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚚</div>
            <div className="stat-content">
              <h3>Active Orders</h3>
              <p className="stat-value">{stats.activeOrders}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="recent-orders-section">
          <h2>Recent Orders</h2>
          {recentOrders.length > 0 ? (
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{formatDate(order.date)}</td>
                      <td className="items-info">
                        <span className="items-count">{order.items.length}</span>
                      </td>
                      <td className="order-total">${order.total.toFixed(2)}</td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(order.status) }}
                        >
                          {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="view-btn" onClick={() => setSelectedOrder(order)}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>No orders yet</p>
              <p className="empty-subtitle">Start shopping to see your orders here!</p>
              <button className="empty-action-btn">Continue Shopping</button>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-header-top">
                  <div>
                    <h2>Order Details</h2>
                    <p className="modal-order-id">{selectedOrder.id}</p>
                  </div>
                  <button className="modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
                </div>
                
                <div className="modal-quick-info">
                  <div className="quick-info-item">
                    <span className="quick-info-label">Date</span>
                    <span className="quick-info-value">{formatDate(selectedOrder.date)}</span>
                  </div>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Status</span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                    >
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div className="quick-info-item">
                    <span className="quick-info-label">Total Amount</span>
                    <span className="quick-info-total">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="modal-tabs">
                  <button 
                    className={`tab-btn ${activeModalTab === 'items' ? 'active' : ''}`}
                    onClick={() => setActiveModalTab('items')}
                  >
                    📦 Items
                  </button>
                  <button 
                    className={`tab-btn ${activeModalTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveModalTab('info')}
                  >
                    ℹ️ Information
                  </button>
                  <button 
                    className={`tab-btn ${activeModalTab === 'summary' ? 'active' : ''}`}
                    onClick={() => setActiveModalTab('summary')}
                  >
                    💰 Summary
                  </button>
                  <button 
                    className={`tab-btn ${activeModalTab === 'address' ? 'active' : ''}`}
                    onClick={() => setActiveModalTab('address')}
                  >
                    📍 Address
                  </button>
                </div>
              </div>

              <div className="modal-body">
                {/* Items Tab */}
                {activeModalTab === 'items' && (
                  <div className="modal-tab-content">
                    <h3 className="tab-title">Items Ordered ({selectedOrder.items?.length || 0})</h3>
                    <div className="items-list-enhanced">
                      {selectedOrder.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="item-card">
                            <div className="item-left">
                              <div className="item-image-box">
                                {item.image ? (
                                  typeof item.image === 'string' && item.image.startsWith('http') ? (
                                    <img src={item.image} alt={item.name} className="item-img" />
                                  ) : (
                                    <span className="item-emoji">{item.image}</span>
                                  )
                                ) : (
                                  <span className="item-emoji">📦</span>
                                )}
                              </div>
                            </div>
                            <div className="item-middle">
                              <h4 className="item-product-name">{item.name}</h4>
                              <p className="item-sku">Product ID: {item.productId || 'N/A'}</p>
                            </div>
                            <div className="item-right">
                              <div className="item-quantity-box">
                                <span className="qty">Qty:</span>
                                <span className="qty-value">{item.quantity}</span>
                              </div>
                              <div className="item-prices">
                                <div className="price-row">
                                  <span className="price-label">Unit:</span>
                                  <span className="price-value">${item.price.toFixed(2)}</span>
                                </div>
                                <div className="total-row">
                                  <span className="total-label">Total:</span>
                                  <span className="total-value">${(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="no-items">No items in this order</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Order Information Tab */}
                {activeModalTab === 'info' && (
                  <div className="modal-tab-content">
                    <h3 className="tab-title">Order Information</h3>
                    <div className="info-grid">
                      <div className="info-row">
                        <span className="info-label">Order ID</span>
                        <span className="info-value">{selectedOrder.id}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Order Date</span>
                        <span className="info-value">{formatDateTime(selectedOrder.date)}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Status</span>
                        <span className="status-badge" style={{ backgroundColor: getStatusColor(selectedOrder.status) }}>
                          {getStatusIcon(selectedOrder.status)} {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Tracking ID</span>
                        <span className="info-value tracking">{selectedOrder.trackingId || 'Not yet assigned'}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Number of Items</span>
                        <span className="info-value">{selectedOrder.items?.length || 0}</span>
                      </div>
                      {selectedOrder.estimatedDelivery && (
                        <div className="info-row">
                          <span className="info-label">Estimated Delivery</span>
                          <span className="info-value">{formatDate(selectedOrder.estimatedDelivery)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Order Summary Tab */}
                {activeModalTab === 'summary' && (
                  <div className="modal-tab-content">
                    <h3 className="tab-title">Order Summary</h3>
                    <div className="summary-details">
                      <div className="summary-row">
                        <span className="summary-label">Subtotal</span>
                        <span className="summary-value">${selectedOrder.subtotal?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Shipping</span>
                        <span className="summary-value">${(selectedOrder.shipping || 0).toFixed(2)}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Tax</span>
                        <span className="summary-value">${(selectedOrder.tax || 0).toFixed(2)}</span>
                      </div>
                      <div className="summary-divider"></div>
                      <div className="summary-row total">
                        <span className="summary-label">Total Amount</span>
                        <span className="summary-total">${selectedOrder.total?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shipping Address Tab */}
                {activeModalTab === 'address' && (
                  <div className="modal-tab-content">
                    <h3 className="tab-title">Shipping Address</h3>
                    {selectedOrder.shippingAddress ? (
                      <div className="address-card">
                        <div className="address-content">
                          <p className="address-title">📦 Delivery Address</p>
                          <div className="address-details">
                            {selectedOrder.shippingAddress.street && (
                              <p className="address-line">{selectedOrder.shippingAddress.street}</p>
                            )}
                            <p className="address-line">
                              {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}
                            </p>
                            {selectedOrder.shippingAddress.zip && (
                              <p className="address-line">{selectedOrder.shippingAddress.zip}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="no-address">No shipping address available</p>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
                <button className="btn-primary" onClick={() => navigate('/products')}>Continue Shopping</button>
              </div>
            </div>
          </div>
        )}

        {/* Order Status Tracker */}
        {mostRecentOrder && (
          <div className="order-tracker-section">
            <h2>Order Status Tracker - {mostRecentOrder.id}</h2>
            <div className="order-tracker-card">
              <div className="tracker-info">
                <span className="tracker-date">Ordered {formatDate(mostRecentOrder.date)}</span>
                {mostRecentOrder.shippingAddress && (
                  <span className="tracker-location">📍 {mostRecentOrder.shippingAddress.city}, {mostRecentOrder.shippingAddress.state}</span>
                )}
              </div>
              
              <div className="timeline">
                {mostRecentOrder.timeline && Array.isArray(mostRecentOrder.timeline) && mostRecentOrder.timeline.map((step, index) => (
                  <div key={index} className="timeline-item">
                    <div className={`timeline-circle ${step.completed ? 'completed' : ''}`}>
                      {step.completed ? '✓' : '○'}
                    </div>
                    <div className="timeline-content">
                      <p className="timeline-step">{step.step}</p>
                    </div>
                    {index < mostRecentOrder.timeline.length - 1 && (
                      <div className={`timeline-line ${step.completed ? 'completed' : ''}`}></div>
                    )}
                  </div>
                ))}
              </div>

              {mostRecentOrder.status !== 'delivered' && mostRecentOrder.status !== 'cancelled' && (
                <div className="delivery-info">
                  <p>📅 <strong>Estimated Delivery:</strong> {formatDate(mostRecentOrder.estimatedDelivery)}</p>
                </div>
              )}

              {mostRecentOrder.trackingId && (
                <div className="tracking-info">
                  <p>📍 <strong>Tracking ID:</strong> {mostRecentOrder.trackingId}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <div className="dashboard-sidebar">
        {/* Profile Card */}
        <div className="sidebar-card profile-card">
          <h3>My Profile</h3>
          <div className="profile-info">
            <div className="profile-avatar" style={{ backgroundColor: '#3399cc' }}>
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="profile-details">
              <p className="profile-name">{user?.displayName || 'User'}</p>
              <p className="profile-email">{user?.email || 'user@example.com'}</p>
              <p className="member-since">Member since Jan 2025</p>
            </div>
          </div>
          <button className="edit-profile-btn">✏️ Edit Profile</button>
        </div>

        {/* Wishlist Summary */}
        <div className="sidebar-card wishlist-card">
          <h3>❤️ Wishlist ({wishlist.length})</h3>
          {wishlist.length > 0 ? (
            <div className="wishlist-items">
              {wishlist.slice(0, 3).map(item => (
                <div key={item.id} className="wishlist-item">
                  <div className="wishlist-item-info">
                    <p className="wishlist-name">{item.name}</p>
                    <p className="wishlist-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="wishlist-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addWishlistToCart(item)}
                      title="Add to cart"
                    >
                      🛒
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      title="Remove from wishlist"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              {wishlist.length > 3 && <p className="more-items">+{wishlist.length - 3} more items</p>}
            </div>
          ) : (
            <div className="empty-wishlist">
              <div className="empty-icon">💝</div>
              <p>Wishlist is empty</p>
              <button className="empty-action-btn" onClick={() => navigate('/products')}>Browse Products</button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="sidebar-card quick-actions-card">
          <h3>⚡ Quick Actions</h3>
          <div className="quick-actions">
            <button className="quick-action-btn" onClick={() => window.scrollTo(0, 0)}>
              <span className="action-icon">📍</span>
              <span>Track Order</span>
            </button>
            <button className="quick-action-btn" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
              <span className="action-icon">❤️</span>
              <span>My Wishlist</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/account')}>
              <span className="action-icon">⚙️</span>
              <span>Account Settings</span>
            </button>
            <button className="quick-action-btn" onClick={() => alert('Customer support coming soon!')}>
              <span className="action-icon">💬</span>
              <span>Customer Support</span>
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/products')}>
              <span className="action-icon">🛍️</span>
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="sidebar-card payment-card">
          <h3>💳 Payment Methods</h3>
          <div className="payment-items">
            <div className="payment-item">
              <div className="card-icon">💳</div>
              <div className="card-info">
                <p className="card-type">Visa</p>
                <p className="card-number">•••• •••• •••• 4242</p>
              </div>
            </div>
            <div className="payment-item">
              <div className="card-icon">💳</div>
              <div className="card-info">
                <p className="card-type">Mastercard</p>
                <p className="card-number">•••• •••• •••• 5555</p>
              </div>
            </div>
          </div>
          <button className="add-payment-btn" onClick={() => navigate('/account/payments')}>+ Add Payment Method</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;