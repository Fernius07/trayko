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

// Store layout zone definitions: each store divides the shop floor into columns/zones
// These MUST match the shelf geometry in storeLayouts.js exactly.
const STORE_ZONES = {
    SuperA: {
        // 4 shelf blocks: x=10(w60), 100(w60), 170(w60), 240(w60), y=38-257
        columns: [
            { xMin: 15, xMax: 65, categories: ['Fruta', 'Verdura'] },
            { xMin: 105, xMax: 155, categories: ['Pan', 'Despensa', 'Snacks'] },
            { xMin: 175, xMax: 225, categories: ['Lácteos', 'Bebidas', 'Congelados'] },
            { xMin: 245, xMax: 295, categories: ['Higiene', 'Limpieza'] },
        ],
        carniceria: { xMin: 105, xMax: 155, yMin: 150, yMax: 240 },
        pescaderia: { xMin: 175, xMax: 225, yMin: 150, yMax: 240 },
        charcuteria: { xMin: 15, xMax: 65, yMin: 150, yMax: 240 },
        entrance: { x: 200, y: 370 },
        checkout: { x: 60, y: 370 },
        yMin: 45, yMax: 250,
    },
    SuperB: {
        // 3 wide shelf blocks: x=10(w70), 125(w70), 240(w70), y=52-257
        // Rear perimeter (Carniceria/Pescaderia/Charcuteria): y=10-38
        columns: [
            { xMin: 15, xMax: 75, categories: ['Fruta', 'Verdura'] },
            { xMin: 130, xMax: 190, categories: ['Pan', 'Despensa', 'Snacks', 'Congelados'] },
            { xMin: 245, xMax: 305, categories: ['Higiene', 'Limpieza', 'Bebidas'] },
        ],
        carniceria: { xMin: 15, xMax: 108, yMin: 13, yMax: 35 },
        pescaderia: { xMin: 112, xMax: 207, yMin: 13, yMax: 35 },
        charcuteria: { xMin: 212, xMax: 307, yMin: 13, yMax: 35 },
        lacteosZone: { xMin: 130, xMax: 190, yMin: 55, yMax: 130 },
        entrance: { x: 290, y: 370 },
        checkout: { x: 30, y: 370 },
        yMin: 58, yMax: 248,
    },
    SuperC: {
        // 5 narrow shelf blocks: x=10(w40), 65(w40), 120(w40), 175(w40), 230(w40), y=36-241
        columns: [
            { xMin: 13, xMax: 47, categories: ['Fruta'] },
            { xMin: 68, xMax: 102, categories: ['Verdura', 'Pan'] },
            { xMin: 123, xMax: 157, categories: ['Lácteos', 'Despensa'] },
            { xMin: 178, xMax: 212, categories: ['Bebidas', 'Snacks', 'Congelados'] },
            { xMin: 233, xMax: 267, categories: ['Higiene', 'Limpieza'] },
        ],
        carniceria: { xMin: 13, xMax: 102, yMin: 155, yMax: 233 },
        pescaderia: { xMin: 123, xMax: 212, yMin: 155, yMax: 233 },
        charcuteria: { xMin: 233, xMax: 267, yMin: 155, yMax: 233 },
        entrance: { x: 160, y: 370 },
        checkout: { x: 290, y: 370 },
        yMin: 42, yMax: 235,
    },
};

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCoordsForStore(section, indexInSection, totalInSection, store) {
    const layout = STORE_ZONES[store];
    const specialSections = {
        'Carnicería': layout.carniceria,
        'Pescadería': layout.pescaderia,
        'Charcutería': layout.charcuteria,
    };

    // Special sections have fixed zones (perimeter shelves)
    if (specialSections[section]) {
        const zone = specialSections[section];
        const x = randBetween(zone.xMin + 3, zone.xMax - 3);
        const y = randBetween(zone.yMin + 2, zone.yMax - 2);
        return { x, y };
    }

    // Lácteos in SuperB span a dedicated corridor strip
    if (section === 'Lácteos' && store === 'SuperB' && layout.lacteosZone) {
        const zone = layout.lacteosZone;
        const slotWidth = (zone.xMax - zone.xMin) / Math.max(totalInSection, 1);
        const x = Math.round(zone.xMin + slotWidth * indexInSection + slotWidth / 2);
        const y = randBetween(zone.yMin + 2, zone.yMax - 2);
        return { x, y };
    }

    // Find the column that contains this section
    const col = layout.columns.find(c => c.categories.includes(section));
    if (!col) {
        // Fallback: spread across full layout area
        return { x: randBetween(15, 300), y: randBetween(layout.yMin, layout.yMax) };
    }

    const x = randBetween(col.xMin + 2, col.xMax - 2);
    // Spread vertically within the actual shelf block y-range
    const yRange = layout.yMax - layout.yMin;
    const slotHeight = yRange / Math.max(totalInSection, 1);
    const y = Math.round(layout.yMin + slotHeight * indexInSection + slotHeight / 2);
    return { x, y };
}

function generateProducts() {
    const products = [];
    let id = 1;

    // Use a seeded-ish random by sorting by category to get consistent positions
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
                    SuperA: getCoordsForStore(section, idx, names.length, 'SuperA'),
                    SuperB: getCoordsForStore(section, idx, names.length, 'SuperB'),
                    SuperC: getCoordsForStore(section, idx, names.length, 'SuperC'),
                },
            });
            id++;
        });
    }

    return products;
}

export const MOCK_PRODUCTS = generateProducts();
