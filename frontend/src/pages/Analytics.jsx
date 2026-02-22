import { useEffect, useState } from "react";
import api from "../services/api";
import { Loader } from "../components/Loader";

export default function Analytics(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/analytics");
      setData(res.data);
    } catch (err) {
      setError("Failed to load analytics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h1>📊 Admin Analytics Dashboard</h1>
        <p>Real-time insights from your ML-powered smart shopping platform</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {data ? (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
          <div className="stat-card" style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderTop: '4px solid #ff9900'
          }}>
            <h3 style={{color: '#666', fontSize: '14px', marginBottom: '10px'}}>Total Users</h3>
            <p style={{fontSize: '28px', fontWeight: 'bold', color: '#131921'}}>
              {data.totalUsers || 0}
            </p>
          </div>

          <div className="stat-card" style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderTop: '4px solid #4CAF50'
          }}>
            <h3 style={{color: '#666', fontSize: '14px', marginBottom: '10px'}}>Total Orders</h3>
            <p style={{fontSize: '28px', fontWeight: 'bold', color: '#131921'}}>
              {data.totalOrders || 0}
            </p>
          </div>

          <div className="stat-card" style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderTop: '4px solid #2196F3'
          }}>
            <h3 style={{color: '#666', fontSize: '14px', marginBottom: '10px'}}>Total Revenue</h3>
            <p style={{fontSize: '28px', fontWeight: 'bold', color: '#131921'}}>
              ₹{(data.totalRevenue || 0).toFixed(2)}
            </p>
          </div>

          <div className="stat-card" style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderTop: '4px solid #FF9800'
          }}>
            <h3 style={{color: '#666', fontSize: '14px', marginBottom: '10px'}}>Total Products</h3>
            <p style={{fontSize: '28px', fontWeight: 'bold', color: '#131921'}}>
              {data.totalProducts || 0}
            </p>
          </div>
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '60px 20px', color: '#666'}}>
          <h2>No analytics data available</h2>
        </div>
      )}
    </div>
  )
}