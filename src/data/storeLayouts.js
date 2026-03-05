// --- TRAYKO STORE LAYOUT CONFIGURATIONS ---
// Each store has unique shelf positions (for SVG rendering) and unique aisle X positions
// (for the TSP pathfinding algorithm).

export const STORE_LAYOUTS = {
    SuperA: {
        // Classic 4-column grid
        viewBox: '0 0 300 350',
        entrance: { x: 150, y: 330 },
        checkout: { x: 50, y: 330 },
        // Aisle center X positions (used by pathfinding to snap 'exit' from shelf)
        aisleXPositions: [25, 80, 145, 205, 265],
        shelves: [
            // Back wall
            { x: 10, y: 20, width: 280, height: 18 },
            // Aisle 1 (Fruta/Verdura)
            { x: 40, y: 60, width: 28, height: 200 },
            // Aisle 2 (Despensa/Pan)
            { x: 100, y: 60, width: 28, height: 200 },
            // Aisle 3 (Lácteos/Bebidas)
            { x: 160, y: 60, width: 28, height: 200 },
            // Aisle 4 (Higiene)
            { x: 220, y: 60, width: 28, height: 200 },
            // Checkout counters
            { x: 40, y: 280, width: 80, height: 18, accent: true },
            { x: 180, y: 280, width: 80, height: 18, accent: true },
        ],
        sectionLabels: [
            { x: 27, y: 55, label: 'Fruta·Verdura' },
            { x: 87, y: 55, label: 'Pan·Despensa' },
            { x: 147, y: 55, label: 'Lácteos·Beb.' },
            { x: 207, y: 55, label: 'Higiene' },
        ],
    },

    SuperB: {
        // U-shape: 3 wider aisles + rear perimeter shelf (Carnicería/Pescado)
        viewBox: '0 0 300 350',
        entrance: { x: 270, y: 330 },
        checkout: { x: 30, y: 330 },
        aisleXPositions: [30, 100, 160, 220, 280],
        shelves: [
            // Rear perimeter (Carnicería / Pescadería / Charcutería)
            { x: 10, y: 20, width: 280, height: 22 },
            // Left inner wall (Lácteos strip)
            { x: 10, y: 270, width: 280, height: 18 },
            // Aisle A
            { x: 15, y: 60, width: 70, height: 190 },
            // Aisle B
            { x: 115, y: 60, width: 70, height: 190 },
            // Aisle C
            { x: 215, y: 60, width: 70, height: 190 },
            // Checkout
            { x: 10, y: 300, width: 90, height: 18, accent: true },
            { x: 200, y: 300, width: 90, height: 18, accent: true },
        ],
        sectionLabels: [
            { x: 15, y: 18, label: 'Carnicería' },
            { x: 105, y: 18, label: 'Pescadería' },
            { x: 210, y: 18, label: 'Charcutería' },
        ],
    },

    SuperC: {
        // 5 narrow aisles — longer & more compact
        viewBox: '0 0 300 350',
        entrance: { x: 155, y: 330 },
        checkout: { x: 280, y: 330 },
        aisleXPositions: [20, 65, 110, 155, 205, 255, 285],
        shelves: [
            // Back wall
            { x: 10, y: 20, width: 280, height: 16 },
            // 5 narrow aisles
            { x: 10, y: 55, width: 45, height: 195 },
            { x: 75, y: 55, width: 45, height: 195 },
            { x: 145, y: 55, width: 45, height: 195 },
            { x: 210, y: 55, width: 45, height: 195 },
            { x: 265, y: 55, width: 25, height: 195 },
            // Cross-aisle mid-store (Pescadería/Carnicería zone)
            { x: 10, y: 250, width: 280, height: 20 },
            // Checkout
            { x: 230, y: 290, width: 60, height: 18, accent: true },
        ],
        sectionLabels: [
            { x: 10, y: 50, label: 'Fruta' },
            { x: 75, y: 50, label: 'Verdura' },
            { x: 145, y: 50, label: 'Lácteos' },
            { x: 210, y: 50, label: 'Bebidas' },
            { x: 265, y: 50, label: 'Higiene' },
        ],
    },
};
