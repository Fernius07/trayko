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

// Zonas precisas actualizadas con la nueva geometría Arquitectónica
const STORE_ZONES = {
    SuperA: {
        // Linea Seca: 5 Pasillos verticales a la izda 
        // Col1 (x:45-65), Col2(x:80-100), Col3(x:115-135), Col4(x:150-170), Col5(x:185) y Col6(x:220) cortadas por tramo Almacén
        columnsLargas: [
            { xMin: 50, xMax: 60, categories: ['Pan', 'Snacks'] },     // Col 1
            { xMin: 85, xMax: 95, categories: ['Despensa'] },          // Col 2
            { xMin: 120, xMax: 130, categories: ['Higiene', 'Limpieza'] } // Col 3
        ],
        columnsCortas: [
            { xMin: 155, xMax: 165, categories: ['Bebidas'] },           // Col 4 bajo almacen
            { xMin: 190, xMax: 200, categories: ['Lácteos', 'Congelados'] },// Col 5 partida
            { xMin: 225, xMax: 235, categories: ['Lácteos', 'Despensa'] } // Col 6 partida
        ],
        organicas: ['Fruta', 'Verdura'],  // Isletas curvas derecha
        carniceria: { xMin: 25, xMax: 150, yMin: 25, yMax: 30 }, // Arriba izda (pared norte)
        pescaderia: { xMin: 25, xMax: 150, yMin: 25, yMax: 30 },
        charcuteria: { xMin: 25, xMax: 30, yMin: 35, yMax: 200 }, // Pared izda perimetral firo
    },
    SuperB: {
        // Pared oblicua y escalonados. 
        // Isla centro: x=45-125
        // Verticales largas: x=155-185, x=210-240, x=265-295
        columns: [
            { xMin: 47, xMax: 122, categories: ['Congelados', 'Lácteos'] },  // Islas centrales gruesas
            { xMin: 157, xMax: 182, categories: ['Despensa', 'Bebidas'] }, // Larga 1
            { xMin: 212, xMax: 237, categories: ['Pan', 'Snacks', 'Fruta'] }, // Larga 2
            { xMin: 267, xMax: 292, categories: ['Higiene', 'Limpieza', 'Verdura'] }, // Corta 3
        ],
        carniceria: { xMin: 15, xMax: 300, yMin: 15, yMax: 25 }, // Perimetro superior
        pescaderia: { xMin: 15, xMax: 300, yMin: 15, yMax: 25 },
        charcuteria: { xMin: 15, xMax: 20, yMin: 25, yMax: 320 }, // Perimetro izquierdo enorme
    },
    SuperC: {
        // Hipermercado en L
        // Pasillos largos Izquierda: x=60-95, x=110-145, x=160-195
        // Islas Organico Curvas Derecha: x=230-360
        columns: [
            { xMin: 63, xMax: 92, categories: ['Despensa', 'Bebidas'] },
            { xMin: 113, xMax: 142, categories: ['Higiene', 'Limpieza', 'Snacks'] },
            { xMin: 163, xMax: 192, categories: ['Pan', 'Congelados', 'Lácteos'] },
        ],
        organicas: ['Fruta', 'Verdura'],  // Estas van a los isletas circulares
        carniceria: { xMin: 15, xMax: 200, yMin: 15, yMax: 25 }, // Arriba Izquierda
        pescaderia: { xMin: 15, xMax: 200, yMin: 15, yMax: 25 },
        charcuteria: { xMin: 15, xMax: 20, yMin: 30, yMax: 210 }, // Brazo L Largo
    },
};

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCoordsForStore(section, indexInSection, totalInSection, store) {
    const layout = STORE_ZONES[store];
    const isSpecial = ['Carnicería', 'Pescadería', 'Charcutería'].includes(section);

    if (store === 'SuperA') {
        if (isSpecial) {
            const z = layout[section.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
            return { x: randBetween(z.xMin, z.xMax), y: randBetween(z.yMin, z.yMax) };
        }
        if (layout.organicas && layout.organicas.includes(section)) {
            // Distribuir en las islas de frutas orgánicas 
            // x: 260, 300, 340, 280, 320 ; y: 40, 95, 150
            const xs = [260, 300, 340, 280, 320];
            const ys = [40, 95, 150];
            const px = xs[indexInSection % 5];
            const py = ys[Math.floor((indexInSection % 15) / 5)];
            return { x: px + randBetween(5, 15), y: py + randBetween(5, 25) };
        }

        // Estanterias largas vs cortas (partidas por almacen / pasillo)
        const inLarga = layout.columnsLargas && layout.columnsLargas.find(c => c.categories.includes(section));
        const inCorta = layout.columnsCortas && layout.columnsCortas.find(c => c.categories.includes(section));

        let col, minY = 50, maxY = 190;

        if (inLarga) {
            col = inLarga;
            minY = 45; maxY = 190;
        } else if (inCorta) {
            col = inCorta;
            // Estantes partidos o rebajados por el almacen
            minY = 75; maxY = 190;
            // Hueco horizontal de separación entre estantes cortos (145-160 aprox)
            if (indexInSection % 2 === 0) maxY = 135; // Mitad arriba
            else minY = 165; // Mitad abajo
        } else {
            col = layout.columnsLargas ? layout.columnsLargas[0] : { xMin: 45, xMax: 55 }; // Fallback
        }

        const yRange = maxY - minY;
        const slotH = yRange / Math.max(totalInSection / 2, 1);
        const idx = Math.floor(indexInSection / 2);

        return {
            x: randBetween(col.xMin, col.xMax),
            y: Math.round(minY + (slotH * idx) + (slotH / 2)) // Espaciado vertical proporcional
        };

    } else if (store === 'SuperB') {
        if (isSpecial) {
            const z = layout[section.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")];
            return { x: randBetween(z.xMin, z.xMax), y: randBetween(z.yMin, z.yMax) };
        }
        const col = layout.columns.find(c => c.categories.includes(section)) || layout.columns[1];
        // En B los escalones cambian las max Y
        let maxY = 290;
        if (col.xMin > 200) maxY = 250;
        if (col.xMin > 260) maxY = 200;
        if (col.xMax < 130) maxY = 180; // Las Islas

        const yRange = maxY - 50;
        const slotH = yRange / Math.max(totalInSection, 1);
        return {
            x: randBetween(col.xMin, col.xMax),
            y: Math.round(50 + (slotH * indexInSection) + (slotH / 2))
        };

    } else if (store === 'SuperC') {
        if (isSpecial) {
            const key = section.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const z = layout[key];
            return { x: randBetween(z.xMin, z.xMax), y: randBetween(z.yMin, z.yMax) };
        }
        if (layout.organicas.includes(section)) {
            // Distribuir en las islas de frutas
            // Isletas estan en x=230, 280, 330 ; y=100, 180
            const xs = [230, 280, 330];
            const ys = [100, 180];
            const px = xs[indexInSection % 3];
            const py = ys[Math.floor((indexInSection % 6) / 3)];
            return { x: px + randBetween(5, 25), y: py + randBetween(5, 55) };
        }

        const col = layout.columns.find(c => c.categories.includes(section)) || layout.columns[0];
        const slotH = 150 / Math.max(totalInSection, 1);
        return {
            x: randBetween(col.xMin, col.xMax),
            y: Math.round(50 + (slotH * indexInSection) + (slotH / 2))
        };
    }
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
