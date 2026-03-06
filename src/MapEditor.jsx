import { useState, useRef, useCallback, useEffect } from 'react';

// ──────────────────────────────────────────────────────
//  TRAYKO — MAP EDITOR (V2: Grid, Select, Drag & Resize)
//  Exporta JSON compatible con storeLayouts.js
// ──────────────────────────────────────────────────────

const TOOLS = [
    { id: 'select', label: '🖱️ Seleccionar', color: '#fff', fillOpacity: 0.1 },
    { id: 'gondola', label: '📦 Góndola', color: '#38bdf8', fillOpacity: 0.5 },
    { id: 'wall-shelf', label: '🧱 Pared Fría', color: '#64748b', fillOpacity: 0.8 },
    { id: 'checkout', label: '🏧 Caja', color: '#3b82f6', fillOpacity: 0.6 },
    { id: 'curved-shelf', label: '🔵 Isleta Redonda', color: '#22c55e', fillOpacity: 0.5 },
    { id: 'navnode', label: '⚫ Nodo Ruta', color: '#f97316', fillOpacity: 1.0 },
    { id: 'navedge', label: '🔗 Conectar Nodos', color: '#facc15', fillOpacity: 1.0 },
    { id: 'entrance', label: '🚪 Entrada', color: '#a855f7', fillOpacity: 1.0 },
    { id: 'checkout_pt', label: '🏁 Salida/Cajas', color: '#ec4899', fillOpacity: 1.0 },
    { id: 'zone', label: '🎨 Zona (Color)', color: '#f59e0b', fillOpacity: 0.15 },
    { id: 'eraser', label: '🗑️ Borrar', color: '#ef4444', fillOpacity: 0.3 },
];

const ZONE_COLORS = ['#f59e0b', '#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#0ea5e9', '#f97316'];

const CANVAS_W = 800;
const CANVAS_H = 600;
// The store viewBox is 400x300, we scale ×2 for editing comfort
const SCALE = 2;
const GRID_SIZE = 5; // Snap grid in store units

export default function MapEditor({ onClose }) {
    const svgRef = useRef(null);

    const [tool, setTool] = useState('select');
    const [shelves, setShelves] = useState([]);
    const [zones, setZones] = useState([]);
    const [navNodes, setNavNodes] = useState({}); // { id: {x,y} }
    const [navEdges, setNavEdges] = useState({}); // { id: [neighborId, ...] }
    const [entrance, setEntrance] = useState(null);
    const [checkoutPt, setCheckoutPt] = useState(null);
    const [zoneColor, setZoneColor] = useState(ZONE_COLORS[0]);
    const [zoneCategory, setZoneCategory] = useState('Fruta');

    // Manipulation state
    const [mode, setMode] = useState('none'); // 'none' | 'drawing' | 'dragging' | 'resizing'
    const [selected, setSelected] = useState(null); // { type: 'shelf'|'zone'|'node'|'entrance'|'checkout', id: index|key }
    const [startPt, setStartPt] = useState(null);
    const [currentRect, setCurrentRect] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeHandle, setResizeHandle] = useState(null); // 'nw'|'ne'|'sw'|'se'
    const [clipboard, setClipboard] = useState(null);

    const [nodeCounter, setNodeCounter] = useState(1);
    const [connectFrom, setConnectFrom] = useState(null);
    const [copied, setCopied] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [importText, setImportText] = useState('');
    const [storeName, setStoreName] = useState('SuperA');
    const [history, setHistory] = useState([]);

    // Utils
    const toStore = (val) => Math.round(val / SCALE);
    const toCanvas = (val) => val * SCALE;
    const snap = (v) => Math.round(v / GRID_SIZE) * GRID_SIZE;

    const getSVGPoint = useCallback((e) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };
        const rect = svg.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: Math.max(0, Math.min(CANVAS_W, clientX - rect.left)),
            y: Math.max(0, Math.min(CANVAS_H, clientY - rect.top)),
        };
    }, []);

    const saveHistory = useCallback(() => {
        setHistory(h => [...h.slice(-19), { shelves, zones, navNodes, navEdges, entrance, checkoutPt }]);
    }, [shelves, zones, navNodes, navEdges, entrance, checkoutPt]);

    const undo = useCallback(() => {
        setHistory(h => {
            if (h.length === 0) return h;
            const prev = h[h.length - 1];
            setShelves(prev.shelves); setZones(prev.zones);
            setNavNodes(prev.navNodes); setNavEdges(prev.navEdges);
            setEntrance(prev.entrance); setCheckoutPt(prev.checkoutPt);
            return h.slice(0, -1);
        });
    }, []);

    // ── Interaction Logic ──────────────────────────────

    const handleMouseDown = useCallback((e) => {
        if (e.button !== 0 && !e.touches) return;
        const pt = getSVGPoint(e);
        const tx = toStore(pt.x);
        const ty = toStore(pt.y);

        // Check if we clicked on a resize handle (if something is selected)
        if (selected) {
            let item;
            if (selected.type === 'shelf') item = shelves[selected.id];
            else if (selected.type === 'zone') item = zones[selected.id];

            if (item) {
                const handleSize = 8 / SCALE;
                const handles = {
                    nw: { x: item.x, y: item.y },
                    ne: { x: item.x + item.width, y: item.y },
                    sw: { x: item.x, y: item.y + item.height },
                    se: { x: item.x + item.width, y: item.y + item.height }
                };
                for (const [pos, h] of Object.entries(handles)) {
                    if (Math.hypot(h.x - tx, h.y - ty) < handleSize * 2) {
                        setMode('resizing');
                        setResizeHandle(pos);
                        setStartPt({ x: tx, y: ty });
                        return;
                    }
                }
            }
        }

        // Check for node selection/connection/dragging (including entrance/checkout)
        let clickedNode = null;
        for (const [id, nd] of Object.entries(navNodes)) {
            if (Math.hypot(nd.x - tx, nd.y - ty) < 8) { clickedNode = id; break; }
        }
        if (!clickedNode && entrance && Math.hypot(entrance.x - tx, entrance.y - ty) < 10) clickedNode = 'entrance';
        if (!clickedNode && checkoutPt && Math.hypot(checkoutPt.x - tx, checkoutPt.y - ty) < 10) clickedNode = 'checkout';

        if (clickedNode) {
            if (tool === 'navedge') {
                if (!connectFrom) setConnectFrom(clickedNode);
                else if (connectFrom !== clickedNode) {
                    saveHistory();
                    setNavEdges(edges => {
                        const updated = { ...edges };
                        updated[connectFrom] = [...(updated[connectFrom] || []).filter(x => x !== clickedNode), clickedNode];
                        updated[clickedNode] = [...(updated[clickedNode] || []).filter(x => x !== connectFrom), connectFrom];
                        return updated;
                    });
                    setConnectFrom(null);
                }
                return;
            }
            if (tool === 'eraser') {
                saveHistory();
                if (clickedNode === 'entrance') { setEntrance(null); return; }
                if (clickedNode === 'checkout') { setCheckoutPt(null); return; }

                setNavNodes(n => { const c = { ...n }; delete c[clickedNode]; return c; });
                setNavEdges(edges => {
                    const updated = {};
                    for (const [id, neigh] of Object.entries(edges)) {
                        if (id !== clickedNode) updated[id] = neigh.filter(nb => nb !== clickedNode);
                    }
                    return updated;
                });
                return;
            }
            setSelected({ type: clickedNode === 'entrance' || clickedNode === 'checkout' ? clickedNode : 'node', id: clickedNode });
            setMode('dragging');
            const targetPos = clickedNode === 'entrance' ? entrance : (clickedNode === 'checkout' ? checkoutPt : navNodes[clickedNode]);
            setDragOffset({ x: tx - targetPos.x, y: ty - targetPos.y });
            return;
        }

        // Select tool or click general
        if (tool === 'select' || tool === 'eraser') {
            // Priority to shelves then zones
            const shelfIdx = shelves.findLastIndex(s => tx >= s.x && tx <= s.x + s.width && ty >= s.y && ty <= s.y + s.height);
            if (shelfIdx !== -1) {
                if (tool === 'eraser') { saveHistory(); setShelves(s => s.filter((_, i) => i !== shelfIdx)); return; }
                setSelected({ type: 'shelf', id: shelfIdx });
                setMode('dragging');
                setDragOffset({ x: tx - shelves[shelfIdx].x, y: ty - shelves[shelfIdx].y });
                return;
            }
            const zoneIdx = zones.findLastIndex(z => tx >= z.x && tx <= z.x + z.width && ty >= z.y && ty <= z.y + z.height);
            if (zoneIdx !== -1) {
                if (tool === 'eraser') { saveHistory(); setZones(z => z.filter((_, i) => i !== zoneIdx)); return; }
                setSelected({ type: 'zone', id: zoneIdx });
                setMode('dragging');
                setDragOffset({ x: tx - zones[zoneIdx].x, y: ty - zones[zoneIdx].y });
                return;
            }
            setSelected(null);
        }

        // Drawing / Placing tools
        if (tool === 'navnode') {
            saveHistory();
            const id = `N${nodeCounter}`;
            setNodeCounter(c => c + 1);
            setNavNodes(n => ({ ...n, [id]: { x: snap(tx), y: snap(ty) } }));
            return;
        }
        if (tool === 'entrance') { saveHistory(); setEntrance({ x: snap(tx), y: snap(ty) }); return; }
        if (tool === 'checkout_pt') { saveHistory(); setCheckoutPt({ x: snap(tx), y: snap(ty) }); return; }

        if (['gondola', 'wall-shelf', 'checkout', 'curved-shelf', 'zone'].includes(tool)) {
            setMode('drawing');
            setStartPt({ x: snap(tx), y: snap(ty) });
            setCurrentRect({ x: pt.x, y: pt.y, width: 0, height: 0 });
        }
    }, [tool, navNodes, connectFrom, nodeCounter, getSVGPoint, saveHistory, shelves, zones, selected]);

    const handleMouseMove = useCallback((e) => {
        if (mode === 'none') return;
        const pt = getSVGPoint(e);
        const tx = toStore(pt.x);
        const ty = toStore(pt.y);

        if (mode === 'drawing' && startPt) {
            const stx = startPt.x;
            const sty = startPt.y;
            const cx = snap(tx);
            const cy = snap(ty);
            setCurrentRect({
                x: toCanvas(Math.min(stx, cx)),
                y: toCanvas(Math.min(sty, cy)),
                width: toCanvas(Math.abs(cx - stx)),
                height: toCanvas(Math.abs(cy - sty)),
            });
        }

        if (mode === 'dragging' && selected) {
            const nx = snap(tx - dragOffset.x);
            const ny = snap(ty - dragOffset.y);
            if (selected.type === 'shelf') {
                setShelves(arr => arr.map((s, i) => i === selected.id ? { ...s, x: nx, y: ny } : s));
            } else if (selected.type === 'zone') {
                setZones(arr => arr.map((z, i) => i === selected.id ? { ...z, x: nx, y: ny } : z));
            } else if (selected.type === 'node') {
                setNavNodes(nds => ({ ...nds, [selected.id]: { x: nx, y: ny } }));
            } else if (selected.type === 'entrance') {
                setEntrance({ x: nx, y: ny });
            } else if (selected.type === 'checkout') {
                setCheckoutPt({ x: nx, y: ny });
            }
        }

        if (mode === 'resizing' && selected && resizeHandle) {
            let arr, setter;
            if (selected.type === 'shelf') { arr = shelves; setter = setShelves; }
            else { arr = zones; setter = setZones; }

            const item = arr[selected.id];
            const nx = snap(tx);
            const ny = snap(ty);

            let newObj = { ...item };
            if (resizeHandle.includes('w')) {
                const right = item.x + item.width;
                newObj.x = Math.min(nx, right - GRID_SIZE);
                newObj.width = right - newObj.x;
            }
            if (resizeHandle.includes('e')) {
                newObj.width = Math.max(GRID_SIZE, nx - item.x);
            }
            if (resizeHandle.includes('n')) {
                const bottom = item.y + item.height;
                newObj.y = Math.min(ny, bottom - GRID_SIZE);
                newObj.height = bottom - newObj.y;
            }
            if (resizeHandle.includes('s')) {
                newObj.height = Math.max(GRID_SIZE, ny - item.y);
            }
            setter(a => a.map((o, i) => i === selected.id ? newObj : o));
        }
    }, [mode, startPt, getSVGPoint, selected, dragOffset, resizeHandle, shelves, zones]);

    const handleMouseUp = useCallback(() => {
        if (mode === 'drawing' && currentRect) {
            const r = currentRect;
            if (r.width >= toCanvas(GRID_SIZE) || r.height >= toCanvas(GRID_SIZE)) {
                saveHistory();
                const obj = { x: toStore(r.x), y: toStore(r.y), width: toStore(r.width), height: toStore(r.height) };
                if (tool === 'zone') setZones(z => [...z, { ...obj, color: zoneColor, label: zoneCategory }]);
                else setShelves(s => [...s, { ...obj, type: tool }]);
            }
        }
        if (mode === 'dragging' || mode === 'resizing') {
            // History was saved on mousedown
        }
        setMode('none');
        setCurrentRect(null);
        setResizeHandle(null);
    }, [mode, currentRect, tool, zoneColor, saveHistory]);

    // ── Export ──────────────────────────────────────────
    const exportJSON = useCallback(() => {
        const edgesClean = {};
        for (const [id, neighs] of Object.entries(navEdges)) { edgesClean[id] = [...new Set(neighs)]; }
        const output = { [storeName]: { viewBox: '0 0 400 300', entrance: entrance || { x: 0, y: 0 }, checkout: checkoutPt || { x: 10, y: 0 }, outerWall: '', shelves, zones, navNodes, navEdges: edgesClean } };
        navigator.clipboard.writeText(JSON.stringify(output, null, 4)).then(() => {
            setCopied(true); setTimeout(() => setCopied(false), 2000);
        });
    }, [storeName, shelves, zones, navNodes, navEdges, entrance, checkoutPt]);

    const handleImport = useCallback(() => {
        try {
            const data = JSON.parse(importText);
            const storeData = Object.values(data)[0] || data; // Take first key blindly
            if (storeData.shelves) setShelves(storeData.shelves);
            if (storeData.zones) setZones(storeData.zones);
            if (storeData.navNodes) setNavNodes(storeData.navNodes);
            if (storeData.navEdges) setNavEdges(storeData.navEdges);
            if (storeData.entrance) setEntrance(storeData.entrance);
            if (storeData.checkout) setCheckoutPt(storeData.checkout);

            // Advance node counter
            if (storeData.navNodes) {
                const maxN = Math.max(0, ...Object.keys(storeData.navNodes).map(k => parseInt(k.replace('N', '')) || 0));
                setNodeCounter(maxN + 1);
            }
            setShowImport(false);
            setImportText('');
        } catch (e) {
            alert('JSON inválido');
        }
    }, [importText]);

    useEffect(() => {
        const h = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selected) {
                // Copy
                if (selected.type === 'shelf') setClipboard({ type: 'shelf', data: { ...shelves[selected.id] } });
                if (selected.type === 'zone') setClipboard({ type: 'zone', data: { ...zones[selected.id] } });
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'v' && clipboard) {
                // Paste
                saveHistory();
                const newObj = { ...clipboard.data, x: clipboard.data.x + GRID_SIZE * 2, y: clipboard.data.y + GRID_SIZE * 2 };
                if (clipboard.type === 'shelf') {
                    setShelves(s => [...s, newObj]);
                    setSelected({ type: 'shelf', id: shelves.length });
                }
                if (clipboard.type === 'zone') {
                    setZones(z => [...z, newObj]);
                    setSelected({ type: 'zone', id: zones.length });
                }
                setClipboard({ type: clipboard.type, data: newObj }); // Update clipboard for multi-paste
            }
            if (e.key === 'Escape') { setConnectFrom(null); setSelected(null); setShowImport(false); }
        };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [undo, selected, clipboard, shelves, zones, saveHistory]);

    return (
        <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col text-white overflow-hidden font-sans">
            {/* TOP BAR */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-b border-gray-700 shrink-0">
                <span className="font-black text-emerald-400 mr-2">🗺️ Trayko MapEditor</span>
                <select value={storeName} onChange={e => setStoreName(e.target.value)} className="bg-gray-800 text-xs rounded border border-gray-600 px-1 py-1">
                    <option>SuperA</option><option>SuperB</option><option>SuperC</option>
                </select>
                <div className="h-4 w-px bg-gray-700 mx-1" />
                <div className="flex flex-wrap gap-1">
                    {TOOLS.map(t => (
                        <button key={t.id} onClick={() => { setTool(t.id); setConnectFrom(null); }} className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tight transition-all ${tool === t.id ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                            {t.label}
                        </button>
                    ))}
                </div>
                {tool === 'zone' && <div className="flex gap-1 items-center ml-2 border-l border-gray-700 pl-2">
                    <input type="text" value={zoneCategory} onChange={e => setZoneCategory(e.target.value)} placeholder="Ej: Carnicería" className="w-24 bg-gray-800 text-xs px-1 text-white border border-gray-600 rounded" />
                    {ZONE_COLORS.map(c => <button key={c} onClick={() => setZoneColor(c)} className={`w-4 h-4 rounded-full ${zoneColor === c ? 'ring-2 ring-white' : ''}`} style={{ background: c }} />)}
                </div>}
                <div className="flex-1" />
                <button onClick={() => setShowImport(!showImport)} className="text-[10px] px-2 py-1 bg-gray-700 rounded font-bold hover:bg-gray-600">📥 IMPORTAR</button>
                <button onClick={undo} className="text-[10px] px-2 py-1 bg-gray-700 rounded font-bold hover:bg-gray-600">↩ UNDO</button>
                <button onClick={exportJSON} className={`text-[10px] px-3 py-1 rounded font-bold ${copied ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-500'}`}>
                    {copied ? '✅ COPIADO' : '📋 EXPORTAR JSON'}
                </button>
                <button onClick={onClose} className="text-[10px] px-2 py-1 bg-red-800 rounded font-bold hover:bg-red-700 ml-1">✕</button>
            </div>

            {/* CANVAS AREA */}
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-auto bg-[#0a0f1e] p-4 flex items-center justify-center relative select-none">
                    <svg ref={svgRef} width={CANVAS_W} height={CANVAS_H} className="bg-[#0f172a] shadow-2xl rounded border border-gray-800"
                        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
                        onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}
                    >
                        <defs>
                            <pattern id="grid-sm" width={GRID_SIZE * SCALE} height={GRID_SIZE * SCALE} patternUnits="userSpaceOnUse">
                                <path d={`M ${GRID_SIZE * SCALE} 0 L 0 0 0 ${GRID_SIZE * SCALE}`} fill="none" stroke="#1e293b" strokeWidth="0.5" />
                            </pattern>
                            <pattern id="grid-lg" width={GRID_SIZE * 5 * SCALE} height={GRID_SIZE * 5 * SCALE} patternUnits="userSpaceOnUse">
                                <rect width={GRID_SIZE * 5 * SCALE} height={GRID_SIZE * 5 * SCALE} fill="url(#grid-sm)" />
                                <path d={`M ${GRID_SIZE * 5 * SCALE} 0 L 0 0 0 ${GRID_SIZE * 5 * SCALE}`} fill="none" stroke="#334155" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-lg)" />

                        {/* Rendering everything */}
                        {zones.map((z, i) => {
                            const isSelected = selected?.type === 'zone' && selected.id === i;
                            return (
                                <g key={`z-${i}`}>
                                    <rect x={toCanvas(z.x)} y={toCanvas(z.y)} width={toCanvas(z.width)} height={toCanvas(z.height)}
                                        fill={z.color} opacity={isSelected ? 0.4 : 0.15} stroke={z.color} strokeWidth={isSelected ? 2 : 1} strokeDasharray={isSelected ? "none" : "4,2"} />
                                    {isSelected && <ResizeHandles item={z} />}
                                </g>
                            );
                        })}

                        {shelves.map((s, i) => {
                            const tc = TOOLS.find(t => t.id === s.type);
                            const isSelected = selected?.type === 'shelf' && selected.id === i;
                            const col = tc?.color || '#fff';
                            return (
                                <g key={`s-${i}`}>
                                    <rect x={toCanvas(s.x)} y={toCanvas(s.y)} width={toCanvas(s.width)} height={toCanvas(s.height)}
                                        fill={col} fillOpacity={isSelected ? 0.7 : tc?.fillOpacity} stroke={col} strokeWidth={isSelected ? 2 : 1}
                                        rx={s.type === 'curved-shelf' ? Math.min(toCanvas(s.width), toCanvas(s.height)) / 2 : 1} />
                                    {isSelected && <ResizeHandles item={s} />}
                                </g>
                            );
                        })}

                        {Object.entries(navEdges).map(([id, neighs]) => neighs.map(nb => {
                            const a = id === 'entrance' ? entrance : (id === 'checkout' ? checkoutPt : navNodes[id]);
                            const b = nb === 'entrance' ? entrance : (nb === 'checkout' ? checkoutPt : navNodes[nb]);
                            return a && b ? <line key={`e-${id}-${nb}`} x1={toCanvas(a.x)} y1={toCanvas(a.y)} x2={toCanvas(b.x)} y2={toCanvas(b.y)} stroke="#facc15" strokeWidth="1" opacity="0.5" strokeDasharray="3,3" /> : null;
                        }))}

                        {Object.entries(navNodes).map(([id, nd]) => (
                            <g key={`n-${id}`}>
                                <circle cx={toCanvas(nd.x)} cy={toCanvas(nd.y)} r={selected?.type === 'node' && selected.id === id ? 7 : 4}
                                    fill={connectFrom === id ? '#fb923c' : '#1e293b'} stroke="#f97316" strokeWidth="2" />
                            </g>
                        ))}

                        {entrance && <g>
                            <circle cx={toCanvas(entrance.x)} cy={toCanvas(entrance.y)} r={selected?.type === 'entrance' ? 9 : 6} fill="#a855f7" stroke={connectFrom === 'entrance' ? '#fb923c' : 'none'} strokeWidth="2" />
                            <text x={toCanvas(entrance.x)} y={toCanvas(entrance.y) - 8} fill="#a855f7" fontSize="8" textAnchor="middle">IN</text>
                        </g>}
                        {checkoutPt && <g>
                            <circle cx={toCanvas(checkoutPt.x)} cy={toCanvas(checkoutPt.y)} r={selected?.type === 'checkout' ? 9 : 6} fill="#ec4899" stroke={connectFrom === 'checkout' ? '#fb923c' : 'none'} strokeWidth="2" />
                            <text x={toCanvas(checkoutPt.x)} y={toCanvas(checkoutPt.y) - 8} fill="#ec4899" fontSize="8" textAnchor="middle">OUT</text>
                        </g>}

                        {/* Preview */}
                        {mode === 'drawing' && currentRect && <rect x={currentRect.x} y={currentRect.y} width={currentRect.width} height={currentRect.height} fill="white" fillOpacity={0.2} stroke="white" strokeDasharray="4,2" />}
                    </svg>

                    {/* Hint overlay */}
                    <div className="absolute top-6 left-6 pointer-events-none opacity-50 bg-black/40 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-widest text-gray-400">
                        {tool} mode · grid: {GRID_SIZE}
                    </div>
                </div>

                <div className="w-48 bg-gray-900 border-l border-gray-800 p-3 overflow-y-auto text-[10px] flex flex-col gap-4">
                    <section>
                        <h4 className="font-bold text-gray-500 mb-2 uppercase tracking-widest">Atajos</h4>
                        <ul className="space-y-1 text-gray-400">
                            <li><b className="text-gray-200">Grid Snap:</b> Auto ({GRID_SIZE})</li>
                            <li><b className="text-gray-200">Drag:</b> Clic y arrastra</li>
                            <li><b className="text-gray-200">Resize:</b> Tiradores esquina</li>
                            <li><b className="text-gray-200">Copiar:</b> Ctrl+C</li>
                            <li><b className="text-gray-200">Pegar:</b> Ctrl+V</li>
                            <li><b className="text-gray-200">Undo:</b> Ctrl+Z</li>
                        </ul>
                    </section>
                    <section>
                        <h4 className="font-bold text-gray-500 mb-2 uppercase tracking-widest">Uso</h4>
                        <p className="text-gray-400">Dibuja estanterías, añade zonas (ponles nombre), coloca nodos e IN/OUT, y conéctalos con la herramienta 🔗.</p>
                    </section>
                </div>
            </div>

            {/* OVERLAY IMPORT JSON */}
            {showImport && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-lg w-[500px] border border-gray-700 shadow-2xl flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-white">Importar JSON de Tienda</h2>
                        <textarea
                            value={importText} onChange={e => setImportText(e.target.value)}
                            className="bg-gray-950 text-gray-300 font-mono text-xs p-3 h-64 rounded border border-gray-800 w-full"
                            placeholder='Pega aquí tu JSON (ej: { "SuperA": { "viewBox": ... } })'
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setShowImport(false)} className="px-4 py-2 rounded text-sm font-bold text-gray-400 hover:text-white">Cancelar</button>
                            <button onClick={handleImport} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded text-sm font-bold shadow">Cargar y Reemplazar Todo</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    function ResizeHandles({ item }) {
        const hSize = 4;
        const pts = [
            { id: 'nw', x: item.x, y: item.y },
            { id: 'ne', x: item.x + item.width, y: item.y },
            { id: 'sw', x: item.x, y: item.y + item.height },
            { id: 'se', x: item.x + item.width, y: item.y + item.height }
        ];
        return (
            <g pointerEvents="none">
                {pts.map(p => <circle key={p.id} cx={toCanvas(p.x)} cy={toCanvas(p.y)} r={hSize} fill="white" stroke="#3b82f6" strokeWidth="1" />)}
            </g>
        );
    }
}

