import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Loader } from "../components/Loader";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/transactions/my");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to load order history:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="main-content">
      <h1>📜 Order History</h1>

      {orders && orders.length > 0 ? (
        <div style={{display: 'grid', gap: '15px'}}>
          {orders.map((order) => (
            <div key={order._id} className="order-card" style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #ff9900'
            }}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px'}}>
                <div>
                  <p style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>Order ID</p>
                  <p style={{fontWeight: 'bold', fontSize: '14px'}}>{order._id?.slice(0, 12)}...</p>
                </div>
                <div>
                  <p style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>Total Amount</p>
                  <p style={{fontWeight: 'bold', fontSize: '16px', color: '#ff9900'}}>₹{order.totalAmount?.toFixed(2)}</p>
                </div>
                <div>
                  <p style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>Status</p>
                  <span style={{
                    background: order.status === 'completed' ? '#efe' : order.status === 'pending' ? '#ffe' : '#fee',
                    color: order.status === 'completed' ? '#3c3' : order.status === 'pending' ? '#993' : '#c33',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
              <p style={{fontSize: '13px', color: '#999', marginBottom: '0'}}>
                {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '60px 20px', color: '#666'}}>
          <h2>No order history</h2>
          <p>Your orders will appear here</p>
        </div>
      )}
    </div>
  );
};

export default History;