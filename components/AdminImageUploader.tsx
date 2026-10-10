"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Crop, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import ImageCropModal, { AspectRatioOption } from "./ImageCropModal";

interface AdminImageUploaderProps {
  label?: string;
  imageUrl: string;
  uploadType?: string; // 'team', 'ambassador', 'event', 'partner', 'launchpad', 'testimonial', 'blog'
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
  helpText = "Click 'Upload & Crop Image' to select, adjust ratio, crop, and save.",
}: AdminImageUploaderProps) {
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Reset file input so user can pick the same file again if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-body">
          {label}
        </label>
      )}

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
        
        {/* Preview Frame */}
        <div className="relative w-28 h-24 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-contain p-1"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <ImageIcon size={20} className="mb-1 text-slate-300" />
              <span className="text-[10px] font-mono">No Image</span>
            </div>
          )}
        </div>

        {/* Upload & Crop Buttons */}
        <div className="flex-1 w-full space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
            className="hidden"
            onChange={handleFileSelect}
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-[#39894c] hover:text-[#39894c] transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload size={14} className="text-[#39894c]" />
                  <Crop size={14} className="text-[#f3ae29]" />
                  <span>{imageUrl ? "Change & Crop Image" : "Upload & Crop Image"}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[10px] text-slate-500 font-mono">
            {helpText}
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
        }}
      />
    </div>
  );
}
