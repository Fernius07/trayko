// --- TRAYKO MOCK PRODUCT DATABASE (500 products) ---
// Coordinates are generated per-store so each supermarket has a different layout.

const CATEGORIES = {
    Fruta: [
        'Plátanos', 'Manzanas Fuji', 'Manzanas Golden', 'Naranjas', 'Mandarinas', 'Peras Conference',
        'Peras Blanquilla', 'Uvas Blancas', 'Uvas Negras', 'Fresas', 'Frambuesas', 'Moras', 'Arándanos',
        'Cerezas', 'Melocotones', 'Nectarinas', 'Ciruelas', 'Albaricoques', 'Sandía', 'Melón Piel de Sapo',
        'Melón Cantaloup', 'Piña', 'Mango', 'Papaya', 'Kiwi', 'Higos', 'Limones', 'Limas', 'Pomelo',
        'Coco', 'Aguacate', 'Granada', 'Caqui', 'Lichis', 'Maracuyá', 'Chirimoya', 'Guayaba',
        'Carambola', 'Pitahaya', 'Tamarindo', 'Physalis', 'Kumquat', 'Jackfruit', 'Rambután',
    ],
    Verdura: [
        'Tomates', 'Tomates Cherry', 'Pepinos', 'Pimientos Rojos', 'Pimientos Verdes', 'Pimientos Amarillos',
        'Berenjenas', 'Calabacín', 'Calabaza', 'Zanahorias', 'Patatas', 'Boniatos', 'Remolacha',
        'Cebollas', 'Cebolla Morada', 'Puerros', 'Ajos', 'Espárragos', 'Alcachofas', 'Brócoli',
        'Coliflor', 'Col Blanca', 'Col Lombarda', 'Coles de Bruselas', 'Espinacas', 'Acelgas',
        'Rúcula', 'Canónigos', 'Lechuga Iceberg', 'Lechuga Romana', 'Endivias', 'Escarola',
        'Perejil', 'Cilantro', 'Albahaca', 'Romero', 'Tomillo', 'Menta', 'Eneldo',
        'Champiñones', 'Setas Portobello', 'Setas Shiitake', 'Setas Ostra',
    ],
    Pan: [
        'Pan de Molde', 'Pan de Molde Integral', 'Pan de Molde Sin Gluten', 'Baguette', 'Pan de Centeno',
        'Pan de Semillas', 'Pan de Espelta', 'Pan de Maíz', 'Pan Pita', 'Pan de Hamburguesa',
        'Pan de Perrito', 'Croissant', 'Croissant Integral', 'Magdalenas', 'Magdalenas Chocolate',
        'Tostadas', 'Pan Bimbo', 'Pan Bimbo Thins', 'Pan Artesano', 'Pan Brioche',
        'Panecillos', 'Focaccia', 'Chapata', 'Pan de Ajo', 'Rosca de Pan',
    ],
    Lácteos: [
        'Leche Entera', 'Leche Semidesnatada', 'Leche Desnatada', 'Leche Sin Lactosa',
        'Leche de Avena', 'Leche de Almendra', 'Leche de Soja', 'Leche de Coco',
        'Yogur Natural', 'Yogur Griego', 'Yogur de Fresa', 'Yogur de Melocotón', 'Yogur de Vainilla',
        'Yogur Sin Azúcar', 'Yogur de Soja', 'Queso Manchego', 'Queso Edam', 'Queso Gouda',
        'Queso Brie', 'Queso Camembert', 'Queso Cheddar', 'Queso Mozzarella', 'Queso Feta',
        'Queso Parmesano', 'Queso Ricotta', 'Queso Cottage', 'Queso Fundido', 'Nata Líquida',
        'Nata Montar', 'Crème Fraîche', 'Mantequilla', 'Margarina', 'Kéfir',
    ],
    Carnicería: [
        'Pechuga de Pollo', 'Muslos de Pollo', 'Contramuslos Pollo', 'Alitas de Pollo', 'Pollo Entero',
        'Ternera Filetes', 'Ternera Picada', 'Ternera para Guisar', 'Chuletas de Ternera',
        'Lomo de Cerdo', 'Chuletas de Cerdo', 'Costillas de Cerdo', 'Panceta', 'Beicon',
        'Solomillo de Cerdo', 'Hamburguesas Ternera', 'Hamburguesas Cerdo', 'Salchichas Frankfurt',
        'Salchichas Pollo', 'Cordero Chuletas', 'Cordero Pierna', 'Pavo Filetado',
        'Pavo Picado', 'Conejo', 'Codornices', 'Avestruz', 'Ciervo', 'Jabalí',
    ],
    Pescadería: [
        'Merluza Filete', 'Merluza Entera', 'Salmón Filete', 'Salmón Entero', 'Dorada', 'Lubina',
        'Bacalao Salado', 'Bacalao Fresco', 'Atún Fresco', 'Bonito', 'Sardinas', 'Caballa',
        'Boquerones', 'Gambas Frescas', 'Gambas Congeladas', 'Langostinos', 'Mejillones',
        'Almejas', 'Berberechos', 'Navajas', 'Pulpo', 'Calamar', 'Sepia', 'Rape',
        'Lenguado', 'Rodaballo', 'Pez Espada', 'Tilapia',
    ],
    Charcutería: [
        'Jamón Serrano', 'Jamón Ibérico', 'Jamón Cocido', 'Jamón York', 'Mortadela',
        'Salchichón', 'Chorizo Dulce', 'Chorizo Picante', 'Fuet', 'Sobrasada',
        'Morcón', 'Pavo Loncheado', 'Pollo Loncheado', 'Lacón', 'Cecina',
        'Lomo Embuchado', 'Morcilla', 'Butifarra', 'Foie-gras', 'Paté de Campaña',
    ],
    Congelados: [
        'Pizza Margarita', 'Pizza Jamón', 'Pizza Cuatro Quesos', 'Pizza Atún',
        'Croquetas Jamón', 'Croquetas Bacalao', 'Croquetas Pollo', 'Patatas Fritas Congeladas',
        'Verduras Salteadas', 'Menestra Congelada', 'Espinacas Congeladas', 'Guisantes Congelados',
        'Judías Verdes Congeladas', 'Brócoli Congelado', 'Mezcla Pescado', 'Gambas Congeladas',
        'Calamares Congelados', 'Helado Vainilla', 'Helado Chocolate', 'Helado Fresa',
        'Polo de Hielo', 'Sorbete Limón', 'Masa Hojaldre', 'Masa Brisa',
    ],
    Bebidas: [
        'Agua Mineral 0.5L', 'Agua Mineral 1.5L', 'Agua Con Gas', 'Agua Saborizada Limón',
        'Agua Saborizada Frambuesa', 'Refresco Cola', 'Refresco Light', 'Refresco Zero',
        'Refresco Limón', 'Refresco Naranja', 'Cerveza Lager', 'Cerveza Triple',
        'Cerveza Tostada', 'Cerveza Sin Alcohol', 'Cerveza Artesana IPA', 'Sidra Natural',
        'Vino Tinto Rioja', 'Vino Tinto Ribera', 'Vino Blanco Albariño', 'Vino Blanco Verdejo',
        'Vino Rosado', 'Cava Brut', 'Cava Semiseco', 'Zumo Naranja', 'Zumo Manzana',
        'Zumo Multivitamínico', 'Batido Fresa', 'Batido Chocolate', 'Batido Vainilla',
        'Té Frío Limón', 'Té Frío Melocotón', 'Bebida Isotónica', 'Agua de Coco',
        'Kombucha', 'Kéfir de Agua', 'Smoothie Mango', 'Smoothie Verde', 'Café Frío',
    ],
    Despensa: [
        'Arroz Largo', 'Arroz Redondo', 'Arroz Integral', 'Arroz Basmati', 'Arroz Jazmín',
        'Pasta Espaguetis', 'Pasta Macarrones', 'Pasta Penne', 'Pasta Fusilli', 'Pasta Lazaña',
        'Pasta Farfalle', 'Pasta Tallarines', 'Pasta Sin Gluten', 'Lentejas', 'Garbanzos',
        'Alubias Blancas', 'Alubias Pintas', 'Guisantes Secos', 'Harina Trigo', 'Harina Integral',
        'Harina de Maíz', 'Azúcar Blanco', 'Azúcar Moreno', 'Miel', 'Mermelada Fresa',
        'Mermelada Melocotón', 'Mermelada Naranja', 'Nutella', 'Mantequilla de Cacahuete',
        'Aceite de Oliva 0.75L', 'Aceite de Oliva 1L', 'Aceite de Girasol', 'Vinagre de Vino',
        'Vinagre Balsámico', 'Sal Fina', 'Sal Gruesa', 'Pimienta Negra', 'Pimentón Dulce',
        'Pimentón Picante', 'Cúrcuma', 'Comino', 'Orégano', 'Albahaca Seca', 'Curry',
        'Caldo de Pollo', 'Caldo de Verduras', 'Caldo de Pescado', 'Tomate Frito', 'Tomate Triturado',
        'Atún en Lata', 'Sardinas en Lata', 'Mejillones en Lata', 'Berberechos en Lata',
        'Maíz en Lata', 'Espárragos en Lata', 'Lentejas en Lata', 'Garbanzos en Lata',
        'Café Molido', 'Café Soluble', 'Café en Cápsulas', 'Té Verde', 'Té Negro', 'Té Rojo',
        'Té de Manzanilla', 'Té de Menta', 'Cacao en Polvo', 'Leche Condensada',
        'Galletas María', 'Galletas Oreo', 'Galletas Digestive', 'Galletas de Avena',
        'Cereales Corn Flakes', 'Cereales Muesli', 'Cereales Granola', 'Copos de Avena',
    ],
    Snacks: [
        'Patatas Fritas Lay\'s', 'Patatas Fritas Ruffles', 'Patatas Fritas Pringles',
        'Nachos', 'Doritos', 'Palomitas de Maíz', 'Palomitas Microondas',
        'Frutos Secos Mixtos', 'Almendras', 'Nueces', 'Pistachos', 'Anacardos', 'Avellanas',
        'Cacahuetes', 'Pipas Girasol', 'Pipas Calabaza', 'Gominolas', 'Regaliz', 'Caramelos',
        'Chicle', 'Chocolatinas Kit-Kat', 'Chocolatinas Twix', 'Chocolatinas Snickers',
        'Tableta Chocolate Negro', 'Tableta Chocolate Leche', 'Tableta Chocolate Blanco',
        'Barritas de Cereales', 'Barritas Proteínas', 'Arroz con Leche', 'Natillas',
    ],
    Higiene: [
        'Champú Pantene', 'Champú Head & Shoulders', 'Champú Elvive', 'Champú Seco',
        'Acondicionador Pantene', 'Mascarilla Capilar', 'Gel de Ducha', 'Gel Neutro',
        'Jabón de Manos', 'Jabón Pastilla', 'Espuma de Afeitar', 'Crema de Afeitar',
        'Maquinilla de Afeitar', 'Desodorante Spray', 'Desodorante Roll-On', 'Desodorante Stick',
        'Pasta de Dientes', 'Cepillo de Dientes', 'Enjuague Bucal', 'Hilo Dental',
        'Papel Higiénico 4R', 'Papel Higiénico 8R', 'Papel Higiénico Húmedo',
        'Toallitas Húmedas Bebé', 'Pañales Talla 3', 'Pañales Talla 4', 'Pañales Talla 5',
        'Compresas', 'Tampones', 'Copa Menstrual',
        'Crema Hidratante Facial', 'Crema Corporal', 'Protector Solar SPF50',
        'Maquillaje Base', 'Rímel', 'Lápiz de Ojos', 'Labial', 'Desmaquillante',
        'Algodón', 'Tiritas', 'Alcohol Isopropílico',
    ],
    Limpieza: [
        'Detergente Lavadora Líquido', 'Detergente Lavadora Polvo', 'Pastillas Lavavajillas',
        'Detergente Lavavajillas', 'Suavizante Ropa', 'Quitamanchas Spray',
        'Limpiahogar Multiusos', 'Limpiacristales', 'Limpiador Baño', 'Limpiador Cocina',
        'Desengrasante Horno', 'Limpiador WC', 'Pastillas WC', 'Lejía', 'Amoniaco',
        'Fregasuelos', 'Abrillantador Lavavajillas', 'Bolsas Basura 50L', 'Bolsas Basura 30L',
        'Papel de Cocina', 'Film de Plástico', 'Papel de Aluminio', 'Bolsas Congelado',
        'Guantes Látex', 'Estropajo', 'Bayeta', 'Mopa', 'Escoba', 'Recogedor', 'Fregona',
    ],
};

import { STORE_LAYOUTS } from './storeLayouts.js';

const CATEGORY_TO_ZONE = {
    'Fruta': 'Frutería',
    'Verdura': 'Frutería',
    'Pan': 'Panadería',
    'Despensa': 'Otros',
    'Snacks': 'Snacks',
    'Lácteos': 'Lácteos',
    'Congelados': 'Congelados',
    'Carnicería': 'Carnicería',
    'Pescadería': 'Pescadería',
    'Charcutería': 'Carnicería',
    'Bebidas': 'Bebidas',
    'Higiene': 'Perfumería',
    'Limpieza': 'Limpieza',
};

function rectIntersect(r1, r2) {
    return !(r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y);
}

// Function to seeded random based on string sum to keep positions stable
function seededRandom(seedStr, max) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const rnd = ((hash * 9301 + 49297) % 233280) / 233280;
    return Math.floor(rnd * max);
}

function getCoordsForStore(section, indexInSection, totalInSection, store, productName) {
    const layout = STORE_LAYOUTS[store];
    if (!layout || !layout.zones || !layout.shelves) return { x: 50, y: 50 };

    const targetLabel = CATEGORY_TO_ZONE[section] || 'Otros';

    // Find zones that loosely match the label
    const matchingZones = layout.zones.filter(z => z.label && z.label.toLowerCase().includes(targetLabel.toLowerCase()));

    // If no exact match, fallback to 'Otros' or the first zone
    const zonesToUse = matchingZones.length > 0 ? matchingZones : layout.zones;

    // Find all shelves that intersect with ANY of the matched zones
    const validShelves = layout.shelves.filter(shelf => {
        // Skip checkouts for product placement
        if (shelf.type === 'checkout') return false;

        return zonesToUse.some(zone => rectIntersect(shelf, zone));
    });

    if (validShelves.length === 0) {
        // Fallback to random shelf if none intersect
        const valid = layout.shelves.filter(s => s.type !== 'checkout');
        if (valid.length === 0) return { x: 50, y: 50 };
        const s = valid[seededRandom(productName, valid.length)];
        if (!s) return { x: 50, y: 50 };
        return {
            x: Math.round((s.x || 0) + seededRandom(productName + "x", Math.max(1, s.width || 1))),
            y: Math.round((s.y || 0) + seededRandom(productName + "y", Math.max(1, s.height || 1)))
        };
    }

    // Pick a shelf consistently based on the product name
    const shelf = validShelves[seededRandom(productName, validShelves.length)];
    if (!shelf) return { x: 50, y: 50 };

    return {
        // Distribute coordinates nicely inside the shelf
        x: Math.round((shelf.x || 0) + (seededRandom(productName + "x", Math.max(1, (shelf.width || 2) - 2)) + 1)),
        y: Math.round((shelf.y || 0) + (seededRandom(productName + "y", Math.max(1, (shelf.height || 2) - 2)) + 1))
    };
}

function generateProducts() {
    const products = [];
    let id = 1;

    for (const [section, names] of Object.entries(CATEGORIES)) {
        names.forEach((name, idx) => {
            const basePrice = +(Math.random() * 6 + 0.3).toFixed(2);
            const variance = () => +((Math.random() * 0.6 - 0.3) * basePrice).toFixed(2);
            const hasOffer = Math.random() < 0.15;
            const offerStore = ['SuperA', 'SuperB', 'SuperC'][Math.floor(Math.random() * 3)];
            const offerDescs = ['Oferta -10%', 'Oferta -15%', '3x2', '2x1', 'Especial Semana', '2ª unidad -50%'];

            products.push({
                id,
                name,
                section,
                prices: {
                    SuperA: +(basePrice + variance()).toFixed(2),
                    SuperB: +(basePrice + variance()).toFixed(2),
                    SuperC: +(basePrice + variance()).toFixed(2),
                },
                offer: hasOffer
                    ? { store: offerStore, desc: offerDescs[Math.floor(Math.random() * offerDescs.length)] }
                    : null,
                coords: {
                    SuperA: getCoordsForStore(section, idx, names.length, 'SuperA', name),
                    SuperB: getCoordsForStore(section, idx, names.length, 'SuperB', name),
                    SuperC: getCoordsForStore(section, idx, names.length, 'SuperC', name),
                },
            });
            id++;
        });
    }

    return products;
}

export const MOCK_PRODUCTS = generateProducts();
