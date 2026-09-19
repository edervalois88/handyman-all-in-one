import Image from "next/image";
import Link from "next/link";
import { route } from "@/lib/site";
import type { Locale } from "@/lib/site";

/**
 * The brand lockup. The mark is the brand-book artwork, composited in the
 * wordmark's own condensed workwear face so it stays crisp at any size.
 */
export function Logo({
  locale,
  tone = "ink",
  size = "md",
  linked = true,
}: {
  locale: Locale;
  tone?: "ink" | "cream";
  size?: "sm" | "md" | "lg";
  linked?: boolean;
}) {
  const markSrc = tone === "ink" ? "/brand/mark-navy.png" : "/brand/mark-cream.png";
  const dims = { sm: 30, md: 40, lg: 62 }[size];
  const word = { sm: "text-[1.28rem]", md: "text-[1.6rem]", lg: "text-[2.5rem]" }[size];
  const sub = { sm: "text-[0.5rem]", md: "text-[0.6rem]", lg: "text-[0.82rem]" }[size];
  const color = tone === "ink" ? "text-navy" : "text-cream";

  const inner = (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <Image
        src={markSrc}
        alt=""
        width={Math.round(dims * 0.777)}
        height={dims}
        priority
        className="h-auto w-auto shrink-0"
        style={{ height: dims, width: "auto" }}
      />
      <span className={`flex flex-col ${color}`}>
        <span
          className={`display ${word} leading-[0.85] tracking-[-0.01em]`}
          style={{ fontStretch: "condensed" }}
        >
          HANDYMAN
        </span>
        <span className={`label-lg ${sub} mt-[0.18em] leading-none opacity-90`}>
          All&nbsp;-&nbsp;in&nbsp;-&nbsp;One
        </span>
      </span>
    </span>
  );

  if (!linked) return inner;
  return (
    <Link
      href={route("home", locale)}
      className="inline-flex items-center rounded-sm"
      aria-label={`HandyMan All-in-One — ${locale === "en" ? "home" : "inicio"}`}
    >
      {inner}
    </Link>
  );
}
