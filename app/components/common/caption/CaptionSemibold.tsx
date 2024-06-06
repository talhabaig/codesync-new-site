export function Caption1Semibold({
    children,
    className,
    upperCase,
    style,
  }: {
    children: React.ReactNode;
    className?: string;
    upperCase?: boolean;
    style?: React.CSSProperties;
  }) {
    const uppercaseClass = upperCase ? "uppercase" : "";
    return (
      <span
        className={`${uppercaseClass} ${className}`}
        style={{
          
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "24px",
          letterSpacing: "0em",
        }}
      >
        {children}
      </span>
    );
  }
  