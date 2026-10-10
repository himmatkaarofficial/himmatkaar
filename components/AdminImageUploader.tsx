"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, Loader2, X, CheckCircle } from "lucide-react";

interface AdminImageUploaderProps {
  label?: string;
  imageUrl: string;
  uploadType?: string;
  defaultAspect?: string; // kept for API compatibility, not used
  onChange: (url: string) => void;
  aspectOptions?: string[]; // kept for API compatibility, not used
  helpText?: string;
}

export default function AdminImageUploader({
  label = "Upload Image",
  imageUrl,
  uploadType = "event",
  onChange,
  helpText = "Select any image — it will upload instantly as-is.",
}: AdminImageUploaderProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadDone, setUploadDone] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          {label}
        </label>
      )}

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">

        {/* Preview */}
        <div className="relative w-20 h-20 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt="Preview" fill className="object-cover" />
              {/* Remove button */}
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

        {/* Upload button area */}
        <div className="flex-1 space-y-1.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleFileSelect}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 border ${
              uploadDone
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-white border-slate-200 text-slate-700 hover:border-[#39894c] hover:text-[#39894c]"
            }`}
          >
            {uploading ? (
              <>
                <Loader2 size={14} className="animate-spin text-[#39894c]" />
                <span>Uploading...</span>
              </>
            ) : uploadDone ? (
              <>
                <CheckCircle size={14} className="text-green-600" />
                <span>Uploaded Successfully!</span>
              </>
            ) : (
              <>
                <Upload size={14} className="text-[#39894c]" />
                <span>{imageUrl ? "Change Image" : "Upload Image"}</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 font-mono">{helpText}</p>
        </div>
      </div>
    </div>
  );
}
