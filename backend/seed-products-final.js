import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});

    // Sample products for each category with descriptions
    const products = [
      // Electronics - 12 products
      {
        name: "Wireless Charging Pad",
        category: "Electronics",
        price: 29.99,
        stock: 45,
        description: "Fast charging pad for wireless devices. Compatible with all QI-enabled phones.",
        image: "https://images.unsplash.com/photo-1591290621749-33d995b913cc?w=300&h=300&fit=crop",
        tags: ["charging", "wireless", "accessories"]
      },
      {
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 99.99,
        stock: 32,
        description: "Premium noise-cancelling headphones with 30-hour battery life and crystal clear sound.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        tags: ["audio", "wireless", "bluetooth"]
      },
      {
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 199.99,
        stock: 28,
        description: "Advanced fitness tracker with heart rate monitor, GPS, and sleep tracking capabilities.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        tags: ["fitness", "smartwatch", "health"]
      },
      {
        name: "USB-C Mobile Charger",
        category: "Electronics",
        price: 24.99,
        stock: 67,
        description: "Ultra-fast USB-C charger. Charges 50% in 30 minutes. Compact and portable.",
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop",
        tags: ["charger", "usb", "fast-charging"]
      },
      {
        name: "4K Webcam",
        category: "Electronics",
        price: 149.99,
        stock: 18,
        description: "Professional 4K USB webcam for streaming and video conferencing with auto-focus.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
        tags: ["camera", "4k", "streaming"]
      },
      {
        name: "Portable Power Bank 20000mAh",
        category: "Electronics",
        price: 34.99,
        stock: 52,
        description: "High-capacity power bank with dual USB ports. Charges most devices 4-5 times.",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop",
        tags: ["power", "battery", "portable"]
      },
      {
        name: "Mechanical Gaming Keyboard RGB",
        category: "Electronics",
        price: 89.99,
        stock: 38,
        description: "RGB mechanical keyboard with customizable switches. Perfect for gaming and typing.",
        image: "https://images.unsplash.com/photo-1587829191301-36ec42e92ea0?w=300&h=300&fit=crop",
        tags: ["gaming", "keyboard", "rgb"]
      },
      {
        name: "Wireless Gaming Mouse",
        category: "Electronics",
        price: 49.99,
        stock: 55,
        description: "Precision gaming mouse with adjustable DPI settings and ergonomic design.",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop",
        tags: ["gaming", "mouse", "wireless"]
      },
      {
        name: "LED Desk Lamp with USB",
        category: "Electronics",
        price: 39.99,
        stock: 41,
        description: "Adjustable LED desk lamp with USB charging port. Touch control and dimming.",
        image: "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=300&h=300&fit=crop",
        tags: ["lamp", "lighting", "desk"]
      },
      {
        name: "Bluetooth Speaker Portable",
        category: "Electronics",
        price: 59.99,
        stock: 36,
        description: "Waterproof Bluetooth speaker with 12-hour battery. Great sound quality and bass.",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=300&h=300&fit=crop",
        tags: ["speaker", "audio", "portable"]
      },
      {
        name: "Wireless Earbuds Pro",
        category: "Electronics",
        price: 129.99,
        stock: 24,
        description: "Premium wireless earbuds with active noise cancellation and 8-hour battery.",
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop",
        tags: ["earbuds", "wireless", "audio"]
      },
      {
        name: "Screen Protector Tempered Glass",
        category: "Electronics",
        price: 12.99,
        stock: 89,
        description: "Durable tempered glass screen protector. Easy installation with no bubbles.",
        image: "https://images.unsplash.com/photo-1598622159686-05fc77b0e0e0?w=300&h=300&fit=crop",
        tags: ["protection", "phone", "glass"]
      },

      // Fashion - 12 products
      {
        name: "Classic Cotton T-Shirt",
        category: "Fashion",
        price: 19.99,
        stock: 76,
        description: "100% organic cotton t-shirt. Comfortable, durable, and available in multiple colors.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        tags: ["clothing", "cotton", "tshirt"]
      },
      {
        name: "Slim Fit Jeans Blue",
        category: "Fashion",
        price: 59.99,
        stock: 42,
        description: "Stylish slim-fit jeans with perfect stretch. Timeless blue denim design.",
        image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop",
        tags: ["jeans", "denim", "pants"]
      },
      {
        name: "Casual Hoodie Sweatshirt",
        category: "Fashion",
        price: 49.99,
        stock: 38,
        description: "Cozy hoodie perfect for casual wear. Soft fleece interior and drawstring hood.",
        image: "https://images.unsplash.com/photo-1556821552-a2d4c49b3e40?w=300&h=300&fit=crop",
        tags: ["hoodie", "sweatshirt", "casual"]
      },
      {
        name: "Striped Polo Shirt",
        category: "Fashion",
        price: 34.99,
        stock: 51,
        description: "Classic striped polo shirt. Versatile for both casual and semi-formal occasions.",
        image: "https://images.unsplash.com/photo-1592815563563-44c60f12dd27?w=300&h=300&fit=crop",
        tags: ["polo", "shirt", "striped"]
      },
      {
        name: "White Sneakers",
        category: "Fashion",
        price: 79.99,
        stock: 33,
        description: "Clean white sneakers that go with everything. Comfortable and stylish.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        tags: ["shoes", "sneakers", "white"]
      },
      {
        name: "Black Leather Jacket",
        category: "Fashion",
        price: 129.99,
        stock: 19,
        description: "Premium black leather jacket. Timeless style that lasts for years.",
        image: "https://images.unsplash.com/photo-1495857671335-5e1a2c0ea126?w=300&h=300&fit=crop",
        tags: ["jacket", "leather", "outerwear"]
      },
      {
        name: "Summer Floral Dress",
        category: "Fashion",
        price: 54.99,
        stock: 26,
        description: "Lightweight floral dress perfect for summer. Breathable and comfortable fit.",
        image: "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=300&h=300&fit=crop",
        tags: ["dress", "summer", "floral"]
      },
      {
        name: "Wool Beanie Hat",
        category: "Fashion",
        price: 22.99,
        stock: 64,
        description: "Warm wool beanie for cold weather. Available in multiple colors.",
        image: "https://images.unsplash.com/photo-1572307474875-fd73dca80c74?w=300&h=300&fit=crop",
        tags: ["hat", "beanie", "winter"]
      },
      {
        name: "Cotton Socks Pack 6 Pairs",
        category: "Fashion",
        price: 15.99,
        stock: 82,
        description: "Pack of 6 comfortable cotton socks. Breathable and durable.",
        image: "https://images.unsplash.com/photo-1527082395-e0fa59ff0a2a?w=300&h=300&fit=crop",
        tags: ["socks", "cotton", "accessories"]
      },
      {
        name: "Formal Business Blazer",
        category: "Fashion",
        price: 99.99,
        stock: 21,
        description: "Professional blazer for business settings. Sharp fit and premium material.",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop",
        tags: ["blazer", "formal", "business"]
      },
      {
        name: "Casual Chinos Pants",
        category: "Fashion",
        price: 49.99,
        stock: 44,
        description: "Comfortable chinos for casual outings. Perfect pair for any occasion.",
        image: "https://images.unsplash.com/photo-1473521169802-658ba7c44d8a?w=300&h=300&fit=crop",
        tags: ["chinos", "pants", "casual"]
      },
      {
        name: "Denim Jacket Classic",
        category: "Fashion",
        price: 69.99,
        stock: 29,
        description: "Classic denim jacket that never goes out of style. Perfect layering piece.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop",
        tags: ["denim", "jacket", "classic"]
      },

      // Home - 12 products
      {
        name: "Programmable Coffee Maker",
        category: "Home",
        price: 89.99,
        stock: 34,
        description: "Programmable coffee maker with built-in grinder. Wake up to fresh coffee.",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb2f2a0e0d?w=300&h=300&fit=crop",
        tags: ["kitchen", "coffee", "appliance"]
      },
      {
        name: "Non-Stick Cookware Set 10PC",
        category: "Home",
        price: 79.99,
        stock: 27,
        description: "Complete 10-piece non-stick cookware set. Perfect for everyday cooking.",
        image: "https://images.unsplash.com/photo-1584622281867-73f07b81825f?w=300&h=300&fit=crop",
        tags: ["cookware", "kitchen", "non-stick"]
      },
      {
        name: "Stainless Steel Dining Table",
        category: "Home",
        price: 299.99,
        stock: 8,
        description: "Modern dining table with stainless steel frame. Seats 6 people comfortably.",
        image: "https://images.unsplash.com/photo-1551532386-c96e4d2e3126?w=300&h=300&fit=crop",
        tags: ["furniture", "dining", "table"]
      },
      {
        name: "LED Ceiling Light",
        category: "Home",
        price: 49.99,
        stock: 46,
        description: "Energy-efficient LED ceiling light with dimming control.",
        image: "https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=300&h=300&fit=crop",
        tags: ["lighting", "ceiling", "led"]
      },
      {
        name: "Memory Foam Pillow Set 2",
        category: "Home",
        price: 54.99,
        stock: 39,
        description: "Set of 2 memory foam pillows for ultimate comfort and support.",
        image: "https://images.unsplash.com/photo-1584622281867-73f07b81825f?w=300&h=300&fit=crop",
        tags: ["bedding", "pillow", "comfort"]
      },
      {
        name: "Microfiber Sofa Couch",
        category: "Home",
        price: 499.99,
        stock: 5,
        description: "Spacious microfiber sofa with comfortable seating for the whole family.",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
        tags: ["furniture", "sofa", "comfort"]
      },
      {
        name: "Area Rug 5x7 Shag",
        category: "Home",
        price: 79.99,
        stock: 22,
        description: "Soft shag rug that adds warmth to any room. Easy to clean.",
        image: "https://images.unsplash.com/photo-1579374104267-e4ace2ba88db?w=300&h=300&fit=crop",
        tags: ["rug", "decor", "flooring"]
      },
      {
        name: "Ceramic Dinner Plates Set 12",
        category: "Home",
        price: 49.99,
        stock: 35,
        description: "Beautiful ceramic dinner plates set. Dishwasher safe and durable.",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=300&fit=crop",
        tags: ["dishes", "dinnerware", "ceramic"]
      },
      {
        name: "Shower Curtain Waterproof",
        category: "Home",
        price: 24.99,
        stock: 58,
        description: "Waterproof shower curtain with modern design. Easy to clean.",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&h=300&fit=crop",
        tags: ["bathroom", "shower", "waterproof"]
      },
      {
        name: "Wall Clock Modern Design",
        category: "Home",
        price: 34.99,
        stock: 48,
        description: "Contemporary wall clock that complements any decor.",
        image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=300&h=300&fit=crop",
        tags: ["clock", "wall", "decoration"]
      },
      {
        name: "Desk Organizer Set",
        category: "Home",
        price: 29.99,
        stock: 53,
        description: "Complete desk organizer set to keep your workspace tidy.",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&h=300&fit=crop",
        tags: ["organizer", "desk", "storage"]
      },
      {
        name: "Hanging Floating Shelves 3",
        category: "Home",
        price: 44.99,
        stock: 31,
        description: "Set of 3 floating shelves. Perfect for displaying books and decor.",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
        tags: ["shelves", "storage", "decoration"]
      },

      // Sports - 12 products
      {
        name: "Yoga Mat Non-Slip",
        category: "Sports",
        price: 29.99,
        stock: 47,
        description: "Non-slip yoga mat with carrying strap. Perfect for any yoga practice.",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop",
        tags: ["yoga", "fitness", "mat"]
      },
      {
        name: "Dumbbells Set 20KG",
        category: "Sports",
        price: 69.99,
        stock: 19,
        description: "Complete dumbbell set with multiple weights. Great for home gym.",
        image: "https://images.unsplash.com/photo-1540126207063-ffdb2db23e16?w=300&h=300&fit=crop",
        tags: ["weights", "dumbbells", "fitness"]
      },
      {
        name: "Resistance Bands Set 5",
        category: "Sports",
        price: 24.99,
        stock: 62,
        description: "Set of 5 resistance bands for strength training and stretching.",
        image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=300&h=300&fit=crop",
        tags: ["resistance", "bands", "training"]
      },
      {
        name: "Adjustable Kettlebell",
        category: "Sports",
        price: 89.99,
        stock: 25,
        description: "Adjustable kettlebell for versatile workout options.",
        image: "https://images.unsplash.com/photo-1552696347-deb1414f0d7d?w=300&h=300&fit=crop",
        tags: ["kettlebell", "weights", "fitness"]
      },
      {
        name: "Sport Running Shoes",
        category: "Sports",
        price: 99.99,
        stock: 37,
        description: "Professional running shoes with cushioning and support.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        tags: ["shoes", "running", "sports"]
      },
      {
        name: "Athletic Compression Shorts",
        category: "Sports",
        price: 34.99,
        stock: 54,
        description: "Compression shorts for enhanced performance and comfort.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        tags: ["shorts", "athletic", "compression"]
      },
      {
        name: "Basketball Official Size",
        category: "Sports",
        price: 44.99,
        stock: 28,
        description: "Official size basketball for games and practice.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop",
        tags: ["basketball", "ball", "sports"]
      },
      {
        name: "Soccer Ball Professional",
        category: "Sports",
        price: 39.99,
        stock: 40,
        description: "Professional soccer ball for training and matches.",
        image: "https://images.unsplash.com/photo-1577536050857-e7e36502e5ae?w=300&h=300&fit=crop",
        tags: ["football", "soccer", "ball"]
      },
      {
        name: "Tennis Racket Beginner",
        category: "Sports",
        price: 79.99,
        stock: 23,
        description: "Beginner-friendly tennis racket with comfortable grip.",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34c8?w=300&h=300&fit=crop",
        tags: ["tennis", "racket", "sports"]
      },
      {
        name: "Gym Duffel Bag",
        category: "Sports",
        price: 49.99,
        stock: 43,
        description: "Spacious gym duffel bag with multiple compartments.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        tags: ["bag", "gym", "sports"]
      },
      {
        name: "Sports Water Bottle Insulated",
        category: "Sports",
        price: 34.99,
        stock: 59,
        description: "Insulated water bottle that keeps drinks cold for hours.",
        image: "https://images.unsplash.com/photo-1602143407151-7e406dc6835d?w=300&h=300&fit=crop",
        tags: ["bottle", "water", "sports"]
      },
      {
        name: "Bicycle Helmet Pro",
        category: "Sports",
        price: 59.99,
        stock: 30,
        description: "Professional bicycle helmet with safety certification.",
        image: "https://images.unsplash.com/photo-1572089560552-2d537800bd15?w=300&h=300&fit=crop",
        tags: ["helmet", "safety", "bike"]
      },

      // Books - 12 products
      {
        name: "The Midnight Library",
        category: "Books",
        price: 16.99,
        stock: 71,
        description: "A captivating contemporary fiction about life's infinite possibilities.",
        image: "https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=300&h=300&fit=crop",
        tags: ["fiction", "bestseller", "contemporary"]
      },
      {
        name: "Atomic Habits",
        category: "Books",
        price: 18.99,
        stock: 65,
        description: "Transform your life through tiny habits. A bestselling productivity guide.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop",
        tags: ["self-help", "productivity", "habits"]
      },
      {
        name: "Dune by Frank Herbert",
        category: "Books",
        price: 19.99,
        stock: 42,
        description: "Epic science fiction masterpiece set on a distant desert planet.",
        image: "https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=300&h=300&fit=crop",
        tags: ["science-fiction", "classic", "adventure"]
      },
      {
        name: "The Psychology of Money",
        category: "Books",
        price: 17.99,
        stock: 58,
        description: "Understanding personal finance through behavioral psychology principles.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop",
        tags: ["finance", "psychology", "money"]
      },
      {
        name: "Sapiens by Yuval Harari",
        category: "Books",
        price: 22.99,
        stock: 36,
        description: "A sweeping history of humankind from the Stone Age to the modern world.",
        image: "https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=300&h=300&fit=crop",
        tags: ["history", "non-fiction", "philosophy"]
      },
      {
        name: "The Great Gatsby",
        category: "Books",
        price: 12.99,
        stock: 79,
        description: "Classic American novel about love, wealth, and the American Dream.",
        image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=300&h=300&fit=crop",
        tags: ["classic", "fiction", "american"]
      },
      {
        name: "Deep Work by Cal Newport",
        category: "Books",
        price: 17.99,
        stock: 50,
        description: "Learn to focus and achieve excellence in professional and personal life.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop",
        tags: ["productivity", "business", "self-help"]
      },
      {
        name: "The 48 Laws of Power",
        category: "Books",
        price: 19.99,
        stock: 44,
        description: "Timeless guide to understanding power dynamics in society.",
        image: "https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=300&h=300&fit=crop",
        tags: ["power", "strategy", "self-help"]
      },
      {
        name: "1984 by George Orwell",
        category: "Books",
        price: 14.99,
        stock: 68,
        description: "Dystopian masterpiece exploring themes of totalitarianism and control.",
        image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=300&h=300&fit=crop",
        tags: ["dystopian", "classic", "fiction"]
      },
      {
        name: "Educated by Tara Westover",
        category: "Books",
        price: 18.99,
        stock: 41,
        description: "Inspiring memoir about overcoming adversity through education.",
        image: "https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=300&h=300&fit=crop",
        tags: ["memoir", "biography", "education"]
      },
      {
        name: "Thinking Fast and Slow",
        category: "Books",
        price: 20.99,
        stock: 49,
        description: "Deep dive into how our minds work and how we make decisions.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop",
        tags: ["psychology", "cognition", "decision-making"]
      },
      {
        name: "The Hobbit",
        category: "Books",
        price: 15.99,
        stock: 61,
        description: "Fantasy adventure following Bilbo Baggins on an unexpected journey.",
        image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=300&h=300&fit=crop",
        tags: ["fantasy", "adventure", "classic"]
      },

      // Beauty - 12 products
      {
        name: "Moisturizing Face Cream",
        category: "Beauty",
        price: 34.99,
        stock: 39,
        description: "Luxurious moisturizing cream for deep hydration and skin nourishment.",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
        tags: ["skincare", "moisturizer", "face"]
      },
      {
        name: "Hydrating Face Mask Sheet",
        category: "Beauty",
        price: 12.99,
        stock: 73,
        description: "Intensive hydrating face mask for radiant and refreshed skin.",
        image: "https://images.unsplash.com/photo-1610199193200-6f73ee2cffbe?w=300&h=300&fit=crop",
        tags: ["mask", "skincare", "hydrating"]
      },
      {
        name: "Professional Hair Dryer",
        category: "Beauty",
        price: 79.99,
        stock: 20,
        description: "Ionic hair dryer with multiple heat settings for salon-quality results.",
        image: "https://images.unsplash.com/photo-1522385647684-38ecb06637cd?w=300&h=300&fit=crop",
        tags: ["hair", "dryer", "professional"]
      },
      {
        name: "Shampoo and Conditioner Duo",
        category: "Beauty",
        price: 24.99,
        stock: 57,
        description: "Gentle shampoo and conditioner set for healthy and shiny hair.",
        image: "https://images.unsplash.com/photo-1584857091711-59ad1334e1cc?w=300&h=300&fit=crop",
        tags: ["hair", "shampoo", "conditioner"]
      },
      {
        name: "Lipstick Set 24 Colors",
        category: "Beauty",
        price: 29.99,
        stock: 32,
        description: "Gorgeous collection of 24 lipstick colors for every occasion.",
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42d8?w=300&h=300&fit=crop",
        tags: ["makeup", "lipstick", "cosmetics"]
      },
      {
        name: "Eyeshadow Palette Pro",
        category: "Beauty",
        price: 44.99,
        stock: 27,
        description: "Professional eyeshadow palette with rich pigmented colors.",
        image: "https://images.unsplash.com/photo-1579638282228-91de87c02a07?w=300&h=300&fit=crop",
        tags: ["makeup", "eyeshadow", "cosmetics"]
      },
      {
        name: "Liquid Foundation Long-Lasting",
        category: "Beauty",
        price: 32.99,
        stock: 45,
        description: "Long-lasting liquid foundation for seamless coverage and finished look.",
        image: "https://images.unsplash.com/photo-1578926314433-8e76dfb20106?w=300&h=300&fit=crop",
        tags: ["makeup", "foundation", "base"]
      },
      {
        name: "Mascara Volume Boost",
        category: "Beauty",
        price: 19.99,
        stock: 56,
        description: "Volumizing mascara for bold and dramatic lashes.",
        image: "https://images.unsplash.com/photo-1575849830951-e323dd27c7e7?w=300&h=300&fit=crop",
        tags: ["makeup", "mascara", "eyes"]
      },
      {
        name: "Rose Water Face Toner",
        category: "Beauty",
        price: 16.99,
        stock: 66,
        description: "Gentle rose water toner to balance and prepare skin.",
        image: "https://images.unsplash.com/photo-1563394530-4e8e1df48b49?w=300&h=300&fit=crop",
        tags: ["skincare", "toner", "face"]
      },
      {
        name: "Sunscreen SPF 50",
        category: "Beauty",
        price: 22.99,
        stock: 52,
        description: "Broad spectrum sunscreen for daily UV protection.",
        image: "https://images.unsplash.com/photo-1552288040-bebadab415c0?w=300&h=300&fit=crop",
        tags: ["sunscreen", "protection", "skincare"]
      },
      {
        name: "Anti-Aging Eye Serum",
        category: "Beauty",
        price: 39.99,
        stock: 34,
        description: "Potent eye serum to reduce wrinkles and fine lines.",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
        tags: ["serum", "anti-aging", "eyes"]
      },
      {
        name: "Facial Cleansing Brush",
        category: "Beauty",
        price: 49.99,
        stock: 29,
        description: "Electric cleansing brush for deep pore cleansing.",
        image: "https://images.unsplash.com/photo-1596412884827-f1187b0ee0dd?w=300&h=300&fit=crop",
        tags: ["cleansing", "brush", "skincare"]
      }
    ];

    // Insert all products
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded successfully!`);

    // Log products by category
    const categories = ["Electronics", "Fashion", "Home", "Sports", "Books", "Beauty"];
    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`${category}: ${count} products`);
    }

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedProducts();
