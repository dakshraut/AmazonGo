// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../hooks/useAuth';
import ProductCard from '../components/ProductCard';
import FeaturedProductsSection from '../components/FeaturedProductsSection';

const Home = () => {
  const { products, featuredProducts, loading } = useProducts();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider images
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1600",
      title: "Welcome to AmazonGo",
      subtitle: "Experience the future of shopping",
      cta: "Shop Now",
      color: "from-blue-600 to-purple-600"
    },
    {
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1600",
      title: "AI-Powered Recommendations",
      subtitle: "Personalized just for you",
      cta: "Discover More",
      color: "from-green-600 to-teal-600"
    },
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600",
      title: "Fast & Free Delivery",
      subtitle: "On orders over $50",
      cta: "Learn More",
      color: "from-orange-600 to-red-600"
    }
  ];

  // Auto-rotate hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Electronics", icon: "💻", color: "bg-blue-100", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400", bg: "from-blue-500 to-blue-600" },
    { name: "Fashion", icon: "👕", color: "bg-purple-100", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400", bg: "from-purple-500 to-purple-600" },
    { name: "Home", icon: "🏠", color: "bg-green-100", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400", bg: "from-green-500 to-green-600" },
    { name: "Sports", icon: "⚽", color: "bg-red-100", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", bg: "from-red-500 to-red-600" },
    { name: "Books", icon: "📚", color: "bg-yellow-100", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400", bg: "from-yellow-500 to-yellow-600" },
    { name: "Beauty", icon: "💄", color: "bg-pink-100", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400", bg: "from-pink-500 to-pink-600" }
  ];

  const deals = [
    { discount: "Up to 50% off", category: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400" },
    { discount: "Buy 1 Get 1 Free", category: "Fashion", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400" },
    { discount: "30% off", category: "Home Decor", image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=400" },
    { discount: "25% off", category: "Sports", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "The AI recommendations are incredible! Found exactly what I was looking for in seconds.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "2 days ago"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Best shopping experience ever. The personalized suggestions saved me hours of browsing.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "1 week ago"
    },
    {
      name: "Priya Patel",
      rating: 5,
      text: "Fast delivery and amazing products. The ML-powered recommendations are spot-on!",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      date: "3 days ago"
    }
  ];

  const brands = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/b/bf/Nike_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg"
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    to="/products"
                    className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold 
                             hover:bg-yellow-300 transition-all transform hover:scale-105 
                             shadow-lg inline-flex items-center gap-2"
                  >
                    <span>🛍️</span> {slide.cta}
                  </Link>
                  {!user && (
                    <Link
                      to="/register"
                      className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold 
                               hover:bg-gray-100 transition-all transform hover:scale-105 
                               shadow-lg inline-flex items-center gap-2"
                    >
                      <span>✨</span> Join Prime
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 
                     bg-white bg-opacity-30 hover:bg-opacity-50 text-white 
                     p-3 rounded-full backdrop-blur-sm transition-all"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 
                     bg-white bg-opacity-30 hover:bg-opacity-50 text-white 
                     p-3 rounded-full backdrop-blur-sm transition-all"
        >
          →
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-yellow-400 w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Stats Bar */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🚚</span>
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-gray-600">On orders $50+</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">💰</span>
              <div>
                <p className="font-semibold">Money Back</p>
                <p className="text-sm text-gray-600">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🔒</span>
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-gray-600">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              <div>
                <p className="font-semibold">AI Powered</p>
                <p className="text-sm text-gray-600">Smart recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Deals Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-red-500">🔥</span>
              Today's Deals
            </h2>
            <Link to="/products?deals=true" className="text-blue-600 hover:underline flex items-center gap-1">
              See all deals <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((deal, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all">
                  <img
                    src={deal.image}
                    alt={deal.category}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {deal.discount}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-semibold">{deal.category}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section with Glass Effect */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Shop by <span className="text-blue-600">Category</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore thousands of products across popular categories
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name}`}
                className="group relative overflow-hidden rounded-xl shadow-lg 
                         hover:shadow-2xl transition-all duration-300 transform 
                         hover:-translate-y-2"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 
                             transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.bg} 
                                  bg-opacity-75 group-hover:bg-opacity-90 
                                  transition-all flex flex-col items-center 
                                  justify-end p-4`}>
                    <span className="text-4xl mb-2 transform group-hover:scale-110 
                                   transition-transform">
                      {category.icon}
                    </span>
                    <span className="text-white font-semibold text-lg">
                      {category.name}
                    </span>
                    <span className="text-white text-sm opacity-0 group-hover:opacity-100 
                                   transition-opacity mt-2">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Real Amazon Style */}
      <FeaturedProductsSection products={products} loading={loading} />

      {/* AI Recommendation Banner */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-2">AI-Powered Recommendations</h3>
              <p className="text-purple-100 max-w-lg">
                Our machine learning algorithms analyze your preferences to suggest 
                products you'll love. The more you shop, the smarter it gets!
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/recommendations"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold 
                         hover:bg-gray-100 transition-all transform hover:scale-105 
                         shadow-lg"
              >
                Get Recommendations
              </Link>
              <Link
                to="/analytics"
                className="border-2 border-white text-white px-8 py-3 rounded-lg 
                         font-semibold hover:bg-white hover:text-purple-600 
                         transition-all transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our <span className="text-blue-600">Customers Say</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(testimonial.rating)}
                      {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="text-sm text-gray-400">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand, index) => (
              <img
                key={index}
                src={brand}
                alt={`Brand ${index + 1}`}
                className="h-8 md:h-12 opacity-50 hover:opacity-100 transition-opacity 
                         grayscale hover:grayscale-0 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and exclusive deals.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 
                       focus:ring-blue-500 outline-none"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-lg font-semibold 
                             hover:bg-blue-700 transition-all transform hover:scale-105">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;