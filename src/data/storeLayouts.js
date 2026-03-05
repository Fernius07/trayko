// --- TRAYKO STORE LAYOUT CONFIGURATIONS ---
// Geometry rules:
//  - Aisles are the GAPS between shelf blocks (free walking space).
//  - aisleXPositions = center X of each walkable corridor.
//  - crossYTop / crossYBottom = Y of the horizontal corridors at top & bottom of shelves.
//  - Entrance and checkout are always in clear space (no shelves blocking them).
//  - zones[] define semi-transparent colored floor areas per section.

export const STORE_LAYOUTS = {

    // ─────────────────────────────────────────────
    // SUPER A — 4 shelf columns, classic grid
    //   Corridors at: x≈10(wall), 90, 160, 230, 300(wall)
    //   Top corridor:  y=38 (above shelves)
    //   Bot corridor:  y=272 (below shelves, above checkout area)
    // ─────────────────────────────────────────────
    SuperA: {
        viewBox: '0 0 320 390',
        entrance: { x: 200, y: 370 },   // Bottom-right open zone
        checkout: { x: 60, y: 370 },   // Bottom-left open zone

        // Center X of each free aisle corridor
        aisleXPositions: [10, 90, 160, 230, 305],

        // Y of horizontal crossing corridors (used by pathfinding)
        crossYTop: 36,
        crossYBottom: 272,

        shelves: [
            // ── Back perimeter wall ──
            { x: 10, y: 10, width: 300, height: 14 },

            // ── 4 shelf columns ──  (gap between each = 20px aisle)
            { x: 10, y: 38, width: 60, height: 220 },   // col 1
            { x: 100, y: 38, width: 60, height: 220 },   // col 2
            { x: 170, y: 38, width: 60, height: 220 },   // col 3
            { x: 240, y: 38, width: 60, height: 220 },   // col 4

            // ── Checkout counters (accent) ──
            { x: 10, y: 280, width: 100, height: 16, accent: true },
            { x: 160, y: 280, width: 70, height: 16, accent: true },
        ],

        // Transparent zone overlays (drawn as floor area)
        zones: [
            { x: 10, y: 38, width: 60, height: 220, color: '#22c55e', label: 'Fruta·Verdura' },  // green
            { x: 100, y: 38, width: 60, height: 220, color: '#f59e0b', label: 'Pan·Despensa' },   // amber
            { x: 170, y: 38, width: 60, height: 220, color: '#3b82f6', label: 'Lácteos·Beb.' },   // blue
            { x: 240, y: 38, width: 60, height: 220, color: '#a855f7', label: 'Higiene' },         // purple
        ],

        sectionLabels: [
            { x: 15, y: 34, label: 'Fruta·Verdura' },
            { x: 105, y: 34, label: 'Pan·Despensa' },
            { x: 175, y: 34, label: 'Lácteos·Beb.' },
            { x: 245, y: 34, label: 'Higiene' },
        ],
    },

    // ─────────────────────────────────────────────
    // SUPER B — U-shape: 3 wide aisles + perimeter
    //   Corridors at: x≈5(wall), 95, 175, 255, 315(wall)
    //   Top corridor:  y=52 (below perimeter shelf)
    //   Bot corridor:  y=262 (above checkout area)
    // ─────────────────────────────────────────────
    SuperB: {
        viewBox: '0 0 320 390',
        entrance: { x: 290, y: 370 },  // Right entrance
        checkout: { x: 30, y: 370 },  // Left checkout

        aisleXPositions: [8, 95, 175, 255, 314],

        crossYTop: 52,
        crossYBottom: 262,

        shelves: [
            // ── Rear perimeter (Carnicería / Pescadería / Charcutería) ──
            { x: 10, y: 10, width: 300, height: 28 },

            // ── 3 wide shelf blocks ──
            { x: 10, y: 52, width: 70, height: 205 },   // block A
            { x: 125, y: 52, width: 70, height: 205 },   // block B
            { x: 240, y: 52, width: 70, height: 205 },   // block C

            // ── Checkout counters (accent) ──
            { x: 10, y: 270, width: 90, height: 16, accent: true },
            { x: 210, y: 270, width: 100, height: 16, accent: true },
        ],

        zones: [
            { x: 10, y: 10, width: 100, height: 28, color: '#ef4444', label: 'Carnicería' },
            { x: 110, y: 10, width: 100, height: 28, color: '#06b6d4', label: 'Pescadería' },
            { x: 210, y: 10, width: 100, height: 28, color: '#f97316', label: 'Charcutería' },
            { x: 10, y: 52, width: 70, height: 205, color: '#22c55e', label: 'Fruta' },
            { x: 125, y: 52, width: 70, height: 205, color: '#f59e0b', label: 'Despensa' },
            { x: 240, y: 52, width: 70, height: 205, color: '#3b82f6', label: 'Lácteos' },
        ],

        sectionLabels: [
            { x: 12, y: 8, label: 'Carnicería' },
            { x: 112, y: 8, label: 'Pescadería' },
            { x: 212, y: 8, label: 'Charcutería' },
            { x: 12, y: 49, label: 'Fruta·Verdura' },
            { x: 127, y: 49, label: 'Despensa' },
            { x: 242, y: 49, label: 'Lácteos' },
        ],
    },

    // ─────────────────────────────────────────────
    // SUPER C — 5 narrow aisles, compact
    //   Corridors at: x≈5, 60, 115, 170, 225, 280, 315
    //   Top corridor:  y=38
    //   Bot corridor:  y=255
    // ─────────────────────────────────────────────
    SuperC: {
        viewBox: '0 0 320 390',
        entrance: { x: 160, y: 370 },  // Centre entrance
        checkout: { x: 290, y: 370 },  // Right checkout

        aisleXPositions: [8, 60, 115, 170, 225, 280, 314],

        crossYTop: 36,
        crossYBottom: 256,

        shelves: [
            // ── Back wall ──
            { x: 10, y: 10, width: 300, height: 14 },

            // ── 5 narrow shelf blocks ── (gap=10px aisle)
            { x: 10, y: 36, width: 40, height: 205 },   // col 1
            { x: 65, y: 36, width: 40, height: 205 },   // col 2
            { x: 120, y: 36, width: 40, height: 205 },   // col 3
            { x: 175, y: 36, width: 40, height: 205 },   // col 4
            { x: 230, y: 36, width: 40, height: 205 },   // col 5 (shorter right side)

            // ── No cross-aisle blocker — keeps bottom corridor free ──

            // ── Checkout counter (accent, right side only) ──
            { x: 250, y: 265, width: 60, height: 16, accent: true },
        ],

        zones: [
            { x: 10, y: 36, width: 40, height: 205, color: '#22c55e', label: 'Fruta' },
            { x: 65, y: 36, width: 40, height: 205, color: '#84cc16', label: 'Verdura' },
            { x: 120, y: 36, width: 40, height: 205, color: '#3b82f6', label: 'Lácteos' },
            { x: 175, y: 36, width: 40, height: 205, color: '#06b6d4', label: 'Bebidas' },
            { x: 230, y: 36, width: 40, height: 205, color: '#a855f7', label: 'Higiene' },
        ],

        sectionLabels: [
            { x: 12, y: 32, label: 'Fruta' },
            { x: 67, y: 32, label: 'Verdura' },
            { x: 122, y: 32, label: 'Lácteos' },
            { x: 177, y: 32, label: 'Bebidas' },
            { x: 232, y: 32, label: 'Higiene' },
        ],
    },
};
