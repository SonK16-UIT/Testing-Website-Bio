'use client';

import React, { useState, useEffect } from 'react';

interface TimeoutImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
  timeoutMs?: number;
  alt?: string;
  className?: string;
}

export default function TimeoutImage({
  src,
  fallbackSrc,
  timeoutMs = 2500,
  alt = 'Image content',
  className = '',
  ...props
}: TimeoutImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    // Strict frontend timeout using AbortController
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    async function loadImageWithTimeout() {
      if (!src) {
        if (isMounted) {
          setImageSrc(fallbackSrc);
          setIsLoading(false);
        }
        return;
      }

      // If it's a local static asset (starts with '/'), load directly without fetch overhead
      if (src.startsWith('/')) {
        if (isMounted) {
          setImageSrc(src);
          setIsLoading(false);
        }
        clearTimeout(timeoutId);
        return;
      }

      try {
        const response = await fetch(src, { signal, method: 'GET', mode: 'cors' });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setImageSrc(objectUrl);
          setIsLoading(false);
        }
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          console.warn(`[TimeoutImage] Request aborted after ${timeoutMs}ms. Serving fallback asset.`);
        } else {
          console.warn('[TimeoutImage] Image fetch failed:', err.message);
        }

        if (isMounted) {
          setHasError(true);
          setImageSrc(fallbackSrc);
          setIsLoading(false);
        }
      }
    }

    setIsLoading(true);
    setHasError(false);
    loadImageWithTimeout();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [src, fallbackSrc, timeoutMs]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated Skeleton Loader during fetch/timeout countdown */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-[var(--primary-accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setImageSrc(fallbackSrc);
            }
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          {...props}
        />
      )}
    </div>
  );
}
