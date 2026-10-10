"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  X, 
  Crop, 
  RotateCw, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  Loader2, 
  Image as ImageIcon,
  Sparkles,
  Maximize2
} from "lucide-react";

export type AspectRatioOption = "1:1" | "4:3" | "16:9" | "3:4" | "free";

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  uploadType?: string; // e.g., 'team', 'ambassador', 'event', 'partner', 'launchpad', 'testimonial'
  defaultAspect?: AspectRatioOption;
  onClose: () => void;
  onCropComplete: (croppedUrl: string) => void;
}

const ASPECT_RATIO_LABELS: { key: AspectRatioOption; label: string; ratio: number | null }[] = [
  { key: "1:1", label: "1:1 (Square)", ratio: 1 / 1 },
  { key: "4:3", label: "4:3 (Card)", ratio: 4 / 3 },
  { key: "16:9", label: "16:9 (Banner)", ratio: 16 / 9 },
  { key: "3:4", label: "3:4 (Portrait)", ratio: 3 / 4 },
  { key: "free", label: "Freeform", ratio: null },
];

export default function ImageCropModal({
  isOpen,
  imageSrc,
  uploadType = "event",
  defaultAspect = "4:3",
  onClose,
  onCropComplete,
}: ImageCropModalProps) {
  const [aspect, setAspect] = useState<AspectRatioOption>(defaultAspect);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Load image when imageSrc changes
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      setImageObj(img);
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    };
  }, [imageSrc]);

  // Set aspect ratio from defaultAspect prop (always respect the caller's choice)
  useEffect(() => {
    setAspect(defaultAspect);
  }, [defaultAspect]);

  // Draw main interactive canvas
  const drawCanvas = useCallback(() => {
    if (!canvasRef.current || !imageObj) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    ctx.save();

    // Center of canvas
    const centerX = width / 2;
    const centerY = height / 2;

    // Move to center, apply offset, zoom, rotation
    ctx.translate(centerX + position.x, centerY + position.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Draw image centered
    ctx.drawImage(
      imageObj,
      -imageObj.width / 2,
      -imageObj.height / 2,
      imageObj.width,
      imageObj.height
    );

    ctx.restore();

    // Calculate Crop Overlay Rectangle
    let cropWidth = width * 0.8;
    let cropHeight = height * 0.8;

    const activeOption = ASPECT_RATIO_LABELS.find((a) => a.key === aspect);
    if (activeOption && activeOption.ratio) {
      const targetRatio = activeOption.ratio;
      if (cropWidth / cropHeight > targetRatio) {
        cropWidth = cropHeight * targetRatio;
      } else {
        cropHeight = cropWidth / targetRatio;
      }
    }

    const cropX = (width - cropWidth) / 2;
    const cropY = (height - cropHeight) / 2;

    // Draw Dark Semi-transparent Overlay outside crop area
    ctx.fillStyle = "rgba(7, 25, 14, 0.65)";
    ctx.fillRect(0, 0, width, cropY); // Top
    ctx.fillRect(0, cropY + cropHeight, width, height - (cropY + cropHeight)); // Bottom
    ctx.fillRect(0, cropY, cropX, cropHeight); // Left
    ctx.fillRect(cropX + cropWidth, cropY, width - (cropX + cropWidth), cropHeight); // Right

    // Draw Crop Border (Brand Green & Gold Corner Accents)
    ctx.strokeStyle = "#389456";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight);
    ctx.setLineDash([]); // Reset line dash

    // Draw Grid Lines inside crop area (rule of thirds)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;

    // Vertical grid lines
    ctx.beginPath();
    ctx.moveTo(cropX + cropWidth / 3, cropY);
    ctx.lineTo(cropX + cropWidth / 3, cropY + cropHeight);
    ctx.moveTo(cropX + (cropWidth * 2) / 3, cropY);
    ctx.lineTo(cropX + (cropWidth * 2) / 3, cropY + cropHeight);

    // Horizontal grid lines
    ctx.moveTo(cropX, cropY + cropHeight / 3);
    ctx.lineTo(cropX + cropWidth, cropY + cropHeight / 3);
    ctx.moveTo(cropX, cropY + (cropHeight * 2) / 3);
    ctx.lineTo(cropX + cropWidth, cropY + (cropHeight * 2) / 3);
    ctx.stroke();

    // Draw Amber Corner Handles
    const handleSize = 14;
    ctx.fillStyle = "#f3ae29";
    ctx.fillRect(cropX - 2, cropY - 2, handleSize, 3);
    ctx.fillRect(cropX - 2, cropY - 2, 3, handleSize);

    ctx.fillRect(cropX + cropWidth - handleSize + 2, cropY - 2, handleSize, 3);
    ctx.fillRect(cropX + cropWidth - 1, cropY - 2, 3, handleSize);

    ctx.fillRect(cropX - 2, cropY + cropHeight - 1, handleSize, 3);
    ctx.fillRect(cropX - 2, cropY + cropHeight - handleSize + 2, 3, handleSize);

    ctx.fillRect(cropX + cropWidth - handleSize + 2, cropY + cropHeight - 1, handleSize, 3);
    ctx.fillRect(cropX + cropWidth - 1, cropY + cropHeight - handleSize + 2, 3, handleSize);

  }, [imageObj, aspect, zoom, rotation, position]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  // Generate cropped blob and upload
  const handleCropAndUpload = async () => {
    if (!imageObj || !canvasRef.current) return;

    setUploading(true);

    try {
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Calculate crop frame dimensions
      let cropWidth = width * 0.8;
      let cropHeight = height * 0.8;

      const activeOption = ASPECT_RATIO_LABELS.find((a) => a.key === aspect);
      if (activeOption && activeOption.ratio) {
        const targetRatio = activeOption.ratio;
        if (cropWidth / cropHeight > targetRatio) {
          cropWidth = cropHeight * targetRatio;
        } else {
          cropHeight = cropWidth / targetRatio;
        }
      }

      const cropX = (width - cropWidth) / 2;
      const cropY = (height - cropHeight) / 2;

      // Create high-res offscreen canvas for final export
      const exportCanvas = document.createElement("canvas");
      exportCanvas.width = cropWidth;
      exportCanvas.height = cropHeight;

      const exportCtx = exportCanvas.getContext("2d");
      if (!exportCtx) throw new Error("Could not create canvas context");

      // Draw active canvas slice onto export canvas
      exportCtx.drawImage(
        canvas,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      // Convert export canvas to Blob
      exportCanvas.toBlob(async (blob) => {
        if (!blob) {
          setUploading(false);
          return;
        }

        // Create File object
        const fileName = `cropped-${uploadType}-${Date.now()}.png`;
        const croppedFile = new File([blob], fileName, { type: "image/png" });

        // FormData for /api/upload
        const formData = new FormData();
        formData.append("file", croppedFile);
        formData.append("type", uploadType);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (response.ok && data.url) {
          onCropComplete(data.url);
          onClose();
        } else {
          alert(data.error || "Failed to upload cropped image");
        }
        setUploading(false);
      }, "image/png", 0.95);

    } catch (err) {
      console.error("Cropping error:", err);
      alert("Error cropping image. Please try again.");
      setUploading(false);
    }
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0c2616] text-white border border-[#1d442a] rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 px-6 border-b border-[#1d442a] flex items-center justify-between bg-[#07190e]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0c2616] border border-[#1d442a] text-[#389456]">
              <Crop size={20} />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-white flex items-center gap-2">
                Crop & Adjust Image
                <span className="text-[11px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-[#1d442a] text-[#f3ae29]">
                  {uploadType}
                </span>
              </h3>
              <p className="text-xs text-[#a3caad] font-mono">
                Select aspect ratio, drag to reposition, and scale image before uploading.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#a3caad] hover:text-white hover:bg-[#1d442a] transition-all"
            aria-label="Close Crop Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          
          {/* Main Interactive Canvas Area */}
          <div className="flex-1 w-full flex flex-col items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-[#1d442a] bg-[#07190e] shadow-inner max-w-full cursor-grab active:cursor-grabbing">
              <canvas
                ref={canvasRef}
                width={560}
                height={380}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="max-w-full h-auto block select-none touch-none"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-[#07190e]/90 border border-[#1d442a] text-[11px] font-mono text-[#a3caad] flex items-center gap-1.5 shadow-md">
                <Maximize2 size={12} className="text-[#f3ae29]" />
                <span>Drag photo to pan position</span>
              </div>
            </div>

            {/* Slider & Quick Controls Bar */}
            <div className="w-full mt-4 p-4 rounded-2xl bg-[#07190e] border border-[#1d442a] flex flex-wrap items-center justify-between gap-4">
              
              {/* Zoom Controls */}
              <div className="flex items-center gap-3 flex-1 min-w-[220px]">
                <ZoomOut size={16} className="text-[#a3caad]" />
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-[#389456] cursor-pointer"
                />
                <ZoomIn size={16} className="text-[#a3caad]" />
                <span className="text-xs font-mono font-bold text-[#f3ae29] min-w-[40px]">
                  {zoom.toFixed(1)}x
                </span>
              </div>

              {/* Rotation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r - 90) % 360)}
                  className="p-2 rounded-xl bg-[#0c2616] border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-all flex items-center gap-1 text-xs font-mono"
                  title="Rotate Left"
                >
                  <RotateCcw size={14} /> -90°
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-2 rounded-xl bg-[#0c2616] border border-[#1d442a] text-[#a3caad] hover:text-white hover:border-[#389456] transition-all flex items-center gap-1 text-xs font-mono"
                  title="Rotate Right"
                >
                  <RotateCw size={14} /> +90°
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setRotation(0);
                    setPosition({ x: 0, y: 0 });
                  }}
                  className="px-3 py-2 rounded-xl bg-[#0c2616] border border-[#1d442a] text-xs font-mono text-slate-300 hover:text-white transition-all"
                >
                  Reset
                </button>
              </div>

            </div>
          </div>

          {/* Controls Sidebar — Aspect Ratio Selection & Presets */}
          <div className="w-full lg:w-72 flex flex-col gap-4">
            
            <div className="p-4 rounded-2xl bg-[#07190e] border border-[#1d442a]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f3ae29] block mb-3">
                Aspect Ratio Presets
              </span>

              <div className="flex flex-col gap-2">
                {ASPECT_RATIO_LABELS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setAspect(option.key)}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      aspect === option.key
                        ? "bg-[#389456] text-white border-[#389456] shadow-md font-bold"
                        : "bg-[#0c2616] text-[#a3caad] border-[#1d442a] hover:border-[#389456] hover:text-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    {aspect === option.key && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="p-4 rounded-2xl bg-[#07190e] border border-[#1d442a] text-xs text-[#a3caad] leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-[#f3ae29] font-semibold font-mono uppercase tracking-wider text-[11px]">
                <Sparkles size={14} /> Recommendation Tip
              </div>
              <p>
                • <strong>Logos / Avatars</strong>: Use 1:1 Square<br />
                • <strong>Cards / Profiles</strong>: Use 4:3 or 3:4<br />
                • <strong>Banners / Hero Slides</strong>: Use 16:9
              </p>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 px-6 border-t border-[#1d442a] bg-[#07190e] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="px-5 py-2.5 rounded-xl bg-[#0c2616] border border-[#1d442a] text-xs font-mono uppercase tracking-wider text-[#a3caad] hover:text-white hover:border-[#389456] transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCropAndUpload}
            disabled={uploading || !imageObj}
            className="px-7 py-3 rounded-xl bg-[#389456] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#2d7a46] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Cropping & Uploading...</span>
              </>
            ) : (
              <>
                <Crop size={16} />
                <span>Crop & Save Image</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
