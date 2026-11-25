import { useState } from "react";
import { Utensils } from "lucide-react";

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}

export function ResilientImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#edeae3] text-[#5a6260] p-4 text-center ${className}`}
      >
        <Utensils className="w-6 h-6 mb-1.5 text-[#88918e]" strokeWidth={1.75} />
        <span className="text-xs font-medium line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
