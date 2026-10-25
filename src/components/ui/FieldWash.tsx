const glows = [
  { src: "/assets/images/wash/glow-a.svg", className: "field-wash__glow--a", width: 1156, height: 1155 },
  { src: "/assets/images/wash/glow-b.svg", className: "field-wash__glow--b", width: 1415, height: 1297 },
  { src: "/assets/images/wash/glow-c.svg", className: "field-wash__glow--c", width: 1707, height: 1068 },
  { src: "/assets/images/wash/glow-d.svg", className: "field-wash__glow--d", width: 1156, height: 1107 },
] as const;

export function FieldWash() {
  return (
    <div className="field-wash" aria-hidden="true">
      {glows.map((glow) => (
        <img key={glow.src} className={`field-wash__glow ${glow.className}`} src={glow.src} alt="" width={glow.width} height={glow.height} />
      ))}
      <img className="field-wash__dots" src="/assets/images/wash/dots.svg" alt="" width={998} height={1028} />
    </div>
  );
}
