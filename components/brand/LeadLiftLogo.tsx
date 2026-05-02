interface Props {
  height?: number;
  className?: string;
}

export function LeadLiftLogo({ height = 28, className }: Props) {
  return (
    <span
      className={"inline-flex items-baseline leading-none select-none " + (className ?? "")}
      aria-label="LeadLift"
      style={{ fontSize: height, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}
    >
      <span className="text-ink">LeadLift</span>
      <span style={{ color: "#0088ca" }}>.</span>
    </span>
  );
}
