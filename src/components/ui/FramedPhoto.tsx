import Image, { type ImageProps } from "next/image";

export type FrameCrop = {
  left: string;
  top: string;
  width: string;
  height: string;
};

type FramedPhotoProps = Omit<ImageProps, "style" | "fill" | "quality"> & {
  crop: FrameCrop;
};

export function FramedPhoto({ crop, alt, ...props }: FramedPhotoProps) {
  return (
    <Image
      {...props}
      alt={alt}
      quality={90}
      className="photo-frame"
      style={{
        position: "absolute",
        maxWidth: "none",
        objectFit: "fill",
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height,
      }}
    />
  );
}
