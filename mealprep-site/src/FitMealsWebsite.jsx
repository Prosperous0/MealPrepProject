import React, { useState } from 'react';
import { ShoppingCart, Clock, Dumbbell, Leaf, ChevronRight, Star, Check, Menu, X, User, Lock, Mail, Package, Users, TrendingUp } from 'lucide-react';

const FitMealsWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@fitmeals.com', password: 'admin123', name: 'Admin User', role: 'admin' }
  ]);

  // Product data
  const products = [
    {
      id: 1,
      name: "Grilled Chicken & Rice",
      protein: "45g",
      carbs: "52g",
      fat: "12g",
      calories: 480,
      price: 12.99,
      imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
      description: "Lean grilled chicken breast with brown rice and steamed vegetables"
    },
    {
      id: 2,
      name: "Salmon Bowl",
      protein: "38g",
      carbs: "45g",
      fat: "18g",
      calories: 520,
      price: 14.99,
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      description: "Wild-caught salmon with quinoa, avocado, and mixed greens"
    },
    {
      id: 3,
      name: "Beef & Sweet Potato",
      protein: "42g",
      carbs: "48g",
      fat: "15g",
      calories: 510,
      price: 13.99,
      imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop",
      description: "Grass-fed beef with roasted sweet potato and broccoli"
    },
    {
      id: 4,
      name: "Turkey Meatballs",
      protein: "40g",
      carbs: "38g",
      fat: "10g",
      calories: 420,
      price: 11.99,
      imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
      description: "Lean turkey meatballs with whole wheat pasta and marinara"
    },
    {
      id: 5,
      name: "Shrimp Stir Fry",
      protein: "35g",
      carbs: "42g",
      fat: "11g",
      calories: 410,
      price: 13.99,
      imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
      description: "Jumbo shrimp with Asian vegetables and jasmine rice"
    },
    {
      id: 6,
      name: "Chicken Fajita Bowl",
      protein: "43g",
      carbs: "50g",
      fat: "13g",
      calories: 490,
      price: 12.99,
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      description: "Seasoned chicken with peppers, onions, and cilantro lime rice"
    }
  ];

  // Auth functions
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentPage('home');
      return true;
    }
    return false;
  };

  const handleRegister = (email, password, name) => {
    const newUser = {
      id: users.length + 1,
      email,
      password,
      name,
      role: 'customer'
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCart([]);
    setCurrentPage('home');
  };

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + change;
        return newQty > 0 ? {...item, quantity: newQty} : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) return;
    if (!isLoggedIn) {
      alert('Please login to place an order');
      setCurrentPage('login');
      return;
    }
    const order = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleDateString(),
      status: 'Processing'
    };
    setOrders([...orders, order]);
    setCart([]);
    alert('Order placed successfully!');
    setCurrentPage('orders');
  };

  // Navigation
  const Navigation = () => (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-teal-800 text-white px-3 py-2 rounded font-bold text-sm">MP</div>
            <span className="ml-2 text-2xl font-light text-gray-900">Meal Prep.</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-teal-800' : 'text-gray-700'} hover:text-teal-800 font-medium uppercase text-sm`}>Home</button>
            <button onClick={() => setCurrentPage('products')} className={`${currentPage === 'products' ? 'text-teal-800' : 'text-gray-700'} hover:text-teal-800 font-medium uppercase text-sm`}>Shop</button>
            <button onClick={() => setCurrentPage('about')} className={`${currentPage === 'about' ? 'text-teal-800' : 'text-gray-700'} hover:text-teal-800 font-medium uppercase text-sm`}>Our Impact</button>
            {isLoggedIn && currentUser?.role === 'admin' && (
              <button onClick={() => setCurrentPage('admin')} className={`${currentPage === 'admin' ? 'text-teal-800' : 'text-gray-700'} hover:text-teal-800 font-medium uppercase text-sm`}>Admin</button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-600 hidden md:block">Hi, {currentUser?.name}</span>
                <button onClick={handleLogout} className="text-sm text-gray-700 hover:text-teal-800 uppercase font-medium">Logout</button>
              </>
            ) : (
              <button onClick={() => setCurrentPage('login')} className="text-sm text-gray-700 hover:text-teal-800 uppercase font-medium">Login</button>
            )}
            <button onClick={() => setCurrentPage('cart')} className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-teal-800" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-teal-800 uppercase text-sm">Home</button>
            <button onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-teal-800 uppercase text-sm">Shop</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-teal-800 uppercase text-sm">Our Impact</button>
            {isLoggedIn && currentUser?.role === 'admin' && (
              <button onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700 hover:text-teal-800 uppercase text-sm">Admin</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // Login Page
  const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      
      if (isRegister) {
        if (!name || !email || !password) {
          setError('All fields are required');
          return;
        }
        if (users.find(u => u.email === email)) {
          setError('Email already registered');
          return;
        }
        handleRegister(email, password, name);
      } else {
        if (!handleLogin(email, password)) {
          setError('Invalid email or password');
        }
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-teal-800 mb-2">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isRegister ? 'Join FitMeals today' : 'Login to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-800 text-white py-3 rounded-lg font-medium hover:bg-teal-900 transition"
            >
              {isRegister ? 'Create Account' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-teal-800 hover:underline text-sm"
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">Demo credentials:</p>
            <p className="text-xs text-gray-600 text-center">admin@fitmeals.com / admin123</p>
          </div>
        </div>
      </div>
    );
  };

  // Home Page
  const HomePage = () => (
    <div className="bg-white">
      {/* Hero Section - Full Width Image */}
      <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white min-h-screen flex items-center">
        {/* Hero Background Image */}
        <img 
          src="/hero.jpg" 
          alt="Healthy meal prep containers" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        {/* Dark overlay on left side only */}
        <div className="absolute inset-y-0 left-0 w-full md:w-2/5 bg-gradient-to-r from-teal-900/95 via-teal-900/80 to-transparent"></div>
        
        {/* Content positioned on the left */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-xl">
            {/* Star Rating Badge */}
            <div className="inline-flex items-center bg-teal-900 bg-opacity-90 px-6 py-3 rounded-full mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
              ))}
              <span className="ml-2 font-medium">Trusted by 50,000+ Athletes</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-yellow-400">SHREDDED.</span><br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-normal">Without spending hours in the kitchen.</span>
            </h1>
            <p className="text-lg md:text-xl mb-4 text-gray-100 font-semibold">
              Macro-perfect meals delivered daily.
            </p>
            <p className="text-base md:text-lg mb-8 text-gray-200">
              No cooking. No planning. No excuses. Just results.
            </p>
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-yellow-400 text-teal-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition uppercase shadow-lg hover:shadow-xl"
            >
              Start Eating Like A Pro
            </button>
            <p className="text-sm text-gray-300 mt-4">🔥 First order gets 20% off • Free delivery</p>
          </div>
        </div>

        {/* Floating Cart Icon */}
        <button
          onClick={() => setCurrentPage('cart')}
          className="fixed bottom-8 right-8 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-110 transition z-50"
        >
          <ShoppingCart className="w-7 h-7 text-teal-800" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-teal-900 uppercase tracking-tight">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="bg-teal-800 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <div className="text-white">
                  {/* Icon placeholder - replace with actual icon or image */}
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-900 uppercase">Choose Your Meals</h3>
              <p className="text-gray-600 leading-relaxed">Select from our range of macro-calculated meals or build your own, exactly the way you want it.</p>
              <p className="text-gray-600 leading-relaxed mt-2">Whether you're counting protein, carbs, or just want to eat clean, we've got you.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-800 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <div className="text-white">
                  {/* Icon placeholder */}
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-900 uppercase">We Get Cooking</h3>
              <p className="text-gray-600 leading-relaxed">You do you, we'll handle the kitchen.</p>
              <p className="text-gray-600 leading-relaxed mt-2">Every tasty meal is cooked to order with premium Spanish olive oil, real butter or coconut oil.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-800 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <div className="text-white">
                  {/* Icon placeholder */}
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-900 uppercase">Daily Delivery</h3>
              <p className="text-gray-600 leading-relaxed">No prep, no mess. Just real meals, delivered fresh to your doorstep, daily.</p>
              <p className="text-gray-600 leading-relaxed mt-2">Ready when you are... just heat, eat, and get on with your life.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-yellow-400 text-teal-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition uppercase"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - Dark Background */}
      <div className="bg-teal-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 uppercase tracking-tight">
            Balanced. Fresh. Macro-Calculated Meals.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Check className="w-20 h-20 border-4 border-white rounded-lg p-3" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Plan Ahead</h3>
              <p className="text-gray-200 leading-relaxed">Use our 'Build Your Meal Plan' tool to map out your week. Just pick the days, meal count, and your favourites. We'll handle the rest.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Check className="w-20 h-20 border-4 border-white rounded-lg p-3" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Nutritionist-Designed</h3>
              <p className="text-gray-200 leading-relaxed">Every meal is crafted by our in-house nutritionists to hit your macros with accuracy. No guesswork, no compromises.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Check className="w-20 h-20 border-4 border-white rounded-lg p-3" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">Fresh, Never Frozen</h3>
              <p className="text-gray-200 leading-relaxed">We prep daily with premium, whole ingredients. No preservatives, no reheating leftovers. Just clean fuel, delivered to your door.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-yellow-400 text-teal-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition uppercase"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Top Picks Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-900 uppercase tracking-tight">Our Top Picks</h2>
          <p className="text-gray-600 mb-12 max-w-3xl leading-relaxed">
            Explore some of our best-selling macro-calculated meals – handpicked to fit your lifestyle. With 75+ dishes on the menu, plus limited seasonal launches every month, there's always something new to fuel your goals.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.slice(0, 6).map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group">
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Replace above with your actual food images */}
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2 text-teal-900">{product.name}</h3>
                  <p className="text-2xl font-bold text-teal-800">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('products')}
              className="text-teal-800 font-bold text-lg hover:underline uppercase"
            >
              View More Products →
            </button>
          </div>
        </div>
      </div>

      {/* Build Your Meal Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <button className="text-teal-800 font-bold text-lg hover:underline uppercase mb-8">
              View More Products →
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Build Meal Plan */}
            <div className="relative">
              <div className="bg-gray-200 h-96 rounded-lg overflow-hidden mb-6">
                {/* Image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  [Add image: Meal prep containers with variety]
                </div>
              </div>
              <h3 className="text-3xl font-bold text-teal-900 mb-4 uppercase">Build Your Meal Plan</h3>
              <button className="text-teal-800 font-bold uppercase hover:underline">
                Build Now →
              </button>
            </div>

            {/* Build Individual Meal */}
            <div className="relative">
              <div className="bg-gray-200 h-96 rounded-lg overflow-hidden mb-6">
                {/* Image placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  [Add image: Fresh ingredients layout]
                </div>
              </div>
              <h3 className="text-3xl font-bold text-teal-900 mb-4 uppercase">Your Meal, Your Way.</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Craft your nutrition your way: hand-pick every ingredient and macro for a custom dish or create a custom meal plan from our curated macro menu tailored precisely to your needs.
              </p>
              <button className="text-teal-800 font-bold uppercase hover:underline">
                Build Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Products Page
  const ProductsPage = () => (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-teal-900 uppercase">Our Menu</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">All meals freshly prepared with premium ingredients - macro-calculated for your goals</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {/* Replace product.imageUrl with your actual food images */}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-teal-900">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                
                <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 uppercase">Protein</div>
                    <div className="font-bold text-teal-800">{product.protein}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 uppercase">Carbs</div>
                    <div className="font-bold text-teal-800">{product.carbs}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 uppercase">Fat</div>
                    <div className="font-bold text-teal-800">{product.fat}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <div className="text-xs text-gray-500 uppercase">Cal</div>
                    <div className="font-bold text-teal-800">{product.calories}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-teal-900">${product.price}</span>
                  <button 
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} added to cart!`);
                    }}
                    className="bg-teal-800 text-white px-6 py-2 rounded-full hover:bg-teal-900 transition font-medium uppercase text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Cart Page
  const CartPage = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-teal-900 uppercase">Your Cart</h1>
          
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Your cart is empty</p>
              <button 
                onClick={() => setCurrentPage('products')}
                className="bg-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-900 transition uppercase font-medium"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b last:border-b-0 gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-teal-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price} each</p>
                        <p className="text-sm text-gray-500">{item.protein} protein</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="font-bold text-lg w-20 text-right text-teal-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-teal-900">Total:</span>
                  <span className="text-3xl font-bold text-teal-800">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={placeOrder}
                  className="w-full bg-teal-800 text-white py-4 rounded-full font-bold text-lg hover:bg-teal-900 transition uppercase"
                >
                  {isLoggedIn ? 'Place Order' : 'Login to Place Order'}
                </button>
                {!isLoggedIn && (
                  <p className="text-center text-gray-500 mt-4 text-sm">Please login to complete your order</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Orders Page (Customer View)
  const OrdersPage = () => {
    const userOrders = currentUser?.role === 'admin' 
      ? orders 
      : orders.filter(o => o.userId === currentUser?.id);

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-teal-900 uppercase">
            {currentUser?.role === 'admin' ? 'All Orders' : 'My Orders'}
          </h1>
          
          {userOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {userOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="bg-teal-800 text-white p-4 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <span className="font-bold">Order #{order.id}</span>
                      <span className="ml-4 text-gray-200">{order.date}</span>
                      {currentUser?.role === 'admin' && (
                        <span className="ml-4 text-gray-200">Customer: {order.userName}</span>
                      )}
                    </div>
                    <span className="bg-yellow-400 text-teal-900 px-4 py-1 rounded-full text-sm font-bold">
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold mb-4 text-teal-900">Items:</h3>
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center mb-2 pb-2 border-b">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">x {item.quantity}</span>
                        </div>
                        <span className="font-bold text-teal-800">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t-2">
                      <span className="text-xl font-bold text-teal-900">Total:</span>
                      <span className="text-2xl font-bold text-teal-800">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Admin Dashboard
  const AdminPage = () => {
    if (!isLoggedIn || currentUser?.role !== 'admin') {
      return (
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-teal-900">Access Denied</h1>
            <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
            <button onClick={() => setCurrentPage('home')} className="bg-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-900">
              Go Home
            </button>
          </div>
        </div>
      );
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = new Set(orders.map(o => o.userId)).size;

    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-teal-900 uppercase">Admin Dashboard</h1>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm uppercase">Total Revenue</p>
                  <p className="text-3xl font-bold text-teal-800">${totalRevenue.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-teal-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm uppercase">Total Orders</p>
                  <p className="text-3xl font-bold text-teal-800">{totalOrders}</p>
                </div>
                <Package className="w-12 h-12 text-teal-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm uppercase">Total Customers</p>
                  <p className="text-3xl font-bold text-teal-800">{totalCustomers}</p>
                </div>
                <Users className="w-12 h-12 text-teal-600" />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-teal-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">#{order.id}</td>
                      <td className="px-6 py-4 text-sm">{order.userName}</td>
                      <td className="px-6 py-4 text-sm">{order.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-teal-800">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-yellow-400 text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                <div className="text-center py-12 text-gray-500">No orders yet</div>
              )}
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow mt-8">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-teal-900">Registered Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'orders' && <OrdersPage />}
      {currentPage === 'admin' && <AdminPage />}
      {currentPage === 'login' && <LoginPage />}
    </div>
  );
};

export default FitMealsWebsite;