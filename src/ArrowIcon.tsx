// Match the existing desktop glyph footprint without OS font/emoji substitution.
export function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "up" }) {
  const up = direction === "up"
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={up ? "0 0 18.55 20" : "0 0 14.65 20"}
    width={up ? ".9275em" : ".7325em"} height="1em" fill="none" stroke="currentColor"
    strokeWidth="1.2" strokeLinecap="butt" strokeLinejoin="miter" aria-hidden="true" focusable="false"
    style={{ display: "inline-block", verticalAlign: "-.125em", flexShrink: 0 }}>
    <path d={up ? "M9.275 17V3M4.5 7.8 9.275 3 14.05 7.8" : "M3 14 11.5 5.5M7 5.5h4.5V10"} />
  </svg>
}
