// Add this script to your HTML <head> or paste into browser console
// This will help debug the recommendations issue

window.debugRecommendations = async function() {
  console.clear();
  console.log("🔍 Starting Recommendations Debug...\n");

  // Step 1: Check cart items
  console.log("📦 Step 1: Checking Cart Items");
  const cart = localStorage.getItem('cart');
  const cartItems = cart ? JSON.parse(cart) : [];
  console.log("Cart items in localStorage:", cartItems);
  
  if (cartItems.length === 0) {
    console.warn("❌ Cart is empty! Add items first.");
    return;
  }

  console.log("✓ Cart has", cartItems.length, "items\n");

  // Step 2: Check categories
  console.log("📂 Step 2: Checking Categories");
  const categories = cartItems.map(item => item.category).filter(Boolean);
  console.log("Categories in cart:", categories);
  
  if (categories.length === 0) {
    console.error("❌ Cart items have no categories! Items:", cartItems);
    return;
  }

  console.log("✓ Found categories:", categories, "\n");

  // Step 3: Test API call directly
  console.log("🔗 Step 3: Testing API Call");
  try {
    const response = await fetch('http://localhost:5000/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: cartItems,
        userId: null
      })
    });

    const data = await response.json();
    console.log("API Response Status:", response.status);
    console.log("API Response Data:", data);

    if (data.success) {
      console.log("✓ API call successful");
      console.log("✓ Recommendations count:", data.data?.recommendations?.length || 0);
      
      if (data.data?.recommendations?.length === 0) {
        console.warn("⚠️ No recommendations found!");
        console.log("  This could mean:");
        console.log("  1. No products in database with same categories");
        console.log("  2. All products are out of stock");
        console.log("  3. All products are already in cart");
      } else {
        console.log("✓ Found", data.data?.recommendations?.length, "recommendations");
        console.table(data.data?.recommendations?.map(r => ({
          _id: r._id,
          name: r.name,
          category: r.category,
          price: r.price,
          stock: r.stock
        })));
      }
    } else {
      console.error("❌ API returned success=false");
    }
  } catch (error) {
    console.error("❌ API call failed:", error);
  }

  console.log("\n📝 Next Steps:");
  console.log("1. Check backend console for DB query results");
  console.log("2. Verify products exist in database with matching categories");
  console.log("3. Make sure products have stock > 0");
  console.log("4. Try refreshing page: location.reload()");
};

// Make it easily callable
console.log("🎯 Debug function ready!");
console.log("Run: debugRecommendations()");
console.log("Or check/modify cart: console.log(JSON.parse(localStorage.getItem('cart')))");
