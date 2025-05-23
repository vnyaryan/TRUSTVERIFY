"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
  objectFit?: "cover" | "contain" | "fill"
  objectPosition?: string
}

export function ResponsiveImage({
  src,
  alt,
  className,
  fallbackSrc = "/abstract-colorful-swirls.png",
  objectFit = "cover",
  objectPosition = "center",
  ...props
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : fallbackSrc)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    // Reset state when src changes
    if (typeof src === "string") {
      setImgSrc(src)
      setIsError(false)
    }
  }, [src])

  const handleError = () => {
    if (!isError) {
      console.error(`Failed to load image: ${src}`)
      setImgSrc(fallbackSrc)
      setIsError(true)
    }
  }

  return (
    <div className={cn("relative overflow-hidden w-full h-full", className)}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        {...props}
        onError={handleError}
        unoptimized
        className={cn(`object-${objectFit} w-full h-full`, props.className)}
        style={{
          objectPosition: objectPosition,
          ...(props.style || {}),
        }}
      />
    </div>
  )
}
