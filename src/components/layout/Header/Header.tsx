"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttons/Button";
import { LoginIcon } from "@/components/ui/icons/LoginIcon";
import { NavButton } from "./NavButton";

const navItems = [
  { href: "#how-it-works", label: "Как работает" },
  { href: "#features", label: "Функции" },
  { href: "#prices", label: "Стоимость" },
  { href: "#testimonials", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
];

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5 text-[#bebecc]">
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsEntered(true);
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => {
      if (mediaQuery.matches) {
        setIsMenuOpen(false);
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[100] border-b border-[rgba(230,230,242,0.05)] transition-[transform,opacity,background-color,backdrop-filter,box-shadow] duration-700 ease-out",
        "supports-[backdrop-filter]:bg-[rgba(15,15,20,0.35)] supports-[backdrop-filter]:backdrop-blur-md",
        "bg-[rgba(15,15,20,0.85)]",
        isEntered ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        isScrolled
          ? "shadow-[0_8px_24px_rgba(0,0,0,0.25)] supports-[backdrop-filter]:bg-[rgba(15,15,20,0.6)] supports-[backdrop-filter]:backdrop-blur-xl"
          : "",
      ].join(" ")}
    >
      <div className="relative z-10 mx-auto flex h-[72px] max-w-[1920px] items-center justify-between px-5 max-[430px]:px-4 md:px-6 lg:px-20">
        <div
          className={[
            "flex min-w-0 items-center gap-6 transition-all duration-700 ease-out max-[430px]:gap-3 lg:gap-10",
            isEntered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "180ms" }}
        >
          <a href="#hero" aria-label="Вернуться в начало сайта" className="shrink-0">
            <Image
              src="/images/logos/cartgram-logo-white.svg"
              alt="Cartgram"
              width={181}
              height={28}
              priority
              className="hidden h-7 w-[181px] shrink-0 md:block"
            />
            <Image
              src="/images/logos/cartgram-logomark-white.svg"
              alt="Cartgram"
              width={38}
              height={32}
              priority
              className="block h-8 w-[38px] shrink-0 md:hidden"
            />
          </a>

          <nav
            className={[
              "hidden items-center gap-2 transition-all duration-700 ease-out lg:flex",
              isEntered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "260ms" }}
          >
            {navItems.map((item) => (
              <NavButton key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>

        <div
          className={[
            "ml-3 flex shrink-0 items-center gap-2 transition-all duration-700 ease-out max-[430px]:ml-2 max-[430px]:gap-1 sm:gap-4",
            isEntered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "320ms" }}
        >
          <div className="hidden sm:block">
            <Button size="small" variant="primary">
              Регистрация
            </Button>
          </div>
          <a
            href="#hero"
            aria-label="Вход"
            className="group hidden h-10 w-10 items-center justify-center gap-2 rounded-[8px] bg-[rgba(230,230,242,0.07)] text-[16px] font-medium leading-none text-secondary transition-all duration-300 ease-out hover:rounded-[24px] hover:bg-[rgba(230,230,242,0.12)] md:inline-flex md:w-[147px] md:px-6"
          >
            <LoginIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Вход</span>
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Открыть меню"
            className={[
              "inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[8px] bg-[rgba(230,230,242,0.07)] transition-all duration-300 ease-out hover:bg-[rgba(230,230,242,0.12)] max-[430px]:h-9 max-[430px]:w-9 max-[430px]:gap-1 lg:hidden",
              isMenuOpen ? "bg-[rgba(230,230,242,0.14)]" : "",
            ].join(" ")}
          >
            {isMenuOpen ? (
              <CloseIcon />
            ) : (
              <>
                <span className="block h-[2px] w-5 rounded-full bg-[#bebecc] transition-transform duration-300 ease-out" />
                <span className="block h-[2px] w-5 rounded-full bg-[#bebecc] transition-all duration-300 ease-out" />
                <span className="block h-[2px] w-5 rounded-full bg-[#bebecc] transition-transform duration-300 ease-out" />
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className={[
          "fixed inset-x-0 bottom-0 top-[72px] z-0 bg-[rgba(8,8,12,0.7)] transition-opacity duration-300 ease-out lg:hidden",
          "supports-[backdrop-filter]:backdrop-blur-xl",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-navigation"
        className={[
          "fixed inset-x-4 top-[88px] z-10 overflow-hidden rounded-[28px] border border-[rgba(152,203,255,0.14)] bg-[linear-gradient(180deg,rgba(20,22,30,0.98)_0%,rgba(13,14,20,0.96)_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-400 ease-out lg:hidden",
          "supports-[backdrop-filter]:backdrop-blur-2xl",
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(152,203,255,0.9),transparent)]" />
        <div className="pointer-events-none absolute -left-10 top-8 h-28 w-28 rounded-full bg-[rgba(152,203,255,0.12)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-20px] top-20 h-32 w-32 rounded-full bg-[rgba(184,163,255,0.1)] blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 max-[430px]:gap-4 max-[430px]:p-6">
          <div className="border-b border-[rgba(230,230,242,0.08)] pb-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[rgba(152,203,255,0.78)]">
              Navigation
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between gap-4 border-b border-[rgba(230,230,242,0.08)] py-4 transition-colors duration-300 ease-out last:border-b-0 hover:text-white"
                >
                  <span className="text-[22px] font-medium leading-[1.05] tracking-[-0.03em] text-primary transition-transform duration-300 ease-out group-hover:translate-x-[2px]">
                    {item.label}
                  </span>
                  <span className="text-[14px] font-medium leading-none text-[rgba(138,138,153,0.92)] transition-colors duration-300 group-hover:text-[rgba(152,203,255,0.9)]">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full" size="large" variant="primary">
              Регистрация
            </Button>
            <a
              href="#hero"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-[rgba(230,230,242,0.08)] bg-[rgba(230,230,242,0.07)] px-4 text-[16px] font-medium leading-none text-secondary transition-all duration-300 ease-out hover:border-[rgba(152,203,255,0.18)] hover:bg-[rgba(230,230,242,0.12)]"
            >
              <LoginIcon className="h-5 w-5" />
              <span>Вход</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
