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
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      color: "from-orange-400 to-orange-600"
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      color: "from-gray-700 to-gray-900"
    },
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg",
      color: "from-black to-gray-800"
    },
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
      color: "from-gray-800 to-gray-900"
    }
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
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">
              Shop by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-gray-500 text-center text-lg max-w-2xl mx-auto">
              Explore thousands of products across popular categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name}`}
                className="group relative overflow-hidden rounded-2xl 
                         shadow-md hover:shadow-2xl transition-all duration-300 transform 
                         hover:-translate-y-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="aspect-square relative bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-115 
                             transition-transform duration-500 ease-out"
                  />
                  
                  {/* Overlay with enhanced gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.bg} 
                                  from-black/40 via-black/20 to-transparent
                                  group-hover:from-black/60 group-hover:via-black/30 
                                  transition-all duration-300 
                                  flex flex-col items-center justify-end p-5`}>
                    
                    {/* Icon with enhanced animation */}
                    <span className="text-5xl mb-3 transform group-hover:scale-125 
                                   transition-all duration-300 group-hover:translate-y-0 
                                   drop-shadow-lg">
                      {category.icon}
                    </span>
                    
                    {/* Category Name */}
                    <span className="text-white font-bold text-lg text-center leading-tight
                                   drop-shadow-md">
                      {category.name}
                    </span>
                    
                    {/* CTA Text - Enhanced */}
                    <div className="mt-3 flex items-center gap-1 text-white text-sm font-semibold
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                  transform translate-y-2 group-hover:translate-y-0">
                      <span>Shop Now</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
                
                {/* Shine effect on hover */}
                <div className="absolute top-0 left-0 right-0 bottom-0 
                             pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute -top-full left-0 right-0 h-full 
                               bg-gradient-to-b from-white/40 to-transparent
                               group-hover:translate-y-full transition-transform duration-700 ease-in-out">
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View All Categories Button */}
          <div className="flex justify-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 
                       bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                       font-semibold rounded-lg shadow-lg hover:shadow-xl
                       transform hover:scale-105 transition-all duration-300
                       hover:from-blue-700 hover:to-purple-700"
            >
              <span>🛍️</span>
              <span>View All Categories</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
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

      {/* Brands Section - Premium Edition */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest bg-blue-100 px-4 py-2 rounded-full">
                ✨ Trusted Partners
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Leading <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Brands</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Partner with industry leaders who trust our platform for exceptional service and innovation
            </p>
          </div>
          
          {/* Brands Showcase Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {brands.map((brand, index) => (
              <div 
                key={index}
                className="group relative h-32 md:h-40 rounded-2xl overflow-hidden cursor-pointer
                         transform transition-all duration-500 ease-out
                         hover:scale-105 hover:-translate-y-2"
              >
                {/* Card Background with gradient */}
                <div className="absolute inset-0 bg-white border border-gray-200 rounded-2xl
                            group-hover:border-gray-300 transition-colors duration-300
                            shadow-md group-hover:shadow-2xl"/>
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300
                             bg-gradient-to-br ${brand.color}`}/>
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-4 z-10">
                  <div className="mb-3 h-12 md:h-16 flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-full max-w-[90%] object-contain
                             opacity-70 group-hover:opacity-100 transition-all duration-300
                             grayscale group-hover:grayscale-0 filter
                             drop-shadow-sm group-hover:drop-shadow-md
                             transform group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Brand Name */}
                  <p className="text-xs md:text-sm font-semibold text-gray-700 text-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            transform group-hover:translate-y-0 translate-y-2">
                    {brand.name}
                  </p>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'translateX(-100%) translateY(-100%)',
                    animation: 'shine 3s ease-in-out infinite'
                  }}
                />
                
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                            p-[1px]"
                  style={{
                    mask: 'linear-gradient(90deg, black, transparent 20%, transparent 80%, black)',
                    WebkitMask: 'linear-gradient(90deg, black, transparent 20%, transparent 80%, black)'
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Trust Badges */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 inline-block p-3 bg-blue-100 rounded-2xl">✅</div>
                <h4 className="font-semibold text-gray-900 mb-2">Verified Brands</h4>
                <p className="text-gray-600 text-sm">100% authentic products from verified sources</p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 inline-block p-3 bg-purple-100 rounded-2xl">🌟</div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Assured</h4>
                <p className="text-gray-600 text-sm">Premium quality standards for all products</p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 inline-block p-3 bg-pink-100 rounded-2xl">🚀</div>
                <h4 className="font-semibold text-gray-900 mb-2">Innovation Led</h4>
                <p className="text-gray-600 text-sm">Cutting-edge products and services</p>
              </div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes shine {
            0% {
              transform: translateX(-100%) translateY(-100%);
            }
            100% {
              transform: translateX(100%) translateY(100%);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center justify-center mb-4 px-4 py-2 
                          bg-blue-500/20 border border-blue-400/50 rounded-full backdrop-blur-sm">
              <span className="text-blue-300 text-sm font-semibold tracking-wide">✉️ NEWSLETTER</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Stay in the <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Loop</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Get exclusive offers, early access to new products, free giveaways, and insider tips delivered directly to your inbox.
            </p>
          </div>
          
          {/* Subscription Form */}
          <form className="max-w-lg mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 p-1 bg-white/10 
                          backdrop-blur-md rounded-xl border border-white/20 
                          focus-within:border-blue-400/50 focus-within:bg-white/15 transition-all">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-300 
                         outline-none text-lg font-medium
                         placeholder:text-opacity-70"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                         hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg
                         rounded-lg transition-all duration-300 transform hover:scale-105
                         hover:shadow-lg hover:shadow-blue-500/50 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </form>
          
          {/* Disclaimer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
              <span>I agree to the Privacy Policy</span>
            </label>
            <a href="#" className="hover:text-blue-300 transition-colors underline">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300 transition-colors underline">Terms of Service</a>
          </div>
          
          {/* Social Proof */}
          <div className="mt-12 pt-12 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">Join thousands of happy customers 💌</p>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
              <span className="text-gray-400 ml-2 text-sm">(12,450 subscribers)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;