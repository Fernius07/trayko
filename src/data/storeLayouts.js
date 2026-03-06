// --- TRAYKO STORE LAYOUT CONFIGURATIONS ---
// Architectural Blueprint Mode & Waypoint Pathfinding
// Type definitions: 'gondola' | 'wall-shelf' | 'checkout' | 'glass-wall' | 'curved-shelf'

export const STORE_LAYOUTS = {

    // ────────────────────────────────────────────────────────
    // SUPER A — Plano Basado en Imagen (Real)
    // - Pared noroeste con cámara frigorífica (L-Shape).
    // - Mordisco central por Almacenes.
    // - Izquierda: 5 Pasillos verticales rectos muy largos.
    // - Derecha: Zona "Produce" orgánica con isletas pequeñas al azar.
    // - Abajo izquierda: Línea de Cajas clásica (Batería).
    // ────────────────────────────────────────────────────────
    SuperA: {
        viewBox: '0 0 400 300', // Más apaisado
        entrance: { x: 380, y: 280 }, // Entrada abajo a la derecha
        checkout: { x: 40, y: 280 }, // Salida abajo a la izquierda

        // Muros Exteriores
        // Empieza abajo izq (20,280), sube (20,20), esquina (40,20), recto hasta mordisco del almacen
        outerWall: "M 20 280 L 20 20 L 160 20 L 160 60 L 240 60 L 240 20 L 380 20 L 380 280 L 350 280 M 310 280 L 70 280 M 10 280 L 20 280",

        shelves: [
            // Pared Perimetral Frio (Izquierda y Arriba-izq)
            { type: 'wall-shelf', x: 20, y: 20, width: 140, height: 12 }, // Arriba izq
            { type: 'wall-shelf', x: 20, y: 32, width: 12, height: 180 }, // Lado izq
            { type: 'wall-shelf', x: 368, y: 20, width: 12, height: 100 }, // Esquina Arriba der

            // Los 5 Bloques Verticlaes Larguísimos (Línea Seca)
            { type: 'gondola', x: 45, y: 40, width: 20, height: 160 },
            { type: 'gondola', x: 80, y: 40, width: 20, height: 160 },
            { type: 'gondola', x: 115, y: 40, width: 20, height: 160 },
            { type: 'gondola', x: 150, y: 70, width: 20, height: 130 }, // Más bajo por culpa del almacen

            // Zona Central-Derecha (Góndolas partidas/cortas)
            { type: 'gondola', x: 185, y: 70, width: 20, height: 75 },
            { type: 'gondola', x: 185, y: 160, width: 20, height: 40 },
            { type: 'gondola', x: 220, y: 70, width: 20, height: 75 },
            { type: 'gondola', x: 220, y: 160, width: 20, height: 40 },

            // Zona Derecha (Isletas de Produce/Fresco)
            { type: 'curved-shelf', x: 260, y: 40, width: 25, height: 35 },
            { type: 'curved-shelf', x: 300, y: 40, width: 25, height: 35 },
            { type: 'curved-shelf', x: 340, y: 40, width: 25, height: 35 },
            { type: 'curved-shelf', x: 280, y: 95, width: 25, height: 35 },
            { type: 'curved-shelf', x: 320, y: 95, width: 25, height: 35 },
            { type: 'curved-shelf', x: 260, y: 150, width: 25, height: 35 },
            { type: 'curved-shelf', x: 300, y: 150, width: 25, height: 35 },

            // Cajas (Checkouts batería - Abajo Izquierda)
            { type: 'checkout', x: 30, y: 230, width: 15, height: 30 },
            { type: 'checkout', x: 60, y: 230, width: 15, height: 30 },
            { type: 'checkout', x: 90, y: 230, width: 15, height: 30 },
            { type: 'checkout', x: 120, y: 230, width: 15, height: 30 },
        ],
        zones: [
            { x: 45, y: 40, width: 125, height: 160, color: '#f59e0b', label: 'Línea Seca' },
            { x: 185, y: 70, width: 55, height: 130, color: '#3b82f6', label: 'Bebidas' },
            { x: 260, y: 40, width: 105, height: 145, color: '#22c55e', label: 'Frescos y Orgánicos' },
            { x: 20, y: 20, width: 140, height: 12, color: '#ef4444', label: 'Cámaras Lácteos' }
        ],
        sectionLabels: [
            { x: 50, y: 36, label: 'Despensa / Secos' },
            { x: 265, y: 36, label: 'Isletas Orgánicas/Fruta' },
            { x: 165, y: 18, label: 'ALMACÉN STAFF' }
        ],

        // Navigation Graph
        // Pasillos X: 36, 70, 105, 140, 175, 210, 245
        // Pasillos Y Horizontales: 34 (Arriba izq), 64 (Arriba central), 150 (Medio central), 210 (Abajo general), 270 (Cajas)
        navNodes: {
            // Fila Arriba (T)
            'T1': { x: 36, y: 35 }, 'T2': { x: 70, y: 35 }, 'T3': { x: 105, y: 35 }, 'T4': { x: 140, y: 35 },
            // Fila Arriba-Medio (TM) (Esquiva el almacén)
            'TM1': { x: 175, y: 64 }, 'TM2': { x: 210, y: 64 }, 'TM3': { x: 248, y: 64 },
            // Fila Medio (M) (Corte en las estanterías de la derecha)
            'M1': { x: 175, y: 152 }, 'M2': { x: 210, y: 152 }, 'M3': { x: 248, y: 152 },
            // Fila Abajo (B) - Línea base antes de cajas
            'B1': { x: 36, y: 210 }, 'B2': { x: 70, y: 210 }, 'B3': { x: 105, y: 210 }, 'B4': { x: 140, y: 210 },
            'B5': { x: 175, y: 210 }, 'B6': { x: 210, y: 210 }, 'B7': { x: 248, y: 210 },

            // Red Isletas Orgánicas (Derecha de 245 a 380)
            'O1': { x: 292, y: 35 }, 'O2': { x: 332, y: 35 }, 'O3': { x: 375, y: 35 },
            'O4': { x: 265, y: 80 }, 'O5': { x: 308, y: 80 }, 'O6': { x: 350, y: 80 }, 'O7': { x: 375, y: 80 },
            'O8': { x: 292, y: 135 }, 'O9': { x: 332, y: 135 }, 'O10': { x: 375, y: 135 },
            'O11': { x: 292, y: 210 }, 'O12': { x: 332, y: 210 }, 'O13': { x: 375, y: 210 }, // Base organic

            // Entrada/Salida
            'ENT': { x: 380, y: 280 }, 'OUT': { x: 40, y: 280 },

            // Nodos Pasillo de Cajas Sur
            'S1': { x: 140, y: 270 }, 'S2': { x: 248, y: 270 }, 'S3': { x: 332, y: 270 }
        },
        navEdges: {
            'T1': ['T2', 'B1'], 'T2': ['T1', 'T3', 'B2'], 'T3': ['T2', 'T4', 'B3'], 'T4': ['T3', 'B4', 'TM1'],
            'TM1': ['T4', 'TM2', 'M1'], 'TM2': ['TM1', 'TM3', 'M2'], 'TM3': ['TM2', 'M3', 'O1'],
            'M1': ['TM1', 'M2', 'B5'], 'M2': ['M1', 'TM2', 'M3', 'B6'], 'M3': ['M2', 'TM3', 'B7', 'O8'],

            // Base line before checkouts
            'B1': ['T1', 'B2', 'OUT'], 'B2': ['B1', 'T2', 'B3'], 'B3': ['B2', 'T3', 'B4'], 'B4': ['B3', 'T4', 'B5', 'S1'],
            'B5': ['B4', 'M1', 'B6'], 'B6': ['B5', 'M2', 'B7'], 'B7': ['B6', 'M3', 'O11', 'S2'],

            // Organic mesh
            'O1': ['TM3', 'O2', 'O4'], 'O2': ['O1', 'O3', 'O5'], 'O3': ['O2', 'O7'],
            'O4': ['O1', 'O5', 'O8'], 'O5': ['O4', 'O2', 'O6', 'O9'], 'O6': ['O5', 'O7', 'O9'], 'O7': ['O3', 'O6', 'O10'],
            'O8': ['M3', 'O4', 'O9', 'O11'], 'O9': ['O5', 'O6', 'O8', 'O10', 'O12'], 'O10': ['O7', 'O9', 'O13'],
            'O11': ['B7', 'O8', 'O12'], 'O12': ['O11', 'O9', 'O13', 'S3'], 'O13': ['O12', 'O10', 'ENT'],

            // South line
            'S1': ['B4', 'S2'], 'S2': ['S1', 'B7', 'S3'], 'S3': ['S2', 'O12', 'ENT'],
            'ENT': ['S3', 'O13'], 'OUT': ['B1']
        }
    },

    // ────────────────────────────────────────────────────────
    // SUPER B — Plano 2 (Trapezoidal Diagonales)
    // ────────────────────────────────────────────────────────
    SuperB: {
        viewBox: '0 0 340 380',
        entrance: { x: 300, y: 360 },
        checkout: { x: 60, y: 360 },

        outerWall: "M 10 370 L 10 10 L 330 10 L 270 370 M 230 370 L 150 370 M 110 370 L 10 370",

        shelves: [
            { type: 'wall-shelf', x: 10, y: 10, width: 320, height: 16 }, // Arriba
            { type: 'wall-shelf', x: 10, y: 26, width: 14, height: 320 }, // Izquierd

            { type: 'gondola', x: 45, y: 45, width: 80, height: 50 },  // Island 1
            { type: 'gondola', x: 45, y: 130, width: 80, height: 50 }, // Island 2

            { type: 'gondola', x: 155, y: 45, width: 30, height: 250 }, // Llegar profundo
            { type: 'gondola', x: 210, y: 45, width: 30, height: 210 }, // Menos profundo
            { type: 'gondola', x: 265, y: 45, width: 30, height: 160 }, // Mas corto

            { type: 'checkout', x: 40, y: 310, width: 60, height: 20 },
            { type: 'checkout', x: 110, y: 310, width: 60, height: 20 },
            { type: 'checkout', x: 200, y: 340, width: 25, height: 12 },
        ],

        zones: [
            { x: 40, y: 40, width: 95, height: 150, color: '#0ea5e9', label: 'Congelados' }, // Azul Frio
            { x: 150, y: 40, width: 155, height: 260, color: '#22c55e', label: 'Secos' }, // Verde
        ],
        sectionLabels: [
            { x: 40, y: 35, label: 'Islas Congelador' },
            { x: 150, y: 35, label: 'Alimentación' },
        ],

        navNodes: {
            // Arriba
            'T1': { x: 35, y: 35 }, 'T2': { x: 140, y: 35 }, 'T3': { x: 198, y: 35 }, 'T4': { x: 253, y: 35 }, 'T5': { x: 305, y: 35 },
            // Medio islas (horizontal entre islas L)
            'M1': { x: 35, y: 112 }, 'M2': { x: 140, y: 112 },
            // Abajo de Todo (justo antes de las cajas)
            'B1': { x: 35, y: 285 }, 'B2': { x: 140, y: 285 }, 'B3': { x: 198, y: 265 }, 'B4': { x: 253, y: 215 }, 'B5': { x: 305, y: 215 },
            // Terminal de cajas
            'ENT': { x: 300, y: 360 }, 'OUT': { x: 60, y: 360 },
            // Nodo extra camino a la puerta
            'DOOR_HUB': { x: 250, y: 360 }
        },
        navEdges: {
            'T1': ['T2', 'M1'], 'T2': ['T1', 'T3', 'M2'], 'T3': ['T2', 'T4', 'B3'], 'T4': ['T3', 'T5', 'B4'], 'T5': ['T4', 'B5'],
            'M1': ['T1', 'B1', 'M2'], 'M2': ['T2', 'B2', 'M1'],
            'B1': ['M1', 'B2', 'OUT'], 'B2': ['M2', 'B1', 'B3'], 'B3': ['T3', 'B2', 'B4'], 'B4': ['T4', 'B3', 'DOOR_HUB'], 'B5': ['T5', 'DOOR_HUB'],
            'DOOR_HUB': ['B4', 'B5', 'ENT'], 'ENT': ['DOOR_HUB'], 'OUT': ['B1']
        }
    },

    // ────────────────────────────────────────────────────────
    // SUPER C — Plano 3 (Hipermercado Orgánico L-Shape & Curvas)
    // ────────────────────────────────────────────────────────
    SuperC: {
        viewBox: '0 0 380 340', // Mas ancho y menos alto
        entrance: { x: 340, y: 320 }, // Abajo-Derecha extremo
        checkout: { x: 30, y: 320 },  // Abajo-Izquierda

        outerWall: "M 10 330 L 10 10 L 370 10 L 370 330 L 300 330 M 260 330 L 100 330 M 70 330 L 10 330",

        shelves: [
            { type: 'wall-shelf', x: 10, y: 10, width: 220, height: 16 }, // Arriba izq.
            { type: 'wall-shelf', x: 230, y: 10, width: 140, height: 60 }, // Cuarto frio/Recieving enorme estructural

            // L-Shape block perimetral
            { type: 'gondola', x: 10, y: 26, width: 14, height: 200 }, // Pared izq
            { type: 'gondola', x: 24, y: 212, width: 60, height: 14 }, // Brazo L inferior

            // 3 Pasillos de ultra-larga distancia
            { type: 'gondola', x: 60, y: 45, width: 35, height: 155 },
            { type: 'gondola', x: 110, y: 45, width: 35, height: 155 },
            { type: 'gondola', x: 160, y: 45, width: 35, height: 155 },

            // Zona Produce Orgánico
            { type: 'curved-shelf', x: 230, y: 100, width: 30, height: 60 }, // Isla Frutas 1
            { type: 'curved-shelf', x: 280, y: 100, width: 30, height: 60 }, // Isla Frutas 2
            { type: 'curved-shelf', x: 330, y: 100, width: 30, height: 60 }, // Isla Frutas 3
            { type: 'curved-shelf', x: 230, y: 180, width: 30, height: 60 }, // Isla Verd. 1
            { type: 'curved-shelf', x: 280, y: 180, width: 30, height: 60 }, // Isla Verd. 2
            { type: 'curved-shelf', x: 330, y: 180, width: 30, height: 60 }, // Isla Verd. 3

            { type: 'checkout', x: 30, y: 260, width: 150, height: 15 }, // Super terminal
            { type: 'checkout', x: 200, y: 260, width: 80, height: 15 },
        ],
        zones: [
            { x: 50, y: 40, width: 160, height: 170, color: '#f97316', label: 'Ultramarinos' },
            { x: 220, y: 90, width: 150, height: 160, color: '#16a34a', label: 'Zona Orgánica/Frescos' },
            { x: 230, y: 10, width: 140, height: 60, color: '#64748b', label: 'STOCK / PRIVADO' },
        ],
        sectionLabels: [
            { x: 55, y: 35, label: 'Línea Seca (Pasillos)' },
            { x: 230, y: 85, label: 'Bio / Frescos / Fruta (Islas)' },
        ],

        navNodes: {
            'T1': { x: 42, y: 35 }, 'T2': { x: 102, y: 35 }, 'T3': { x: 152, y: 35 }, 'T4': { x: 205, y: 35 },
            'B1': { x: 42, y: 220 }, 'B2': { x: 102, y: 220 }, 'B3': { x: 152, y: 220 }, 'B4': { x: 205, y: 220 },

            // Red de la zona Orgánica (muchos pasillos entre isletas)
            'O_T1': { x: 220, y: 85 }, 'O_T2': { x: 270, y: 85 }, 'O_T3': { x: 320, y: 85 }, 'O_T4': { x: 370, y: 85 },
            'O_M1': { x: 220, y: 165 }, 'O_M2': { x: 270, y: 165 }, 'O_M3': { x: 320, y: 165 }, 'O_M4': { x: 370, y: 165 },
            'O_B1': { x: 220, y: 245 }, 'O_B2': { x: 270, y: 245 }, 'O_B3': { x: 320, y: 245 }, 'O_B4': { x: 370, y: 245 },

            'ENT': { x: 340, y: 320 }, 'OUT': { x: 30, y: 320 },
            'PRE_C_IZQ': { x: 30, y: 245 }, // Justo encima de cajas izq
        },
        navEdges: {
            'T1': ['T2', 'B1'], 'T2': ['T1', 'T3', 'B2'], 'T3': ['T2', 'T4', 'B3'], 'T4': ['T3', 'B4', 'O_T1'],
            'B1': ['B2', 'T1', 'PRE_C_IZQ'], 'B2': ['B1', 'B3', 'T2'], 'B3': ['B2', 'B4', 'T3'], 'B4': ['B3', 'T4', 'O_M1'],

            // Organic Grid
            'O_T1': ['T4', 'O_T2', 'O_M1'], 'O_T2': ['O_T1', 'O_T3', 'O_M2'], 'O_T3': ['O_T2', 'O_T4', 'O_M3'], 'O_T4': ['O_T3', 'O_M4'],
            'O_M1': ['B4', 'O_T1', 'O_B1', 'O_M2'], 'O_M2': ['O_M1', 'O_T2', 'O_B2', 'O_M3'], 'O_M3': ['O_M2', 'O_T3', 'O_B3', 'O_M4'], 'O_M4': ['O_M3', 'O_T4', 'O_B4'],
            'O_B1': ['O_M1', 'O_B2'], 'O_B2': ['O_B1', 'O_M2', 'O_B3'], 'O_B3': ['O_B2', 'O_M3', 'O_B4'], 'O_B4': ['O_B3', 'O_M4', 'ENT'],

            'PRE_C_IZQ': ['B1', 'OUT'], 'ENT': ['O_B4'], 'OUT': ['PRE_C_IZQ']
        }
    },
};
