"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Crop, Image as ImageIcon, Loader2, X, CheckCircle, AlertCircle, Link2 } from "lucide-react";
import ImageCropModal, { AspectRatioOption } from "./ImageCropModal";

interface AdminImageUploaderProps {
  label?: string;
  imageUrl: string;
  uploadType?: string;
  defaultAspect?: AspectRatioOption;
  onChange: (url: string) => void;
  aspectOptions?: AspectRatioOption[];
  helpText?: string;
}

export default function AdminImageUploader({
  label = "Upload Image",
  imageUrl,
  uploadType = "event",
  defaultAspect = "4:3",
  onChange,
  helpText,
}: AdminImageUploaderProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadDone, setUploadDone] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  // For crop flow
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState<boolean>(false);

  // Two separate file inputs — one for direct, one for crop
  const directInputRef = useRef<HTMLInputElement>(null);
  const cropInputRef = useRef<HTMLInputElement>(null);

  // ── Direct Upload (no crop) ──────────────────────────────────────────────
  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadDone(false);
    setUploadError(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", uploadType);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (res.ok && data.url) {
        onChange(data.url);
        setUploadDone(true);
        setTimeout(() => setUploadDone(false), 2500);
      } else {
        setUploadError(data.error || "Upload failed. Please try again.");
      }
    } catch {
      setUploadError("Upload failed. Please check your connection and try again.");
    } finally {
      setUploading(false);
      if (directInputRef.current) directInputRef.current.value = "";
    }
  };

  // ── Crop Flow — open crop modal after file select ────────────────────────
  const handleCropSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedSrc(reader.result);
        setIsCropOpen(true);
      }
    };
    reader.readAsDataURL(file);

    if (cropInputRef.current) cropInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          {label}
        </label>
      )}

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-4">

        {/* Preview */}
        <div className="relative w-20 h-20 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
          {imageUrl ? (
            <>
              <Image 
                src={imageUrl} 
                alt="Preview" 
                fill 
                unoptimized
                className="object-contain p-1" 
              />
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setUploadDone(false);
                  setUploadError(null);
                }}
                className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all z-10"
                title="Remove image"
              >
                <X size={10} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-300 p-2 text-center">
              <ImageIcon size={18} className="mb-1" />
              <span className="text-[9px] font-mono">No Image</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex-1 space-y-2">

          {/* Hidden file inputs */}
          <input
            ref={directInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/*"
            className="hidden"
            onChange={handleDirectUpload}
          />
          <input
            ref={cropInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/*"
            className="hidden"
            onChange={handleCropSelect}
          />

          {/* Row: Upload + Crop buttons */}
          <div className="flex gap-2">
            {/* Direct Upload Button */}
            <button
              type="button"
              onClick={() => {
                setUploadError(null);
                directInputRef.current?.click();
              }}
              disabled={uploading}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 border ${
                uploadDone
                  ? "bg-green-50 border-green-300 text-green-700"
                  : "bg-white border-slate-200 text-slate-700 hover:border-[#39894c] hover:text-[#39894c]"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 size={13} className="animate-spin text-[#39894c]" />
                  <span>Uploading...</span>
                </>
              ) : uploadDone ? (
                <>
                  <CheckCircle size={13} className="text-green-600" />
                  <span>Uploaded!</span>
                </>
              ) : (
                <>
                  <Upload size={13} className="text-[#39894c]" />
                  <span>{imageUrl ? "Change Image" : "Upload Image"}</span>
                </>
              )}
            </button>

            {/* Crop & Upload Button */}
            <button
              type="button"
              onClick={() => {
                setUploadError(null);
                cropInputRef.current?.click();
              }}
              disabled={uploading}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:border-[#f3ae29] hover:text-[#c98a10] transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Crop size={13} className="text-[#f3ae29]" />
              <span>{imageUrl ? "Crop & Replace" : "Upload & Crop"}</span>
            </button>
          </div>

          {/* Upload Error Banner */}
          {uploadError && (
            <div className="p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
              <AlertCircle size={14} className="shrink-0 text-red-600" />
              <span>{uploadError}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
              {helpText || "Upload PNG, JPG, SVG, WebP"}
            </p>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-[10px] text-[#39894c] font-semibold hover:underline flex items-center gap-1"
            >
              <Link2 size={11} /> {showUrlInput ? "Hide URL input" : "Or paste image URL"}
            </button>
          </div>

          {/* Optional Direct URL Input */}
          {showUrlInput && (
            <div className="pt-1.5">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  onChange(e.target.value);
                  setUploadError(null);
                }}
                placeholder="Paste image URL (e.g. https://... or /partners/logo.png)"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39894c]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Crop Modal */}
      <ImageCropModal
        isOpen={isCropOpen}
        imageSrc={selectedSrc}
        uploadType={uploadType}
        defaultAspect={defaultAspect}
        onClose={() => setIsCropOpen(false)}
        onCropComplete={(croppedUrl) => {
          onChange(croppedUrl);
          setIsCropOpen(false);
          setUploadDone(true);
          setUploadError(null);
          setTimeout(() => setUploadDone(false), 2500);
        }}
      />
    </div>
  );
}
