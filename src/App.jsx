import React, { useState, useRef, useMemo } from 'react';
import {
  Mic, Camera, Search, Trash2, MapPin, ShoppingCart,
  ListOrdered, Plus, Zap, Check, Star, Navigation,
  Maximize2, X, ChevronRight
} from 'lucide-react';
import './index.css';
import { MOCK_PRODUCTS } from './data/products.js';
import { STORE_LAYOUTS } from './data/storeLayouts.js';
import MapEditor from './MapEditor.jsx';

const SECTIONS_ORDER = [
  'Fruta', 'Verdura', 'Pan', 'Despensa', 'Snacks', 'Lácteos', 'Congelados',
  'Carnicería', 'Pescadería', 'Charcutería', 'Bebidas', 'Higiene', 'Limpieza'
];

export default function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [sortCriteria, setSortCriteria] = useState('default');
  const [showWizardPanel, setShowWizardPanel] = useState(false);
  const [animatingItem, setAnimatingItem] = useState(null);
  const [manualSearch, setManualSearch] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [voiceMatches, setVoiceMatches] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStore, setSelectedStore] = useState('SuperA');
  const [isFullScreenMap, setIsFullScreenMap] = useState(false);
  const [showFullRoute, setShowFullRoute] = useState(false);
  // [TEMP] Map Design Editor
  const [showMapEditor, setShowMapEditor] = useState(false);

  const pressTimer = useRef(null);

  // --- FUNCIONES DE FEEDBACK Y UTILIDADES ---
  const triggerVibration = (pattern = [50]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const showFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // --- INTERACCIONES ---
  const addProductToCart = (product) => {
    if (cart.find(item => item.id === product.id)) {
      showFeedback(`"${product.name}" ya está en tu lista.`);
      return;
    }
    setCart(prev => [...prev, { ...product, priority: false, checked: false }]);
    setAnimatingItem(product.id);
    setTimeout(() => setAnimatingItem(null), 600);
    triggerVibration([80]);
    showFeedback(`✅ Añadido: ${product.name}`);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setManualSearch(val);
    if (val.trim().length < 2) {
      setSearchSuggestions([]);
      return;
    }
    const lower = val.toLowerCase();
    const matches = MOCK_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(lower) && !cart.find(c => c.id === p.id)
    ).slice(0, 7);
    setSearchSuggestions(matches);
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!manualSearch.trim()) return;
    if (searchSuggestions.length === 1) {
      addProductToCart(searchSuggestions[0]);
    } else if (searchSuggestions.length > 1) {
      // Pick the closest match (exact name match preferred)
      const exact = searchSuggestions.find(p => p.name.toLowerCase() === manualSearch.toLowerCase());
      addProductToCart(exact || searchSuggestions[0]);
    } else {
      triggerVibration([50, 50]);
      showFeedback(`No se encontró: "${manualSearch}"`);
    }
    setManualSearch('');
    setSearchSuggestions([]);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showFeedback('La API de voz no está soportada. Usa Chrome para mejor experiencia.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    setIsListening(true);
    triggerVibration([50]);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      setIsListening(false);
      triggerVibration([80, 40, 80]);

      // Find all products whose name appears in the spoken text
      const words = text.split(/\s+/);
      const directMatches = MOCK_PRODUCTS.filter(p => {
        const nameLower = p.name.toLowerCase();
        return text.includes(nameLower) && !cart.find(c => c.id === p.id);
      });

      if (directMatches.length === 1) {
        // Single exact match — add directly
        addProductToCart(directMatches[0]);
        return;
      }

      if (directMatches.length > 1) {
        // Multiple direct matches — show popup to disambiguate
        setVoiceMatches(directMatches);
        return;
      }

      // No direct match — try keyword search across all products
      const fuzzy = MOCK_PRODUCTS.filter(p => {
        const nameLower = p.name.toLowerCase();
        return words.some(w => w.length > 3 && nameLower.includes(w)) &&
          !cart.find(c => c.id === p.id);
      }).slice(0, 8);

      if (fuzzy.length === 1) {
        addProductToCart(fuzzy[0]);
      } else if (fuzzy.length > 1) {
        setVoiceMatches(fuzzy);
      } else {
        showFeedback(`No encontré "${text}" en los productos.`);
      }
    };
    recognition.onerror = () => {
      setIsListening(false);
      showFeedback('Error de escucha. Intenta de nuevo.');
    };
    recognition.start();
  };

  const handleCameraMock = () => {
    triggerVibration([50]);
    showFeedback("📸 Escaneando código de barras...");
    setTimeout(() => {
      const candidates = MOCK_PRODUCTS.filter(p => !cart.find(c => c.id === p.id));
      if (candidates.length === 0) {
        showFeedback("¡Tienes todo el supermercado en tu lista!");
        return;
      }
      const randomProduct = candidates[Math.floor(Math.random() * candidates.length)];
      setCart(prev => [...prev, { ...randomProduct, priority: false, checked: false }]);
      setAnimatingItem(randomProduct.id);
      setTimeout(() => setAnimatingItem(null), 500);
      triggerVibration([100]);
      showFeedback(`✨ ${randomProduct.name} detectado y añadido.`);
    }, 1200);
  };

  const handleRemove = (id) => {
    triggerVibration([200]);
    setCart(cart.filter(p => p.id !== id));
  };

  const handleTouchStart = (id) => {
    pressTimer.current = setTimeout(() => {
      triggerVibration([50, 100, 50]);
      setCart(cart.map(p => p.id === id ? { ...p, priority: !p.priority } : p));
      showFeedback("⭐️ Prioridad de artículo actualizada");
    }, 500); // reduced time for better responsiveness
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const toggleCheck = (id) => {
    setCart(cart.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const simulateGeofence = (storeName = 'SuperA') => {
    setSelectedStore(storeName);
    triggerVibration([100, 50, 100, 50, 200]);
    setView('store');
    setSortCriteria('section');
    showFeedback(`📍 ¡Has llegado a ${storeName}! Cambiando a Modo Tienda.`);
  };

  const activeSections = useMemo(() => {
    const sections = new Set();
    cart.forEach(item => {
      if (!item.checked) sections.add(item.section);
    });
    return sections;
  }, [cart]);

  const totals = useMemo(() => {
    return ['SuperA', 'SuperB', 'SuperC'].map(store => {
      const total = cart.reduce((acc, item) => acc + item.prices[store], 0);
      const offersCount = cart.filter(item => item.offer?.store === store).length;
      return { store, total: total.toFixed(2), offersCount };
    }).sort((a, b) => a.total - b.total);
  }, [cart]);

  const estimatedBudget = useMemo(() => {
    if (cart.length === 0) return "0.00";
    // Using the best store total for estimation
    return totals[0]?.total || "0.00";
  }, [totals, cart]);

  const displayedCart = useMemo(() => {
    let sorted = [...cart];
    if (sortCriteria === 'section') {
      sorted.sort((a, b) => SECTIONS_ORDER.indexOf(a.section) - SECTIONS_ORDER.indexOf(b.section));
    }
    sorted.sort((a, b) => (a.priority === b.priority) ? 0 : a.priority ? -1 : 1);
    return sorted;
  }, [cart, sortCriteria]);

  // --- VISTAS ---

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-10 animate-fade-in bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-32 h-32 rounded-3xl premium-gradient flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-105 active:scale-95 animate-pulse-glow">
        <ShoppingCart className="w-16 h-16 text-white drop-shadow-md" strokeWidth={2.5} />
      </div>

      <div className="relative z-10 space-y-2">
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter">
          Tray<span className="premium-text-gradient">ko</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium tracking-wide">Smart Shopping. Smart Savings.</p>
      </div>

      <div className="glass-effect p-6 rounded-[2rem] w-full max-w-sm relative z-10">
        <button
          onClick={() => setView('list')}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all transform active:scale-[0.98] shadow-lg shadow-gray-900/30"
        >
          <ListOrdered className="w-6 h-6" />
          Preparar la Lista
        </button>
      </div>
    </div>
  );

  const closeAddModal = () => {
    setShowAddModal(false);
    setSelectedCategory(null);
    setManualSearch('');
    setSearchSuggestions([]);
  };

  const renderList = () => (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden animate-fade-in w-full max-w-full">

      {/* Header — title + count only */}
      <div className="flex-shrink-0 premium-gradient text-white px-6 pt-10 pb-6 rounded-b-[2.5rem] shadow-[0_10px_30px_rgba(20,184,166,0.3)] z-10 relative">
        <div className="flex justify-between items-center">
          <div className="min-w-0 pr-4">
            <h2 className="text-3xl font-black tracking-tight drop-shadow-sm truncate">Mi Lista</h2>
            <p className="text-emerald-100 text-xs font-bold mt-1 uppercase tracking-wider truncate">
              Presupuesto: {estimatedBudget}€
            </p>
          </div>
          <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm border border-white/30 whitespace-nowrap shrink-0 shadow-inner">
            {cart.length} items
          </span>
        </div>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto p-4 px-5 space-y-3 scrollbar-hide w-full">
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 mt-10 flex flex-col items-center animate-fade-in px-4">
            <div className="bg-gray-200 p-6 rounded-full mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-600">Tu cesta está vacía</p>
            <p className="text-sm mt-2">Pulsa el botón <strong>+</strong> para añadir productos.</p>
          </div>
        ) : (
          displayedCart.map(item => {
            let touchStartX = null;
            let currentTranslateX = 0;
            const onTouchStartSwipe = (e) => { touchStartX = e.touches[0].clientX; handleTouchStart(item.id); };
            const onTouchMoveSwipe = (e) => {
              if (touchStartX === null) return;
              const diffX = e.touches[0].clientX - touchStartX;
              if (diffX < 0) {
                currentTranslateX = Math.max(diffX, -100);
                e.currentTarget.style.transform = `translateX(${currentTranslateX}px)`;
                if (currentTranslateX < -60) e.currentTarget.style.opacity = '0.5';
              }
            };
            const onTouchEndSwipe = (e) => {
              handleTouchEnd();
              touchStartX = null;
              if (currentTranslateX <= -80) {
                triggerVibration([100, 100]);
                handleRemove(item.id);
                showFeedback("🌪️ ¡Deslizado! Producto borrado.");
              } else {
                e.currentTarget.style.transform = 'translateX(0px)';
                e.currentTarget.style.opacity = '1';
              }
              currentTranslateX = 0;
            };
            return (
              <div
                key={item.id}
                className={`relative flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border transition-all duration-300 transform ${animatingItem === item.id ? 'scale-[1.03] shadow-lg ring-2 ring-emerald-400 border-none' : ''
                  } ${item.priority ? 'border-yellow-300 bg-yellow-50/50' : 'border-gray-200 hover:shadow-md'}`}
                style={{ background: item.priority ? 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)' : 'white' }}
                onMouseDown={() => handleTouchStart(item.id)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                onTouchStart={onTouchStartSwipe}
                onTouchMove={onTouchMoveSwipe}
                onTouchEnd={onTouchEndSwipe}
              >
                <div className="absolute inset-y-0 right-0 -z-10 bg-red-500 rounded-2xl flex justify-end items-center pr-5 w-full opacity-0 pointer-events-none" style={{ opacity: currentTranslateX < -20 ? 1 : 0 }}>
                  <Trash2 className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div className="flex items-center gap-4 min-w-0 bg-white" style={{ background: 'inherit' }}>
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 shadow-sm ${item.priority ? 'bg-yellow-400 shadow-yellow-400/50' : 'bg-gray-200'}`}></div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-[1.05rem] truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-0.5 truncate">{item.section}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex-shrink-0 text-red-400 p-2 hover:bg-red-50 rounded-xl transition-colors active:scale-90 bg-white"
                  style={{ background: 'inherit' }}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Sticky Bottom — compare + FAB */}
      <div className="flex-shrink-0 px-5 pb-5 pt-4 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent z-20 w-full flex items-center gap-3">
        {cart.length > 0 && (
          <button
            onClick={() => setView('compare')}
            className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-black transition-all transform active:scale-95"
          >
            <Search className="w-5 h-5 shrink-0" />
            <span className="truncate">Comparar Precios</span>
          </button>
        )}
        {/* FAB: Añadir productos */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 shrink-0 premium-gradient rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-transform"
        >
          <Plus className="w-7 h-7 text-white" strokeWidth={3} />
        </button>
      </div>

      {/* 🛒 Add Products Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-[200] flex flex-col bg-gray-50 animate-fade-in">
          {/* Modal Header */}
          <div className="flex-shrink-0 premium-gradient text-white px-6 pt-10 pb-5 rounded-b-[2rem] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black text-emerald-100 uppercase tracking-[0.2em]">Añadir productos</p>
                <h3 className="text-2xl font-black text-white">Buscar</h3>
              </div>
              <button onClick={closeAddModal} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center border border-white/20 active:scale-90 transition-transform">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Search + Autocomplete */}
            <form onSubmit={handleManualSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar producto..."
                autoComplete="off"
                autoFocus
                className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-2xl py-3 pl-10 pr-16 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md transition-all shadow-inner"
                value={manualSearch}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-white/70" />
              <div className="absolute right-2 top-1.5 flex gap-1">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/20 hover:bg-white/30'
                    }`}
                >
                  <Mic className={`w-4 h-4 text-white ${isListening ? 'animate-bounce' : ''}`} />
                </button>
                <button type="button" onClick={handleCameraMock} className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Autocomplete suggestions */}
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                  {searchSuggestions.map((product, i) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => { addProductToCart(product); setManualSearch(''); setSearchSuggestions([]); }}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-emerald-50 active:bg-emerald-100 transition-colors text-left ${i < searchSuggestions.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{product.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{product.section}</p>
                      </div>
                      <span className="text-emerald-600 font-black text-sm shrink-0 ml-3">{product.prices.SuperA.toFixed(2)}€</span>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Body: Category browser or product list */}
          <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
            {selectedCategory === null ? (
              // Category grid
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Explorar por categoría</p>
                <div className="grid grid-cols-2 gap-3">
                  {SECTIONS_ORDER.map(cat => {
                    const count = MOCK_PRODUCTS.filter(p => p.section === cat && !cart.find(c => c.id === p.id)).length;
                    const emoji = {
                      Fruta: '🍎', Verdura: '🥦', Pan: '🍞', Despensa: '🫙', Snacks: '🍿',
                      Lácteos: '🥛', Congelados: '❄️', Carnicería: '🥩', Pescadería: '🐟', Charctuería: '🧆',
                      Charcutería: '🧆', Bebidas: '🥤', Higiene: '🧼', Limpieza: '🧹'
                    }[cat] || '🛒';
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-emerald-50 hover:border-emerald-200 active:scale-[0.97] transition-all"
                      >
                        <div className="text-left">
                          <span className="text-2xl">{emoji}</span>
                          <p className="font-black text-gray-800 text-sm mt-1">{cat}</p>
                          <p className="text-[10px] text-gray-400 font-semibold">{count} disponibles</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Products in selected category
              <div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-4 active:opacity-70"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" /> Volver
                </button>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{selectedCategory}</p>
                <div className="space-y-2">
                  {MOCK_PRODUCTS.filter(p => p.section === selectedCategory).map(product => {
                    const inCart = !!cart.find(c => c.id === product.id);
                    return (
                      <button
                        key={product.id}
                        onClick={() => !inCart && addProductToCart(product)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${inCart
                          ? 'bg-emerald-50 border-emerald-200 opacity-60'
                          : 'bg-white border-gray-100 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 active:scale-[0.98]'
                          }`}
                      >
                        <div className="text-left min-w-0">
                          <p className={`font-bold text-sm truncate ${inCart ? 'text-emerald-700 line-through' : 'text-gray-900'}`}>{product.name}</p>
                          {product.offer && <p className="text-[10px] text-yellow-600 font-bold">{product.offer.desc}</p>}
                        </div>
                        <div className="text-right shrink-0 pl-3 flex items-center gap-2">
                          <span className="font-black text-sm text-gray-800">{product.prices.SuperA.toFixed(2)}€</span>
                          {inCart
                            ? <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                            : <Plus className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                          }
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🎤 Voice Disambiguation Popup */}
      {voiceMatches && (
        <div className="absolute inset-0 z-[200] flex flex-col bg-gray-950/95 backdrop-blur-md animate-fade-in">
          <div className="flex items-center justify-between px-6 pt-10 pb-4 border-b border-white/10">
            <div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">🎤 ¿Cuál de estos?</p>
              <h3 className="text-xl font-black text-white mt-1">Selecciona el producto</h3>
            </div>
            <button onClick={() => setVoiceMatches(null)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 scrollbar-hide">
            {voiceMatches.map(product => (
              <button
                key={product.id}
                onClick={() => { addProductToCart(product); setVoiceMatches(null); }}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between active:scale-[0.97] transition-all hover:bg-white/10 hover:border-emerald-500/50"
              >
                <div className="text-left">
                  <p className="font-black text-white text-base">{product.name}</p>
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mt-0.5">{product.section}</p>
                </div>
                <div className="text-right shrink-0 pl-4">
                  <p className="text-lg font-black text-white">{product.prices.SuperA.toFixed(2)}€</p>
                  {product.offer && <p className="text-[9px] text-yellow-400 font-bold">{product.offer.desc}</p>}
                </div>
              </button>
            ))}
          </div>
          <div className="px-5 pb-6 pt-3 border-t border-white/10">
            <button onClick={() => setVoiceMatches(null)} className="w-full py-3.5 rounded-2xl bg-white/10 text-white font-bold text-sm border border-white/10 active:scale-95 transition-transform">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCompare = () => (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden animate-fade-in w-full max-w-full relative">
      <div className="flex-shrink-0 bg-gray-900 text-white p-6 pt-10 pb-12 rounded-b-[2.5rem] shadow-xl relative z-10">
        <h2 className="text-3xl font-black tracking-tight truncate">Ofertas Top</h2>
        <p className="text-gray-400 font-medium mt-1 truncate">Comparando {cart.length} productos guardados</p>
      </div>

      <div className="flex-1 px-5 -mt-6 pt-10 overflow-y-auto space-y-4 pb-6 scrollbar-hide z-0">
        {totals.map((storeData, index) => {
          const isBest = index === 0;
          return (
            <div
              key={storeData.store}
              className={`bg-white p-6 rounded-[2rem] shadow-md border-2 transition-all transform active:scale-[0.98] ${isBest ? 'border-emerald-400 ring-4 ring-emerald-50 relative' : 'border-transparent'
                }`}
            >
              {isBest && (
                <div className="absolute -top-4 right-6 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-emerald-400">
                  Mejor Opción
                </div>
              )}
              <div className="flex justify-between items-end mb-4">
                <div className="min-w-0 pr-4">
                  <h3 className={`text-2xl font-black truncate ${isBest ? 'text-gray-900' : 'text-gray-700'}`}>{storeData.store}</h3>
                </div>
                <p className={`text-3xl sm:text-4xl font-black tracking-tighter shrink-0 ${isBest ? 'premium-text-gradient' : 'text-gray-800'}`}>
                  {storeData.total}€
                </p>
              </div>

              <div className="h-px bg-gray-100 w-full my-4"></div>

              {storeData.offersCount > 0 ? (
                <p className="text-sm text-yellow-600 font-bold flex items-center gap-2">
                  <Star className="w-5 h-5 shrink-0 fill-current text-yellow-500" />
                  <span className="truncate">{storeData.offersCount} oferta{storeData.offersCount > 1 ? 's' : ''} encontrada</span>
                </p>
              ) : (
                <p className="text-sm text-gray-400 font-medium flex items-center gap-2 truncate">
                  Precio estándar aplicado
                </p>
              )}

              <button
                onClick={() => simulateGeofence(storeData.store)}
                className={`mt-6 w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95 ${isBest
                  ? 'premium-gradient text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
              >
                <Navigation className={`w-5 h-5 shrink-0 ${isBest ? 'text-white' : 'text-gray-500'}`} />
                <span className="truncate">Mostrar Mapa</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStoreMode = () => {
    // --- PATHFINDING Y ROUTING (Dijkstra/NavMesh) ---
    const layout = STORE_LAYOUTS[selectedStore];
    const startPoint = { ...layout.entrance, id: 'start' };
    const endPoint = { ...layout.checkout, id: 'end' };

    // ── GRAPH PATHFINDING ALGORITHMS (NavMesh) ──
    const getNearestNodeId = (p) => {
      let bestId = null;
      let minDist = Infinity;
      for (const [id, node] of Object.entries(layout.navNodes)) {
        // Distancia euclidiana al cuadrado (suficiente para comparar)
        const dist = Math.pow(p.x - node.x, 2) + Math.pow(p.y - node.y, 2);
        if (dist < minDist) {
          minDist = dist;
          bestId = id;
        }
      }
      return bestId;
    };

    const getDijkstraPath = (startId, endId) => {
      if (startId === endId) return { dist: 0, path: [startId] };

      const nodes = layout.navNodes;
      const edges = layout.navEdges;

      const dists = {};
      const prev = {};
      const unvisited = new Set(Object.keys(nodes));

      Object.keys(nodes).forEach(n => dists[n] = Infinity);
      dists[startId] = 0;

      while (unvisited.size > 0) {
        // Encontrar nodo no visitado con menor distancia
        let currNode = null;
        let minDist = Infinity;
        for (const n of unvisited) {
          if (dists[n] < minDist) {
            minDist = dists[n];
            currNode = n;
          }
        }
        if (currNode === null) break; // unreachable nodes left
        if (currNode === endId) break; // Found target

        unvisited.delete(currNode);

        // Relax neighbors
        if (edges[currNode]) {
          edges[currNode].forEach(neighbor => {
            if (unvisited.has(neighbor)) {
              const dx = nodes[currNode].x - nodes[neighbor].x;
              const dy = nodes[currNode].y - nodes[neighbor].y;
              const weight = Math.sqrt(dx * dx + dy * dy);
              const alt = dists[currNode] + weight;
              if (alt < dists[neighbor]) {
                dists[neighbor] = alt;
                prev[neighbor] = currNode;
              }
            }
          });
        }
      }

      // Reconstruct path
      const path = [];
      let u = endId;
      if (prev[u] !== undefined || u === startId) {
        while (u !== undefined) {
          path.unshift(u);
          u = prev[u];
        }
      }

      return { dist: dists[endId], path };
    };

    const getPathDistance = (pA, pB) => {
      const nodeA = getNearestNodeId(pA);
      const nodeB = getNearestNodeId(pB);

      // Distancia del producto al nodo A (línea recta)
      const distAToNode = Math.sqrt(Math.pow(pA.x - layout.navNodes[nodeA].x, 2) + Math.pow(pA.y - layout.navNodes[nodeA].y, 2));
      // Distancia del nodo B al producto B (línea recta)
      const distNodeToB = Math.sqrt(Math.pow(pB.x - layout.navNodes[nodeB].x, 2) + Math.pow(pB.y - layout.navNodes[nodeB].y, 2));

      const { dist } = getDijkstraPath(nodeA, nodeB);
      return distAToNode + dist + distNodeToB;
    };

    const generatePathSegments = (pA, pB) => {
      const nodeA = getNearestNodeId(pA);
      const nodeB = getNearestNodeId(pB);

      const { path } = getDijkstraPath(nodeA, nodeB);

      const segments = [pA];
      path.forEach(nodeId => {
        segments.push(layout.navNodes[nodeId]);
      });
      segments.push(pB);

      return segments;
    };

    // 1. Enrich cart items with per-store coords from product data
    const itemsWithCoords = cart.map(cartItem => {
      const product = MOCK_PRODUCTS.find(p => p.id === cartItem.id);
      const storeCoords = product?.coords?.[selectedStore];
      return storeCoords ? { ...cartItem, x: storeCoords.x, y: storeCoords.y } : null;
    }).filter(Boolean);

    // 2. Ruta Óptima TSP (Greedy Nearest Neighbor)
    let unvisited = [...itemsWithCoords];
    const optimalOrder = [];
    let current = startPoint;

    while (unvisited.length > 0) {
      let nearestIdx = -1;
      let minDist = Infinity;
      unvisited.forEach((item, idx) => {
        const dist = getPathDistance(current, item);
        if (dist < minDist) { minDist = dist; nearestIdx = idx; }
      });
      current = unvisited[nearestIdx];
      optimalOrder.push(current);
      unvisited.splice(nearestIdx, 1);
    }

    // 3. Generar segmentos SVG
    const completedItems = optimalOrder.filter(i => i.checked);
    const pendingItems = optimalOrder.filter(i => !i.checked);

    const originPoint = completedItems.length > 0 ? completedItems[completedItems.length - 1] : startPoint;
    const remainingRouteItems = [originPoint, ...pendingItems, endPoint];

    // ── Next-stop segment (default view: only origin → next item) ──
    const nextStopItems = pendingItems.length > 0
      ? [originPoint, pendingItems[0]]
      : [originPoint, endPoint];
    const nextSegments = [];
    {
      const segs = generatePathSegments(nextStopItems[0], nextStopItems[1]);
      nextSegments.push(...segs);
    }
    const nextRouteString = nextSegments.map(p => `${p.x},${p.y}`).join(' ');

    // ── Full route segments (shown while button is held) ──
    const fullRouteSegments = [];
    for (let i = 0; i < remainingRouteItems.length - 1; i++) {
      const segs = generatePathSegments(remainingRouteItems[i], remainingRouteItems[i + 1]);
      if (i === 0) fullRouteSegments.push(...segs);
      else fullRouteSegments.push(...segs.slice(1));
    }
    const fullRouteString = fullRouteSegments.map(p => `${p.x},${p.y}`).join(' ');

    // Active display
    const routeString = showFullRoute ? fullRouteString : nextRouteString;
    const routeSegments = showFullRoute ? fullRouteSegments : nextSegments;

    // 4. Secciones dinámicas ordenadas por ruta TSP
    const dynamicSectionOrder = [...new Set(optimalOrder.map(i => i.section))];

    return (
      <div className={`flex flex-col h-full bg-black text-gray-100 animate-fade-in premium-gradient w-full max-w-full ${isFullScreenMap ? 'fixed inset-0 z-50' : 'relative'}`}>
        {/* Dark mode overlay over gradient */}
        <div className="absolute inset-0 bg-gray-900/95 z-0"></div>

        {!isFullScreenMap && (
          <div className="flex-shrink-0 relative z-10 p-5 pt-8 backdrop-blur-md bg-white/5 border-b border-white/10 flex justify-between items-center shadow-lg gap-2">
            <div className="min-w-0">
              <h2 className="font-black text-xl flex items-center gap-2 text-white truncate">
                <MapPin className="w-5 h-5 shrink-0 text-emerald-400" /> <span className="truncate">{selectedStore}</span>
              </h2>
              <p className="text-emerald-400/80 text-[10px] font-black uppercase tracking-[0.2em] mt-1 truncate">Smart Store Mode</p>
            </div>
            <div className="shrink-0 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-[10px] font-black text-emerald-400 animate-pulse flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span> LIVE
            </div>
          </div>
        )}

        {isFullScreenMap && (
          <div className="absolute top-8 left-5 z-50">
            <button
              onClick={() => setIsFullScreenMap(false)}
              className="bg-gray-800/80 backdrop-blur border border-white/10 p-3 rounded-full text-white shadow-xl active:scale-90 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <div
          className={`flex-shrink-0 relative z-10 bg-[#111827] border-white/5 shadow-2xl overflow-hidden transition-all duration-500 group
            ${isFullScreenMap ? 'flex-1 mx-0 my-0 rounded-none border-0' : 'mx-5 my-6 p-6 rounded-[2.5rem] border origin-top'}
        `}
        >
          <div className="absolute top-0 right-0 p-4 z-20">
            <div className="flex items-center gap-2 text-gray-500 font-black text-[9px] tracking-widest uppercase mb-2">
              <Navigation className="w-3 h-3 text-emerald-500 animate-pulse" /> LIVE TRACKING
            </div>
            <div className="flex items-center gap-2">
              {/* Hold-to-reveal full route button */}
              <button
                onMouseDown={() => setShowFullRoute(true)}
                onMouseUp={() => setShowFullRoute(false)}
                onMouseLeave={() => setShowFullRoute(false)}
                onTouchStart={(e) => { e.preventDefault(); setShowFullRoute(true); }}
                onTouchEnd={() => setShowFullRoute(false)}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider transition-all select-none
                  ${showFullRoute
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-gray-500 hover:text-gray-300'
                  }`}
              >
                <Navigation className="w-2.5 h-2.5" />
                {showFullRoute ? 'Ruta completa' : 'Ver ruta'}
              </button>
              {!isFullScreenMap && (
                <button
                  onClick={() => setIsFullScreenMap(true)}
                  className="flex items-center justify-center p-2 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="w-full h-full flex justify-center items-center transition-all duration-700" style={{ height: isFullScreenMap ? '100%' : '22vh' }}>
            <svg viewBox={layout.viewBox} className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]" preserveAspectRatio="xMidYMid meet">
              {/* Technical Blueprint Grid Pattern */}
              <defs>
                <pattern id="grid-small" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <pattern id="grid-large" width="50" height="50" patternUnits="userSpaceOnUse">
                  <rect width="50" height="50" fill="url(#grid-small)" />
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#475569" strokeWidth="1" opacity="0.4" />
                </pattern>
                {/* Gondola Shelf Hatching Pattern */}
                <pattern id="gondola-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-large)" />

              {/* ── NavMesh Debug / Blueprint Routing Lines ── */}
              <g opacity="0.1">
                {Object.entries(layout.navEdges).map(([nodeId, neighbors]) => {
                  const node = layout.navNodes[nodeId];
                  return neighbors.map(neighborId => {
                    const neighbor = layout.navNodes[neighborId];
                    if (!node || !neighbor) return null;
                    return (
                      <line
                        key={`${nodeId}-${neighborId}`}
                        x1={node.x} y1={node.y}
                        x2={neighbor.x} y2={neighbor.y}
                        stroke="#38bdf8"
                        strokeWidth="0.5"
                        strokeDasharray="1,1"
                      />
                    );
                  });
                })}
                {Object.entries(layout.navNodes).map(([id, node]) => (
                  <circle key={`node-${id}`} cx={node.x} cy={node.y} r="1" fill="#38bdf8" />
                ))}
              </g>

              {/* ── Zone floor overlays (semi-transparent coloured areas) ── */}
              {layout.zones?.map((zone, i) => (
                <rect
                  key={`zone-${i}`}
                  x={zone.x} y={zone.y}
                  width={zone.width} height={zone.height}
                  rx="1"
                  fill={zone.color}
                  opacity="0.08"
                />
              ))}

              {/* ── Architectural Outer Walls ── */}
              {layout.outerWall && (
                <path
                  d={layout.outerWall}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="4"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}
                />
              )}

              {/* ── Structural Shelves & Checkouts ── */}
              <g>
                {layout.shelves.map((shelf, i) => {
                  if (shelf.type === 'gondola') {
                    // Standard store aisle gondola with blueprint hatching
                    return (
                      <g key={i}>
                        <rect x={shelf.x} y={shelf.y} width={shelf.width} height={shelf.height} fill="#0f172a" opacity="0.8" />
                        <rect x={shelf.x} y={shelf.y} width={shelf.width} height={shelf.height} fill="url(#gondola-hatch)" />
                        <rect x={shelf.x} y={shelf.y} width={shelf.width} height={shelf.height} fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                        {/* Gondola structural spine */}
                        <line x1={shelf.x + shelf.width / 2} y1={shelf.y} x2={shelf.x + shelf.width / 2} y2={shelf.y + shelf.height} stroke="#0ea5e9" strokeWidth="1" opacity="0.4" />
                      </g>
                    );
                  } else if (shelf.type === 'wall-shelf') {
                    // Perimeter coolers / wall shelving (solid dark)
                    return (
                      <g key={i}>
                        <rect x={shelf.x} y={shelf.y} width={shelf.width} height={shelf.height} fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                        <rect x={shelf.x + 2} y={shelf.y + 2} width={shelf.width - 4} height={shelf.height - 4} fill="#0f172a" opacity="0.5" />
                      </g>
                    );
                  } else if (shelf.type === 'checkout') {
                    // Detailed checkout counter (conveyor belt + POS)
                    const isHorizontal = shelf.width > shelf.height;
                    const beltW = isHorizontal ? shelf.width * 0.7 : shelf.width;
                    const beltH = isHorizontal ? shelf.height : shelf.height * 0.7;
                    const posBgX = isHorizontal ? shelf.x + beltW + 2 : shelf.x;
                    const posBgY = isHorizontal ? shelf.y : shelf.y + beltH + 2;
                    const posW = isHorizontal ? shelf.width - beltW - 2 : shelf.width;
                    const posH = isHorizontal ? shelf.height : shelf.height - beltH - 2;

                    return (
                      <g key={i}>
                        {/* Main counter outline */}
                        <rect x={shelf.x} y={shelf.y} width={shelf.width} height={shelf.height} fill="#1e293b" stroke="#3b82f6" strokeWidth="1" opacity="0.8" rx="2" />
                        {/* Conveyor belt */}
                        <rect x={shelf.x + 1} y={shelf.y + 1} width={beltW - 2} height={beltH - 2} fill="#0f172a" stroke="#475569" strokeWidth="0.5" rx="1" />
                        {/* POS station */}
                        <rect x={posBgX} y={posBgY} width={posW - 1} height={posH - 1} fill="#2563eb" opacity="0.3" rx="1" />
                        <circle cx={posBgX + posW / 2} cy={posBgY + posH / 2} r={Math.min(posW, posH) / 3} fill="#60a5fa" />
                      </g>
                    );
                  } else if (shelf.type === 'curved-shelf') {
                    // Organic / Produce curved islands
                    return (
                      <g key={i}>
                        <rect x={shelf.x} y={shelf.y} width={shelf.width} height={shelf.height} rx={shelf.width / 2} fill="#10b981" opacity="0.2" stroke="#34d399" strokeWidth="1" />
                        <rect x={shelf.x + 4} y={shelf.y + 4} width={shelf.width - 8} height={shelf.height - 8} rx={(shelf.width - 8) / 2} fill="#065f46" opacity="0.8" />
                        <circle cx={shelf.x + shelf.width / 2} cy={shelf.y + shelf.height / 2} r={shelf.width / 4} fill="#ecfdf5" opacity="0.1" />
                      </g>
                    );
                  }
                  return null;
                })}
              </g>

              {/* ── Section labels (inside zone, subtle) ── */}
              {layout.sectionLabels?.map((lbl, i) => (
                <text key={i} x={lbl.x} y={lbl.y} fill="#94a3b8" fontSize="6" fontWeight="800" textAnchor="start" letterSpacing="0.05em">{lbl.label}</text>
              ))}

              {/* ── Entrance / Checkout architectural doors ── */}
              <g opacity="0.9">
                {/* Entrance Door Symbol */}
                <path d={`M ${layout.entrance.x - 12} ${layout.entrance.y} A 12 12 0 0 1 ${layout.entrance.x} ${layout.entrance.y - 12}`} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
                <path d={`M ${layout.entrance.x + 12} ${layout.entrance.y} A 12 12 0 0 0 ${layout.entrance.x} ${layout.entrance.y - 12}`} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
                <line x1={layout.entrance.x - 12} y1={layout.entrance.y} x2={layout.entrance.x} y2={layout.entrance.y - 12} stroke="#3b82f6" strokeWidth="1.5" />
                <line x1={layout.entrance.x + 12} y1={layout.entrance.y} x2={layout.entrance.x} y2={layout.entrance.y - 12} stroke="#3b82f6" strokeWidth="1.5" />
                <text x={layout.entrance.x} y={layout.entrance.y + 8} fill="#60a5fa" fontSize="5" fontWeight="900" textAnchor="middle" letterSpacing="0.1em">IN</text>
              </g>
              <g opacity="0.9">
                {/* Exit Door Symbol */}
                <path d={`M ${layout.checkout.x - 12} ${layout.checkout.y} A 12 12 0 0 1 ${layout.checkout.x} ${layout.checkout.y - 12}`} fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                <path d={`M ${layout.checkout.x + 12} ${layout.checkout.y} A 12 12 0 0 0 ${layout.checkout.x} ${layout.checkout.y - 12}`} fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                <line x1={layout.checkout.x - 12} y1={layout.checkout.y} x2={layout.checkout.x} y2={layout.checkout.y - 12} stroke="#ef4444" strokeWidth="1.5" />
                <line x1={layout.checkout.x + 12} y1={layout.checkout.y} x2={layout.checkout.x} y2={layout.checkout.y - 12} stroke="#ef4444" strokeWidth="1.5" />
                <text x={layout.checkout.x} y={layout.checkout.y + 8} fill="#f87171" fontSize="5" fontWeight="900" textAnchor="middle" letterSpacing="0.1em">OUT</text>
              </g>

              {/* ── Route line ── */}
              {routeSegments.length > 1 && (
                <>
                  {/* Full route ghost (dimmer, only when showFullRoute) */}
                  {showFullRoute && fullRouteSegments.length > 1 && (
                    <polyline
                      points={fullRouteString}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="5,6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.25"
                    />
                  )}
                  {/* Active segment (bright) */}
                  <polyline
                    points={routeString}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray="8,8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.6))' }}
                    className="animate-[dash_2s_linear_infinite]"
                  />
                </>
              )}

              <style dangerouslySetInnerHTML={{ __html: `@keyframes dash { to { stroke-dashoffset: -16; } }` }} />

              {/* Product pins */}
              {optimalOrder.map((item) => {
                if (!item.x || !item.y) return null;
                const isPending = !item.checked;
                const isNext = optimalOrder.find(i => !i.checked)?.id === item.id;
                return (
                  <g key={item.id} className="transition-all duration-500">
                    {isNext && (
                      <circle cx={item.x} cy={item.y} r={10} fill="#10B981">
                        <animate attributeName="r" from="10" to="25" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={item.x} cy={item.y}
                      r={isNext ? 8 : (isPending ? 6 : 4)}
                      fill={isNext ? "#34d399" : (isPending ? "#10B981" : "#374151")}
                      stroke={isNext ? "#ffffff" : "#111827"}
                      strokeWidth={isNext ? "2" : "1"}
                      className="transition-all duration-300"
                      style={{ filter: isNext ? 'drop-shadow(0 0 8px #10b981)' : 'none' }}
                    />
                    {isNext && (
                      <g className="pointer-events-none">
                        <rect x={item.x - 20} y={item.y - 35} width="40" height="18" rx="4" fill="#10b981" />
                        <text x={item.x} y={item.y - 23} fill="white" fontSize="8" fontWeight="900" textAnchor="middle">AQUÍ</text>
                        <path d={`M ${item.x - 4} ${item.y - 17} L ${item.x + 4} ${item.y - 17} L ${item.x} ${item.y - 10} Z`} fill="#10b981" />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* ── Entrance dot ── */}
              <circle cx={layout.entrance.x} cy={layout.entrance.y} r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 0 6px #3b82f6)' }} />

              {/* ── Checkout dot ── */}
              <circle cx={layout.checkout.x} cy={layout.checkout.y} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 0 6px #ef4444)' }} />

            </svg>
          </div>
        </div>

        {!isFullScreenMap && (
          <div className="relative z-10 flex-1 flex flex-col min-h-0 bg-black">
            <div className="flex-1 overflow-y-auto px-5 pb-6 scrollbar-hide">
              {/* Progress Card */}
              <div className="mb-6 p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Progreso de compra</p>
                  <p className="text-2xl font-black text-white">{cart.filter(i => i.checked).length} / {cart.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Siguiente parada</p>
                  <p className="text-sm font-bold text-white truncate max-w-[120px]">
                    {pendingItems[0]?.name || "Finalizado"}
                  </p>
                </div>
              </div>

              {/* Categorized Items */}
              {dynamicSectionOrder.map(sectionName => {
                const itemsInSection = optimalOrder.filter(i => i.section === sectionName);
                if (itemsInSection.length === 0) return null;

                const isAllChecked = itemsInSection.every(i => i.checked);
                const isActive = pendingItems[0]?.section === sectionName;

                return (
                  <div key={sectionName} className={`mb-6 transition-all duration-500 ${isAllChecked ? 'opacity-50 grayscale' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse ring-4 ring-emerald-500/20' : 'bg-gray-600'}`}></div>
                      <h4 className={`text-[11px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                        {sectionName}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {itemsInSection.map(item => (
                        <div
                          key={item.id}
                          onClick={() => {
                            triggerVibration([30]);
                            toggleCheck(item.id);
                          }}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer transform active:scale-[0.97] ${item.checked
                            ? 'bg-emerald-900/10 border-emerald-900/30'
                            : isActive
                              ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-gray-600 bg-gray-800/50'
                              }`}>
                              {item.checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
                            </div>
                            <div className="min-w-0">
                              <p className={`font-bold text-sm truncate ${item.checked ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                                {item.name}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 pl-3">
                            <p className={`text-base font-black ${item.checked ? 'text-gray-600' : 'text-white'}`}>{item.prices[selectedStore].toFixed(2)}€</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Finish button if everything checked */}
              {cart.length > 0 && cart.every(i => i.checked) && (
                <button
                  onClick={() => {
                    setView('home');
                    showFeedback("🏆 ¡Compra finalizada con éxito!");
                    triggerVibration([100, 50, 100]);
                  }}
                  className="w-full mt-4 premium-gradient text-white py-4 rounded-3xl font-black text-lg shadow-xl animate-bounce"
                >
                  FINALIZAR COMPRA
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto h-[100dvh] sm:h-[850px] sm:my-8 bg-gray-50 sm:rounded-[3rem] shadow-2xl relative sm:border-[12px] border-black flex flex-col font-sans overflow-hidden">

      {/* Toast Notification Premium */}
      {feedbackMsg && (
        <div className="absolute top-6 left-0 right-0 px-6 z-[100] flex justify-center animate-slide-down pointer-events-none">
          <div className="glass-dark text-white px-5 py-2.5 rounded-2xl shadow-2xl border border-white/10 font-bold text-xs text-center flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            {feedbackMsg}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        {view === 'home' && renderHome()}
        {view === 'list' && renderList()}
        {view === 'compare' && renderCompare()}
        {view === 'store' && renderStoreMode()}
      </div>

      {/* Bottom Navigation */}
      {view !== 'home' && !isFullScreenMap && (
        <div className={`flex-shrink-0 w-full ${view === 'store' ? 'bg-gray-950 border-gray-800' : 'bg-white/95 backdrop-blur-xl border-gray-200'} border-t pt-2 px-6 pb-4 sm:pb-6 flex justify-between items-end shadow-[0_-20px_40px_rgba(0,0,0,0.08)] z-40 transition-colors duration-500`}>
          <button onClick={() => setView('list')} className={`flex flex-col items-center gap-1.5 transition-all p-2 rounded-xl ${view === 'list' ? (view === 'store' ? 'text-emerald-400 -translate-y-2' : 'text-emerald-600 -translate-y-2') : 'text-gray-400 hover:bg-gray-100/50 hover:text-gray-600'}`}>
            <ListOrdered className={`w-6 h-6 ${view === 'list' ? 'bg-emerald-100/20 p-1 rounded backdrop-blur-sm' : ''}`} />
            <span className="text-[11px] font-black tracking-wide">LISTA</span>
            {view === 'list' && <div className={`w-1 h-1 rounded-full ${view === 'store' ? 'bg-emerald-400' : 'bg-emerald-600'}`}></div>}
          </button>

          <button onClick={() => setView('compare')} className={`flex flex-col items-center gap-1.5 transition-all p-2 rounded-xl ${view === 'compare' ? (view === 'store' ? 'text-blue-400 -translate-y-2' : 'text-blue-600 -translate-y-2') : 'text-gray-400 hover:bg-gray-100/50 hover:text-gray-600'}`}>
            <Search className={`w-6 h-6 ${view === 'compare' ? 'bg-blue-100/20 p-1 rounded backdrop-blur-sm' : ''}`} />
            <span className="text-[11px] font-black tracking-wide">OFERTAS</span>
            {view === 'compare' && <div className={`w-1 h-1 rounded-full ${view === 'store' ? 'bg-blue-400' : 'bg-blue-600'}`}></div>}
          </button>

          <button onClick={() => setView('store')} className={`flex flex-col items-center gap-1.5 transition-all p-2 rounded-xl ${view === 'store' ? 'text-teal-400 -translate-y-2' : 'text-gray-400 hover:bg-gray-100/50 hover:text-gray-600'}`}>
            <MapPin className={`w-6 h-6 ${view === 'store' ? 'bg-gray-800 p-1 rounded' : ''}`} />
            <span className="text-[11px] font-black tracking-wide">STORE</span>
            {view === 'store' && <div className="w-1 h-1 rounded-full bg-teal-400"></div>}
          </button>
        </div>
      )}
      {/* [TEMP] Map Editor floating button */}
      <button
        onClick={() => setShowMapEditor(true)}
        className="fixed bottom-24 right-4 z-50 w-10 h-10 rounded-full bg-gray-800 border border-gray-600 text-lg flex items-center justify-center shadow-lg hover:bg-gray-700 active:scale-95 transition-all"
        title="Abrir Editor de Mapas (Temporal)"
      >🗺️</button>

      {/* [TEMP] Map Editor Modal */}
      {showMapEditor && <MapEditor onClose={() => setShowMapEditor(false)} />}

    </div>
  );
}
