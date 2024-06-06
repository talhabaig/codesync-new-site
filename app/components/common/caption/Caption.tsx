export function Caption ({
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
        fontWeight: "400",
        lineHeight: "24px",
        letterSpacing: "0em",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
