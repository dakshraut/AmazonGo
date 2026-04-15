// frontend/src/utils/productImages.js

const categoryImageMap = {
  'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80',
  'Fashion': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80',
  'Home': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&q=80',
  'Sports': 'https://images.unsplash.com/photo-1506241537153-6e6730ce3d0d?w=400&h=400&fit=crop&q=80',
  'Books': 'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=400&h=400&fit=crop&q=80',
  'Beauty': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&q=80',
};

const productImageMap = {
  // ── Electronics ──────────────────────────────────────────────────────────────
  'Wireless Charging Pad':         'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&q=80',
  'Wireless Bluetooth Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80',
  'Smart Fitness Watch':           'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&q=80',
  '4K Webcam':                     'https://images.unsplash.com/photo-1598722671357-1d64bf8b763f?w=400&h=400&fit=crop&q=80',
  'LED Desk Lamp with USB':        'https://images.unsplash.com/photo-1565836662245-69f6646db940?w=400&h=400&fit=crop&q=80',
  'Mechanical Gaming Keyboard RGB':'https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=400&h=400&fit=crop&q=80',
  'Bluetooth Speaker Portable':    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&q=80',
  'Wireless Earbuds Pro':          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Power Bank — now unique charging pad photo
  'USB-C Mobile Charger':          'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop&q=80',
  'Wireless Gaming Mouse':         'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&q=80',
  'Screen Protector Tempered Glass':'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&h=400&fit=crop&q=80',
  'Portable Power Bank 20000mAh':  'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop&q=80',

  // ── Fashion ───────────────────────────────────────────────────────────────────
  'Classic Cotton T-Shirt':        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80',
  'White Sneakers':                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80',
  'Cotton Socks Pack 6 Pairs':     'https://images.unsplash.com/photo-1585426256049-eef3b11eb033?w=400&h=400&fit=crop&q=80',
  'Slim Fit Jeans Blue':           'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop&q=80',
  'Black Leather Jacket':          'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop&q=80',
  'Casual Hoodie Sweatshirt':      'https://images.unsplash.com/photo-1556821552-a2d4c49b3e40?w=400&h=400&fit=crop&q=80',
  'Summer Floral Dress':           'https://images.unsplash.com/photo-1562112928-b1a94852c936?w=400&h=400&fit=crop&q=80',
  'Formal Business Blazer':        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&q=80',
  'Casual Chinos Pants':           'https://images.unsplash.com/photo-1473080169858-d76287b22f0d?w=400&h=400&fit=crop&q=80',
  'Striped Polo Shirt':            'https://images.unsplash.com/photo-1578759688278-ea269a1a4aaf?w=400&h=400&fit=crop&q=80',
  'Wool Beanie Hat':               'https://images.unsplash.com/photo-1572307480616-406b0db8d83b?w=400&h=400&fit=crop&q=80',
  'Denim Jacket Classic':          'https://images.unsplash.com/photo-1551630260-a4e93eaa8e6c?w=400&h=400&fit=crop&q=80',

  // ── Home ──────────────────────────────────────────────────────────────────────
  'Programmable Coffee Maker':     'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=400&fit=crop&q=80',
  'Memory Foam Pillow Set 2':      'https://images.unsplash.com/photo-1564310503-46ab8e7ad650?w=400&h=400&fit=crop&q=80',
  'Shower Curtain Waterproof':     'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop&q=80',
  'Non-Stick Cookware Set 10PC':   'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=400&fit=crop&q=80',
  'Stainless Steel Dining Table':  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Dining Table
  'Microfiber Sofa Couch':         'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=400&fit=crop&q=80',
  'Wall Clock Modern Design':      'https://images.unsplash.com/photo-1519830882231-fbf95b61b16d?w=400&h=400&fit=crop&q=80',
  'Area Rug 5x7 Shag':             'https://images.unsplash.com/photo-1584622281867-8f53645b505b?w=400&h=400&fit=crop&q=80',
  'Desk Organizer Set':            'https://images.unsplash.com/photo-1544716278-ca5e3af35abd?w=400&h=400&fit=crop&q=80',
  'LED Ceiling Light':             'https://images.unsplash.com/photo-1565636192335-14e9a7e87eee?w=400&h=400&fit=crop&q=80',
  'Ceramic Dinner Plates Set 12':  'https://images.unsplash.com/photo-1507909950992-5f6c0c8b48cf?w=400&h=400&fit=crop&q=80',
  'Hanging Floating Shelves 3':    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&q=80',

  // ── Sports ────────────────────────────────────────────────────────────────────
  'Yoga Mat Non-Slip':             'https://images.unsplash.com/photo-1506241537153-6e6730ce3d0d?w=400&h=400&fit=crop&q=80',
  'Sport Running Shoes':           'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80',
  'Tennis Racket Beginner':        'https://images.unsplash.com/photo-1554068865-24cecd4e34c8?w=400&h=400&fit=crop&q=80',
  'Dumbbells Set 20KG':            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80',
  'Resistance Bands Set 5':        'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=400&fit=crop&q=80',
  'Athletic Compression Shorts':   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Soccer Ball
  'Basketball Official Size':      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop&q=80',
  'Gym Duffel Bag':                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&q=80',
  'Sports Water Bottle Insulated': 'https://images.unsplash.com/photo-1602143407151-7e36dd5f5df9?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Dumbbells
  'Adjustable Kettlebell':         'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=400&h=400&fit=crop&q=80',
  'Soccer Ball Professional':      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop&q=80',
  'Bicycle Helmet Pro':            'https://images.unsplash.com/photo-1534056499175-cd96c1cff0eb?w=400&h=400&fit=crop&q=80',

  // ── Books ─────────────────────────────────────────────────────────────────────
  'The Midnight Library':          'https://images.unsplash.com/photo-1495446815901-a7297e3eda06?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Dune, Educated, Psychology of Money
  'Sapiens by Yuval Harari':       'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop&q=80',
  '1984 by George Orwell':         'https://images.unsplash.com/photo-1491841573634-28fb1d3a5631?w=400&h=400&fit=crop&q=80',
  'Dune by Frank Herbert':         'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=400&h=400&fit=crop&q=80',
  'The Great Gatsby':              'https://images.unsplash.com/photo-1512820790803-83ca7dd41d6f?w=400&h=400&fit=crop&q=80',
  'Deep Work by Cal Newport':      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Dune
  'Educated by Tara Westover':     'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop&q=80',
  'Thinking Fast and Slow':        'https://images.unsplash.com/photo-1491841573634-28fb1d3a5631?w=400&h=400&fit=crop&q=80',
  'Atomic Habits':                 'https://images.unsplash.com/photo-1495446815901-a7297e3eda06?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Dune, Educated
  'The Psychology of Money':       'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop&q=80',
  'The 48 Laws of Power':          'https://images.unsplash.com/photo-1491841573634-28fb1d3a5631?w=400&h=400&fit=crop&q=80',
  'The Hobbit':                    'https://images.unsplash.com/photo-1512820790803-83ca7dd41d6f?w=400&h=400&fit=crop&q=80',

  // ── Beauty ────────────────────────────────────────────────────────────────────
  'Moisturizing Face Cream':       'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&q=80',
  'Lipstick Set 24 Colors':        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Face Cream
  'Rose Water Face Toner':         'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Face Cream
  'Hydrating Face Mask Sheet':     'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop&q=80',
  'Eyeshadow Palette Pro':         'https://images.unsplash.com/photo-1517750310727-96d89f2a4d2d?w=400&h=400&fit=crop&q=80',
  'Liquid Foundation Long-Lasting':'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Face Cream
  'Sunscreen SPF 50':              'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Face Cream
  'Anti-Aging Eye Serum':          'https://images.unsplash.com/photo-1570194065650-d99fb4a8b2d1?w=400&h=400&fit=crop&q=80',
  'Professional Hair Dryer':       'https://images.unsplash.com/photo-1578925078519-cfb598a4aaff?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Face Cream
  'Shampoo and Conditioner Duo':   'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop&q=80',
  'Mascara Volume Boost':          'https://images.unsplash.com/photo-1517750310727-96d89f2a4d2d?w=400&h=400&fit=crop&q=80',
  // FIX: was same URL as Face Cream
  'Facial Cleansing Brush':        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&q=80',
};

export const getProductImage = (product) => {
  if (!product) return categoryImageMap['Electronics'];

  // Priority 1: image from database
  if (product.image && product.image !== '') return product.image;

  // Priority 2: exact name match
  if (product.name && productImageMap[product.name]) return productImageMap[product.name];

  // Priority 3: category fallback
  if (product.category && categoryImageMap[product.category]) return categoryImageMap[product.category];

  // Priority 4: ultimate fallback
  return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80';
};

export { categoryImageMap };