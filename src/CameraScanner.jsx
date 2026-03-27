import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import { X, Camera, RefreshCw } from 'lucide-react';

const URL = "https://teachablemachine.withgoogle.com/models/atXEPnBi7/";

export default function CameraScanner({ onClose, onDetect }) {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingCategoryUI, setPendingCategoryUI] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  const canvasContainerRef = useRef(null);
  const modelRef = useRef(null);
  const webcamRef = useRef(null);
  const reqAnimFrameRef = useRef(null);
  const pendingCategoryRef = useRef(null);
  const deniedCategoriesRef = useRef(new Set());

  // 1. Cargar el modelo de IA una sola vez
  useEffect(() => {
    let active = true;
    async function loadModel() {
      try {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        const model = await tmImage.load(modelURL, metadataURL);
        if (!active) return;
        modelRef.current = model;
        setIsModelLoading(false);
      } catch (err) {
        console.error("Model error:", err);
        if (active) setErrorMsg("Error al cargar el modelo de IA.");
      }
    }
    loadModel();
    return () => { active = false; };
  }, []);

  // 2. Iniciar / Reiniciar la cámara cuando cambie el facingMode
  useEffect(() => {
    let active = true;

    async function startCamera() {
      if (isModelLoading || !modelRef.current) return;

      // Reiniciar la lista de denegados explícitamente al abrir la cámara
      deniedCategoriesRef.current.clear();
      pendingCategoryRef.current = null;
      setPendingCategoryUI(null);

      try {
        const isFront = facingMode === "user";
        const webcam = new tmImage.Webcam(400, 400, isFront);

        await webcam.setup({ facingMode: facingMode });

        if (!active) {
          webcam.stop();
          return;
        }
        await webcam.play();
        webcamRef.current = webcam;

        if (canvasContainerRef.current) {
          canvasContainerRef.current.innerHTML = '';
          webcam.canvas.style.width = '100%';
          webcam.canvas.style.height = '100%';
          webcam.canvas.style.objectFit = 'cover';
          canvasContainerRef.current.appendChild(webcam.canvas);
        }

        const loop = async () => {
          if (!active) return;

          webcam.update();

          if (!pendingCategoryRef.current) {
            const preds = await modelRef.current.predict(webcam.canvas);

            if (!active) return;
            setPredictions(preds.map(p => ({
              className: p.className,
              probability: p.probability
            })));

            const bestPrediction = preds.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);
            if (
              bestPrediction.probability > 0.85 &&
              bestPrediction.className !== "Background" &&
              !deniedCategoriesRef.current.has(bestPrediction.className)
            ) {
              pendingCategoryRef.current = bestPrediction.className;
              setPendingCategoryUI(bestPrediction.className);
            }
          }

          reqAnimFrameRef.current = window.requestAnimationFrame(loop);
        };

        reqAnimFrameRef.current = window.requestAnimationFrame(loop);

      } catch (err) {
        console.error("Camera error:", err);
        if (active) setErrorMsg("Error al acceder a la cámara. Verifica los permisos de tu navegador o usa otra cámara.");
      }
    }

    startCamera();

    return () => {
      active = false;
      if (reqAnimFrameRef.current) window.cancelAnimationFrame(reqAnimFrameRef.current);
      if (webcamRef.current) {
        webcamRef.current.stop();
        webcamRef.current = null;
      }
    };
  }, [facingMode, isModelLoading]);

  const bestPred = predictions.length > 0 ? predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current) : null;

  return (
    <div className="absolute inset-0 z-[300] bg-black text-white flex flex-col justify-center animate-fade-in touch-none">
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between">
        <button
          onClick={() => setFacingMode(prev => prev === "environment" ? "user" : "environment")}
          className="bg-gray-800/80 p-3 rounded-xl border border-white/10 hover:bg-gray-700 transition flex items-center gap-2 font-bold text-sm"
        >
          <RefreshCw className="w-5 h-5 text-emerald-400" />
          Alternar Cámara
        </button>
        <button onClick={onClose} className="bg-gray-800/80 p-3 rounded-full hover:bg-gray-700 transition">
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute top-20 left-0 right-0 text-center z-10 pointer-events-none">
        <h2 className="text-2xl font-black mb-1">Escaneo de Producto</h2>
        <p className="text-gray-400 font-medium text-sm">Apunta con la cámara hacia el estante</p>
      </div>

      <div className="relative w-full aspect-[3/4] max-h-[70vh] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl mx-auto flex items-center justify-center border-2 border-gray-800/50">
        {errorMsg ? (
          <div className="text-red-400 text-center p-6 bg-red-900/20 rounded-xl m-4 border border-red-500/30">
            <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
            {errorMsg}
          </div>
        ) : (
          <div ref={canvasContainerRef} className="w-full h-full" />
        )}

        {isModelLoading && !errorMsg && (
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mb-4" />
            <p className="font-bold text-gray-300">Cargando la IA...</p>
          </div>
        )}

        {!isModelLoading && !errorMsg && (
          <div className="absolute inset-8 border-2 border-emerald-500/30 rounded-3xl pointer-events-none">
            <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_15px_#34d399] animate-[scanner_2s_ease-in-out_infinite]" style={{ animation: "scanner 2.5s ease-in-out infinite alternate" }} />
          </div>
        )}
      </div>

      {!isModelLoading && !errorMsg && predictions.length > 0 && !pendingCategoryUI && (
        <div className="absolute bottom-10 left-6 right-6 pointer-events-none">
          <div className="bg-gray-900/80 backdrop-blur border border-white/10 rounded-2xl p-5 shadow-2xl">
            <div className="flex justify-between items-end mb-2">
              <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Detectando...</span>
              <span className="text-emerald-400 text-sm font-black text-right">
                {bestPred.probability > 0.1 ? Math.round(bestPred.probability * 100) + '%' : ''}
              </span>
            </div>
            <p className={`text-2xl font-black transition-colors duration-300 ${bestPred.probability > 0.5 ? 'text-white' : 'text-gray-500'}`}>
              {bestPred.probability > 0.2 ? bestPred.className : 'Buscando...'}
            </p>

            <div className="w-full bg-gray-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-100 ease-out"
                style={{ width: `${Math.round((bestPred.probability || 0) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {pendingCategoryUI && (
        <div className="absolute bottom-8 left-6 right-6 z-[350]">
          <div className="bg-gray-900/95 backdrop-blur-md border border-emerald-500/50 rounded-3xl p-6 shadow-2xl animate-fade-in text-center">
            <h3 className="text-2xl font-black mb-1 text-white">¿Es <span className="text-emerald-400">{pendingCategoryUI}</span>?</h3>
            <p className="text-gray-400 text-sm mb-6">Confirma si he detectado bien la categoría.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  // Add to deny list and resume scanning
                  deniedCategoriesRef.current.add(pendingCategoryUI);
                  pendingCategoryRef.current = null;
                  setPendingCategoryUI(null);
                }}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 text-white transition-all"
              >
                No, buscar otra
              </button>
              <button
                onClick={() => onDetect(pendingCategoryUI)}
                className="flex-1 py-3.5 px-4 rounded-xl font-black bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all"
              >
                Sí, correcto
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scanner { 0% { transform: translateY(0); } 100% { transform: translateY(calc(70vh - 4rem)); } }
      `}} />
    </div>
  );
}
