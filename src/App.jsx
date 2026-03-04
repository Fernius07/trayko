import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Mic, Camera, Search, Trash2, MapPin, ShoppingCart,
  ListOrdered, Smartphone, Zap, Check, Star, Navigation,
  Maximize2, X
} from 'lucide-react';
import './index.css';

// --- BASE DE DATOS MOCK ---
const MOCK_PRODUCTS = [
  { id: 1, name: 'Plátanos', section: 'Fruta', prices: { SuperA: 1.50, SuperB: 1.60, SuperC: 1.40 }, offer: null, x: 25, y: 150 },
  { id: 2, name: 'Manzanas', section: 'Fruta', prices: { SuperA: 2.10, SuperB: 1.90, SuperC: 2.20 }, offer: { store: 'SuperB', desc: 'Oferta -10%' }, x: 35, y: 120 },
  { id: 3, name: 'Naranjas', section: 'Fruta', prices: { SuperA: 1.80, SuperB: 1.85, SuperC: 1.70 }, offer: null, x: 25, y: 90 },
  { id: 4, name: 'Pan de molde', section: 'Pan', prices: { SuperA: 1.20, SuperB: 1.30, SuperC: 1.15 }, offer: null, x: 95, y: 60 },
  { id: 5, name: 'Baguette', section: 'Pan', prices: { SuperA: 0.90, SuperB: 0.85, SuperC: 1.00 }, offer: null, x: 125, y: 60 },
  { id: 6, name: 'Leche', section: 'Lácteos', prices: { SuperA: 0.95, SuperB: 0.90, SuperC: 1.10 }, offer: { store: 'SuperA', desc: 'Oferta 3x2' }, x: 185, y: 200 },
  { id: 7, name: 'Yogur', section: 'Lácteos', prices: { SuperA: 1.40, SuperB: 1.50, SuperC: 1.35 }, offer: null, x: 215, y: 200 },
  { id: 8, name: 'Queso', section: 'Lácteos', prices: { SuperA: 3.20, SuperB: 3.50, SuperC: 3.00 }, offer: null, x: 185, y: 250 },
  { id: 9, name: 'Pollo', section: 'Carnicería', prices: { SuperA: 5.50, SuperB: 6.00, SuperC: 5.20 }, offer: null, x: 95, y: 280 },
  { id: 10, name: 'Ternera', section: 'Carnicería', prices: { SuperA: 8.90, SuperB: 8.50, SuperC: 9.00 }, offer: null, x: 125, y: 280 },
  { id: 11, name: 'Champú', section: 'Higiene', prices: { SuperA: 2.50, SuperB: 2.40, SuperC: 2.80 }, offer: null, x: 275, y: 120 },
  { id: 12, name: 'Gel', section: 'Higiene', prices: { SuperA: 1.80, SuperB: 1.90, SuperC: 1.75 }, offer: null, x: 275, y: 150 },
  { id: 13, name: 'Papel higiénico', section: 'Higiene', prices: { SuperA: 3.50, SuperB: 3.20, SuperC: 3.80 }, offer: { store: 'SuperB', desc: 'Oferta Especial' }, x: 275, y: 180 },
  { id: 14, name: 'Arroz', section: 'Despensa', prices: { SuperA: 1.10, SuperB: 1.00, SuperC: 1.20 }, offer: null, x: 105, y: 140 },
  { id: 15, name: 'Pasta', section: 'Despensa', prices: { SuperA: 0.85, SuperB: 0.90, SuperC: 0.80 }, offer: null, x: 115, y: 180 },
  { id: 16, name: 'Tomate frito', section: 'Despensa', prices: { SuperA: 0.60, SuperB: 0.55, SuperC: 0.65 }, offer: null, x: 105, y: 220 },
  { id: 17, name: 'Agua', section: 'Bebidas', prices: { SuperA: 0.40, SuperB: 0.45, SuperC: 0.35 }, offer: null, x: 195, y: 80 },
  { id: 18, name: 'Refresco', section: 'Bebidas', prices: { SuperA: 1.20, SuperB: 1.15, SuperC: 1.30 }, offer: null, x: 195, y: 110 },
  { id: 19, name: 'Cerveza', section: 'Bebidas', prices: { SuperA: 0.65, SuperB: 0.70, SuperC: 0.60 }, offer: null, x: 215, y: 140 },
  { id: 20, name: 'Café', section: 'Despensa', prices: { SuperA: 2.80, SuperB: 2.90, SuperC: 2.70 }, offer: { store: 'SuperC', desc: 'Oferta -15%' }, x: 125, y: 160 },
  { id: 21, name: 'Condones', section: 'Higiene', prices: { SuperA: 6.00, SuperB: 2.90, SuperC: 2.70 }, offer: { store: 'SuperC', desc: 'Oferta -15%' }, x: 275, y: 210 },
];

const SECTIONS_ORDER = ['Entrada', 'Fruta', 'Pan', 'Despensa', 'Baguette', 'Lácteos', 'Carnicería', 'Bebidas', 'Higiene', 'Caja'];

const SECTION_COORDS = {
  'Entrada': { x: 150, y: 330 }, // Placed entrance at bottom center conceptually
  'Caja': { x: 50, y: 330 } // Placed checkout bottom left conceptually
};

export default function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [sortCriteria, setSortCriteria] = useState('default');
  const [showWizardPanel, setShowWizardPanel] = useState(false);
  const [animatingItem, setAnimatingItem] = useState(null);
  const [manualSearch, setManualSearch] = useState('');
  const [selectedStore, setSelectedStore] = useState('SuperA');
  const [isFullScreenMap, setIsFullScreenMap] = useState(false);

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
  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!manualSearch.trim()) return;

    const text = manualSearch.toLowerCase();
    let added = 0;
    let lastAddedId = null;

    MOCK_PRODUCTS.forEach(product => {
      if (text.includes(product.name.toLowerCase()) && !cart.find(item => item.id === product.id)) {
        setCart(prev => [...prev, { ...product, priority: false, checked: false }]);
        added++;
        lastAddedId = product.id;
      }
    });

    if (added > 0) {
      triggerVibration([100]);
      showFeedback(`Añadido: ${manualSearch}`);
      if (added === 1 && lastAddedId) setAnimatingItem(lastAddedId);
      setTimeout(() => setAnimatingItem(null), 500);
    } else {
      triggerVibration([50, 50]);
      showFeedback(`No se encontró o ya está en lista: ${manualSearch}`);
    }
    setManualSearch('');
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
      let added = 0;
      let lastAddedId = null;
      MOCK_PRODUCTS.forEach(product => {
        if (text.includes(product.name.toLowerCase()) && !cart.find(item => item.id === product.id)) {
          setCart(prev => [...prev, { ...product, priority: false, checked: false }]);
          added++;
          lastAddedId = product.id;
        }
      });
      setIsListening(false);
      triggerVibration([100, 50, 100]);
      if (added > 0) {
        showFeedback(`¡Perfecto! Añadidos ${added} productos.`);
        if (added === 1 && lastAddedId) setAnimatingItem(lastAddedId);
        setTimeout(() => setAnimatingItem(null), 500);
      } else {
        showFeedback(`No entendí "${text}" o ya está en la lista.`);
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

      {/* Decorative background blurs */}
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

      <div className="glass-effect p-6 rounded-[2rem] w-full max-w-sm space-y-4 relative z-10 transition-all">
        <button
          onClick={() => setView('list')}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all transform active:scale-[0.98] shadow-lg shadow-gray-900/30"
        >
          <ListOrdered className="w-6 h-6" />
          Preparar la Lista
        </button>
        <button
          onClick={simulateGeofence}
          className="w-full bg-teal-50 text-teal-700 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-teal-100 transition-all transform active:scale-[0.98] border border-teal-200"
        >
          <MapPin className="w-6 h-6" />
          Usar mi Ubicación GPS
        </button>
        <button
          onClick={() => showFeedback("📝 Analizando compras pasadas...")}
          className="w-full bg-white text-gray-600 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all transform active:scale-[0.98] border border-gray-200 mt-2"
        >
          <Camera className="w-5 h-5" />
          Escanear Ticket Antiguo
        </button>
      </div>
    </div>
  );

  const renderList = () => (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden animate-fade-in w-full max-w-full">

      {/* Header Premium */}
      <div className="flex-shrink-0 premium-gradient text-white p-6 pt-10 pb-6 rounded-b-[2.5rem] shadow-[0_10px_30px_rgba(20,184,166,0.3)] z-10 relative">
        <div className="flex justify-between items-center mb-4">
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

        {/* Search / Input Area */}
        <form onSubmit={handleManualSearch} className="relative mb-4">
          <input
            type="text"
            placeholder="Añadir producto..."
            className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md transition-all shadow-inner"
            value={manualSearch}
            onChange={(e) => setManualSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-white/70" />
          {manualSearch && (
            <button type="submit" className="absolute right-2 top-2 bg-white text-emerald-600 p-1.5 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-transform">
              Add
            </button>
          )}
        </form>

        <div className="flex gap-3">
          <button
            onClick={handleVoiceInput}
            className={`flex-1 py-3 px-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-95 shadow-lg ${isListening
              ? 'bg-red-500 text-white animate-pulse shadow-red-500/50'
              : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
              }`}
          >
            <Mic className={`w-5 h-5 flex-shrink-0 ${isListening ? 'animate-bounce' : ''}`} />
            <span className="truncate">{isListening ? 'Escuchando' : 'Voz'}</span>
          </button>
          <button
            onClick={handleCameraMock}
            className="flex-1 py-3 px-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-95 shadow-lg bg-white/20 text-white hover:bg-white/30 border border-white/20"
          >
            <Camera className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Cámara</span>
          </button>
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
            <p className="text-sm mt-2">Usa la voz o escanea productos para empezar.</p>
          </div>
        ) : (
          displayedCart.map(item => {
            let touchStartX = null;
            let currentTranslateX = 0;

            const onTouchStartSwipe = (e) => {
              touchStartX = e.touches[0].clientX;
              handleTouchStart(item.id);
            };

            const onTouchMoveSwipe = (e) => {
              if (touchStartX === null) return;
              const currentX = e.touches[0].clientX;
              const diffX = currentX - touchStartX;

              // Only allow swiping left to delete
              if (diffX < 0) {
                currentTranslateX = Math.max(diffX, -100);
                e.currentTarget.style.transform = `translateX(${currentTranslateX}px)`;
                if (currentTranslateX < -60) {
                  e.currentTarget.style.opacity = '0.5';
                }
              }
            };

            const onTouchEndSwipe = (e) => {
              handleTouchEnd();
              touchStartX = null;
              if (currentTranslateX <= -80) {
                // Trigger delete
                triggerVibration([100, 100]);
                handleRemove(item.id);
                showFeedback("🌪️ ¡Deslizado! Producto borrado.");
              } else {
                // Reset position
                e.currentTarget.style.transform = 'translateX(0px)';
                e.currentTarget.style.opacity = '1';
              }
              currentTranslateX = 0;
            };

            return (
              <div
                key={item.id}
                className={`relative flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border transition-all duration-300 transform ${animatingItem === item.id ? 'scale-[1.03] shadow-lg ring-2 ring-emerald-400 border-none' : ''
                  } ${item.priority
                    ? 'border-yellow-300 bg-yellow-50/50'
                    : 'border-gray-200 hover:shadow-md'
                  }`}
                style={{
                  background: item.priority ? 'linear-gradient(135deg, #fefce8 0%, #ffffff 100%)' : 'white',
                }}
                onMouseDown={() => handleTouchStart(item.id)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                onTouchStart={onTouchStartSwipe}
                onTouchMove={onTouchMoveSwipe}
                onTouchEnd={onTouchEndSwipe}
              >
                {/* Background delete indicator visible when swiping left */}
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

      {/* Sticky Bottom Action */}
      {cart.length > 0 && (
        <div className="flex-shrink-0 p-5 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-8 z-20 w-full">
          <button
            onClick={() => setView('compare')}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all transform active:scale-95 text-lg"
          >
            <Search className="w-6 h-6 shrink-0" />
            <span className="truncate">Comparar Precios</span>
          </button>
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

              {isBest && (
                <button
                  onClick={() => simulateGeofence(storeData.store)}
                  className="mt-6 w-full premium-gradient text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <Navigation className="w-5 h-5 shrink-0" />
                  <span className="truncate">Iniciar Ruta (GPS)</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStoreMode = () => {
    // --- PATHFINDING Y ROUTING ---
    const getAisleX = (x) => {
      if (x < 55) return 25;
      if (x < 115) return 85;
      if (x < 175) return 145;
      if (x < 235) return 205;
      return 265;
    };

    const getPathDistance = (pA, pB) => {
      const aisleA = getAisleX(pA.x);
      const aisleB = getAisleX(pB.x);
      if (aisleA === aisleB) {
        return Math.abs(pA.y - pB.y) + Math.abs(pA.x - aisleA) + Math.abs(pB.x - aisleB);
      }
      const distTop = (pA.y - 50) + Math.abs(aisleA - aisleB) + (pB.y - 50);
      const distBot = (270 - pA.y) + Math.abs(aisleA - aisleB) + (270 - pB.y);
      return Math.min(distTop, distBot) + Math.abs(pA.x - aisleA) + Math.abs(pB.x - aisleB);
    };

    const generatePathSegments = (pA, pB) => {
      const aisleA = getAisleX(pA.x);
      const aisleB = getAisleX(pB.x);
      const segments = [pA];

      if (pA.x !== aisleA) segments.push({ x: aisleA, y: pA.y });

      if (aisleA !== aisleB) {
        const distTop = (pA.y - 50) + Math.abs(aisleA - aisleB) + (pB.y - 50);
        const distBot = (270 - pA.y) + Math.abs(aisleA - aisleB) + (270 - pB.y);
        if (distTop < distBot) {
          segments.push({ x: aisleA, y: 50 });
          segments.push({ x: aisleB, y: 50 });
        } else {
          segments.push({ x: aisleA, y: 270 });
          segments.push({ x: aisleB, y: 270 });
        }
      }

      if (pB.x !== aisleB) segments.push({ x: aisleB, y: pB.y });
      segments.push(pB);
      return segments;
    };

    // 1. Filtrar productos
    const itemsWithCoords = cart.filter(i => i.x && i.y);

    // 2. Ruta Óptima TSP (Greedy Nearest Neighbor)
    const startPoint = { ...SECTION_COORDS['Entrada'], id: 'start' };
    const endPoint = { ...SECTION_COORDS['Caja'], id: 'end' };

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

    // 3. Generar segmentos de línea SVG esquivando pasillos
    const completedItems = optimalOrder.filter(i => i.checked);
    const pendingItems = optimalOrder.filter(i => !i.checked);

    const originPoint = completedItems.length > 0 ? completedItems[completedItems.length - 1] : startPoint;
    const remainingRouteItems = [originPoint, ...pendingItems, endPoint];

    const routeSegments = [];
    for (let i = 0; i < remainingRouteItems.length - 1; i++) {
      const segs = generatePathSegments(remainingRouteItems[i], remainingRouteItems[i + 1]);
      if (i === 0) routeSegments.push(...segs);
      else routeSegments.push(...segs.slice(1));
    }
    const routeString = routeSegments.map(p => `${p.x},${p.y}`).join(' ');

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
            {!isFullScreenMap && (
              <button
                onClick={() => setIsFullScreenMap(true)}
                className="ml-auto flex items-center justify-center p-2 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="w-full h-full flex justify-center items-center transition-all duration-700" style={{ height: isFullScreenMap ? '100%' : '22vh' }}>
            <svg viewBox="0 0 300 350" className="w-full h-full drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]" preserveAspectRatio="xMidYMid meet">
              {/* Grid Pattern Background for a technical look */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" opacity="0.03" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Store Shelves / Aisles - Realistic Layout */}
              <g stroke="#4b5563" strokeWidth="1.5" fill="#1f2937" opacity="0.9" rx="6">
                {/* Outer walls / Back section */}
                <rect x="10" y="20" width="280" height="20" rx="4" />

                {/* Vertical Aisles */}
                <rect x="40" y="60" width="30" height="200" rx="4" />
                <rect x="100" y="60" width="30" height="200" rx="4" />
                <rect x="160" y="60" width="30" height="200" rx="4" />
                <rect x="220" y="60" width="30" height="200" rx="4" />

                {/* Checkout area */}
                <rect x="40" y="280" width="80" height="20" rx="4" fill="#374151" />
                <rect x="180" y="280" width="80" height="20" rx="4" fill="#374151" />
              </g>

              {/* Glowing optimized path */}
              {routeSegments.length > 1 && (
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
              )}

              <style dangerouslySetInnerHTML={{ __html: `@keyframes dash { to { stroke-dashoffset: -16; } }` }} />

              {/* Render Specific Product Coordinates for items in cart */}
              {optimalOrder.map((item, idx) => {
                if (!item.x || !item.y) return null;
                const isPending = !item.checked;
                // Identify the "Next" item as the first pending item in the sorted list
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
                      cx={item.x}
                      cy={item.y}
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
                        <text x={item.x} y={item.y - 23} fill="white" fontSize="8" fontWeight="900" textAnchor="middle" className="uppercase font-black tracking-tighter">AQUÍ</text>
                        <path d={`M ${item.x - 4} ${item.y - 17} L ${item.x + 4} ${item.y - 17} L ${item.x} ${item.y - 10} Z`} fill="#10b981" />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Entrance and Exit points */}
              <circle cx={SECTION_COORDS['Entrada'].x} cy={SECTION_COORDS['Entrada'].y} r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <text x={SECTION_COORDS['Entrada'].x} y={SECTION_COORDS['Entrada'].y + 15} fill="#60a5fa" fontSize="8" fontWeight="bold" textAnchor="middle">INICIO</text>

              <circle cx={SECTION_COORDS['Caja'].x} cy={SECTION_COORDS['Caja'].y} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <text x={SECTION_COORDS['Caja'].x} y={SECTION_COORDS['Caja'].y + 15} fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">CAJA</text>

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
        <div className="absolute top-10 w-full px-4 z-50 flex justify-center animate-slide-down pointer-events-none">
          <div className="bg-gray-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-700 font-bold text-sm text-center">
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

      {/* Floating Action Menu (Mago de Oz) */}
      {!isFullScreenMap && (
        <div className={`absolute bottom-24 right-5 flex flex-col items-end gap-3 z-50 transition-transform duration-500 ease-in-out ${showWizardPanel ? 'translate-x-[0px]' : 'translate-x-[calc(100%+30px)]'}`}>
          <div className="relative group">
            <button
              onClick={() => setShowWizardPanel(!showWizardPanel)}
              className="absolute right-[calc(100%+15px)] bottom-0 w-12 h-12 bg-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all outline-none ring-4 ring-purple-100 group-hover:bg-purple-700"
              style={{ transform: !showWizardPanel ? 'translateX(0)' : 'translateX(60px) scale(0)', opacity: !showWizardPanel ? 1 : 0 }}
            >
              <Smartphone className="w-6 h-6 animate-pulse" />
            </button>
          </div>

          {showWizardPanel && (
            <div className="absolute right-0 bottom-0 max-w-[200px] animate-fade-in origin-bottom-right drop-shadow-2xl">
              <div className="bg-white/95 backdrop-blur-xl p-4 rounded-[2rem] border border-purple-100/50 flex flex-col gap-2 w-56 transform translate-y-0">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-1">
                  <p className="text-xs font-black text-purple-800 uppercase tracking-wide">Mago de Oz</p>
                  <button onClick={() => setShowWizardPanel(false)} className="text-gray-400 hover:text-gray-800 bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">X</button>
                </div>
                <button onClick={() => { simulateGeofence(); setShowWizardPanel(false); }} className="text-left px-3 py-2.5 hover:bg-purple-50 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold text-gray-700">
                  <MapPin className="w-4 h-4 text-purple-600" /> Llegar (GPS)
                </button>
                <button onClick={() => {
                  showFeedback("📜 Abriendo historial de compras...");
                  setShowWizardPanel(false);
                }} className="text-left px-3 py-2.5 hover:bg-purple-50 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold text-gray-700">
                  <ListOrdered className="w-4 h-4 text-purple-600" /> Ver Historial
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
