"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TeamCardImageProps {
  src?: string;
  alt: string;
  name: string;
  sizes?: string;
}

export function getFallbackImage(name: string): string {
  const lowerName = (name || "").toLowerCase();
  
  if (lowerName.includes("usman") || lowerName.includes("salman")) {
    return "/team/founder.jpeg";
  }
  if (lowerName.includes("hafsa") || lowerName.includes("co-founder") || lowerName.includes("cofounder")) {
    return "/team/cofounder.png";
  }
  if (
    lowerName.includes("wajeeh") || 
    lowerName.includes("creative") || 
    lowerName.includes("graphics") || 
    lowerName.includes("managing")
  ) {
    return "/team/creative-lead.png";
  }
  if (lowerName.includes("sipehre")) {
    return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("aimen")) {
    return "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("frasat")) {
    return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("ayesha")) {
    return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("hamza")) {
    return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("fatima")) {
    return "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("bilal")) {
    return "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80";
  }
  
  return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
}

export default function TeamCardImage({ src, alt, name, sizes = "400px" }: TeamCardImageProps) {
  const fallback = getFallbackImage(name);
  
  // Determine initial image URL
  const initial = src && src.trim() !== "" ? src : fallback;
  const [currentSrc, setCurrentSrc] = useState(initial);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextSrc = src && src.trim() !== "" ? src : fallback;
    setCurrentSrc(nextSrc);
    setHasError(false);
  }, [src, fallback]);

  return (
    <Image
      src={hasError ? fallback : currentSrc}
      alt={alt || name}
      fill
      unoptimized
      className="object-cover"
      sizes={sizes}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}
