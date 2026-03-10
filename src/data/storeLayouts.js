import superAData from './storeLyouts/superA.json';
import superBData from './storeLyouts/superB.json';
import superCData from './storeLyouts/superC.json';

// --- TRAYKO STORE LAYOUT CONFIGURATIONS ---
// Architectural Blueprint Mode & Waypoint Pathfinding
// Type definitions: 'gondola' | 'wall-shelf' | 'checkout' | 'glass-wall' | 'curved-shelf'

export const STORE_LAYOUTS = {
    SuperA: superAData.SuperA,
    SuperB: superBData.SuperB,
    SuperC: superCData.SuperC
};
