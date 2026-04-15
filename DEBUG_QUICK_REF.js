// Quick Reference: Cart Recommendations Debug Checks

// ==========================================
// 1. Check if CartContext is working
// ==========================================
// Paste in browser console:
const cart = localStorage.getItem('cart');
console.log('Cart from localStorage:', cart ? JSON.parse(cart) : 'EMPTY');
// Should show array of products, not EMPTY

// ==========================================
// 2. Check if Recommendation Context exists
// ==========================================
// Add this to debug: frontend/src/components/CartRecommendations.jsx
useEffect(() => {
  console.log('CartRecommendations mounted');
  console.log('cartItems:', cartItems);
  console.log('recommendations context:', { recommendations, loading, error });
}, [cartItems, recommendations, loading]);

// ==========================================
// 3. Test API endpoint directly
// ==========================================
// Paste in browser console:
fetch('http://localhost:5000/api/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cartItems: [
      { 
        _id: 'test', 
        name: 'Test Book', 
        category: 'Books',
        price: 19.99,
        quantity: 1
      }
    ],
    userId: null
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));

// Should see response with recommendations array

// ==========================================
// 4. Verify component hierarchy
// ==========================================
// Check main.jsx has this structure:
/*
<BrowserRouter>
  <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <RecommendationProvider>
          <App />
        </RecommendationProvider>
      </CartProvider>
    </ProductProvider>
  </AuthProvider>
</BrowserRouter>
*/

// ==========================================
// 5. Check imports are correct
// ==========================================
// Correct patterns:
// ✓ import { useCart } from '../hooks/useCart'
// ✓ import { useRecommendation } from '../hooks/useRecommendation'
// ✓ import { useAuth } from '../hooks/useAuth'

// Wrong patterns (AVOID):
// ✗ import { useCart } from '../context/CartContext'
// ✗ import useAuth from '../context/AuthContext'

// ==========================================
// 6. Common Error Messages & Fixes
// ==========================================

// Error: "useCart must be used within CartProvider"
// Fix: Restart dev server → npm run dev

// Error: "Cannot read property 'cartItems' of undefined"
// Fix: Add null check: if (!cartItems) return null;

// Error: "Cannot find module recommendationService"
// Fix: Check file exists at: frontend/src/services/recommendationService.js

// Error: "POST /api/recommendations 404 Not Found"
// Fix: Backend not running or route not mounted
// Check: backend/server.js has: app.use("/api/recommendations", recommendationRoutes);

// Error: "POST /api/recommendations 401 Unauthorized"
// Fix: User not authenticated (but shouldn't happen - route removed protection)
// Workaround: Restart backend, clear cookies, login again

// Error: Blank page on /cart
// Fix: 
// 1. Check console (F12)
// 2. Clear localStorage: localStorage.clear()
// 3. Refresh page
// 4. Try again

// ==========================================
// 7. Local Development Reset
// ==========================================
// If everything breaks, full reset:

// Step 1: Browser
localStorage.clear()
sessionStorage.clear()
// Press Ctrl+Shift+R (hard refresh)

// Step 2: Backend
// Terminal: Ctrl+C (stop server)
// Then: npm start

// Step 3: Frontend  
// Terminal: Ctrl+C (stop server)
// Then: npm run dev

// ==========================================
// 8. Test Good Data
// ==========================================

// Sample test cart (paste in console):
const testCart = [
  {
    _id: "507f1f77bcf86cd799439001",
    name: "The Great Gatsby",
    category: "Books",
    price: 12.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e3ffe02"
  },
  {
    _id: "507f1f77bcf86cd799439002",
    name: "Apple Headphones",
    category: "Electronics",
    price: 199.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  }
];

localStorage.setItem('cart', JSON.stringify(testCart));
location.reload();

// Should show cart items and recommendations!

// ==========================================
// 9. Network Request Format
// ==========================================
// Request to: POST http://localhost:5000/api/recommendations
// Headers: Content-Type: application/json
// Body:
{
  "cartItems": [
    {
      "_id": "product_uuid",
      "name": "Product Name",
      "category": "CategoryName",
      "price": 99.99,
      "quantity": 1,
      "image": "image_url",
      "stock": 50,
      "description": "Product description..."
    }
  ],
  "userId": "user_id_or_null"
}

// Expected Response:
{
  "success": true,
  "data": {
    "userId": "user_id",
    "recommendations": [
      // Array of product objects
    ],
    "source": "category-based",
    "categories": ["CategoryName"],
    "message": "Found X related products"
  }
}

// ==========================================
// 10. Performance Check
// ==========================================
// Time recommendations fetch:
console.time('recommendations-fetch');
// Make the fetch call
console.timeEnd('recommendations-fetch');
// Should complete in < 500ms (optimal: 50-200ms)

// ==========================================
// Notes:
// ==========================================
// - Recommendations based on CATEGORY matching
// - Only shows products IN STOCK (stock > 0)
// - Excludes items already in cart
// - Returns up to 10 products, shuffled
// - Updates whenever cart changes
// - Fails gracefully if error occurs
