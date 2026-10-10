"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Crop, Image as ImageIcon, Loader2, X, CheckCircle } from "lucide-react";
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
        alert(data.error || "Upload failed. Please try again.");
      }
    } catch {
      alert("Upload failed. Please check your connection and try again.");
    } finally {
      setUploading(false);
      if (directInputRef.current) directInputRef.current.value = "";
    }
  };

  // ── Crop Flow — open crop modal after file select ────────────────────────
  const handleCropSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
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
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleDirectUpload}
          />
          <input
            ref={cropInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleCropSelect}
          />

          {/* Row: Upload + Crop buttons */}
          <div className="flex gap-2">
            {/* Direct Upload Button */}
            <button
              type="button"
              onClick={() => directInputRef.current?.click()}
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
                  <span>{imageUrl ? "Change" : "Upload"}</span>
                </>
              )}
            </button>

            {/* Crop & Upload Button */}
            <button
              type="button"
              onClick={() => cropInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:border-[#f3ae29] hover:text-[#c98a10] transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Crop size={13} className="text-[#f3ae29]" />
              <span>{imageUrl ? "Crop & Replace" : "Upload & Crop"}</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
            {helpText || "Upload as-is  •  OR  •  Upload & Crop to adjust before saving"}
          </p>
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
          setTimeout(() => setUploadDone(false), 2500);
        }}
      />
    </div>
  );
}
