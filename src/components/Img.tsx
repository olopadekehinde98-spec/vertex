import { useState } from "react";
import { img, preview, srcSet, type Photo } from "../lib/image";

type Props = {
  photo: Photo;
  className?: string;
  sizes?: string;
  widths?: number[];
  ratio?: number;
  priority?: boolean;
};

/**
 * Full-bleed photograph with a blurred placeholder behind it.
 *
 * Without the placeholder, a stage that hasn't loaded yet renders as a black
 * rectangle — on a site made almost entirely of large photographs that reads as
 * a broken page rather than a loading one.
 */
export function Img({
  photo,
  className = "",
  sizes = "100vw",
  widths = [828, 1280, 1920],
  ratio,
  priority = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="absolute inset-0 overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-0 scale-110 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${preview(photo.id)})`,
          opacity: loaded ? 0 : 1,
        }}
      />
      <img
        src={img(photo.id, 1280, ratio)}
        srcSet={srcSet(photo.id, widths, ratio)}
        sizes={sizes}
        alt={photo.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </span>
  );
}
