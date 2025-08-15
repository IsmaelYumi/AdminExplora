import Link from "next/link";

export default function Card({ color, title, subtitle, href = "#", iconName }) {
  const label = subtitle ? `${title} ${subtitle}` : title;

  return (
    <Link
      href={href}
      aria-label={label}
      className={[
        "tap-highlight group rounded-3xl p-8",
        color,
        "text-white shadow-tile link-plain",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "transition-all duration-200 ease-out active:scale-[.99]",
        "hover:scale-[1.02] hover:shadow-xl hover:brightness-105",
        "flex flex-col items-center justify-center gap-3",
        "min-h-[220px] sm:min-h-[260px]"
      ].join(" ")}
    >
      <div className="leading-none">
        <i className={`bi bi-${iconName} text-3xl sm:text-4xl`} aria-hidden="true" />
      </div>

      <div className="text-center leading-tight">
        <div className="text-xl font-extrabold">{title}</div>
        {subtitle && <div className="text-lg font-semibold">{subtitle}</div>}
      </div>
    </Link>
  );
}
