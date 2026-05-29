import Link from "next/link";

type AnimatedPopAdProps = {
  badge: string;
  title: string;
  subtext: string;
  ctaText: string;
  ctaHref?: string;
  className?: string;
};

export default function AnimatedPopAd({
  badge,
  title,
  subtext,
  ctaText,
  ctaHref = "/contact",
  className = "",
}: AnimatedPopAdProps) {
  return (
    <div className={`absolute z-30 ${className}`}>
      <div className="animate-pop-ad animate-pop-ad-pulse rounded-2xl border border-[#0066FF]/30 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 shadow-xl w-[160px] sm:w-[182px]">
        <p className="inline-flex items-center rounded-full border border-[#0066FF]/20 bg-[#0066FF]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0066FF]">
          {badge}
        </p>
        <h4 className="mt-2 text-[11px] sm:text-xs font-extrabold text-gray-900 leading-snug">{title}</h4>
        <p className="mt-1 text-[10px] text-gray-500 leading-relaxed">{subtext}</p>
        <Link
          href={ctaHref}
          className="mt-2 inline-block rounded-full bg-[#0066FF] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#0052cc] transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

