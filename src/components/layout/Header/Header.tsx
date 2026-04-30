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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEntered, setIsEntered] = useState(false);

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
            width={28}
            height={28}
            priority
            className="block h-7 w-7 shrink-0 md:hidden"
          />

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
            className="group hidden h-10 w-10 items-center justify-center gap-2 rounded-[8px] bg-[rgba(230,230,242,0.07)] text-[16px] font-medium leading-none text-secondary transition-all duration-300 ease-out hover:rounded-[24px] hover:bg-[rgba(230,230,242,0.12)] sm:inline-flex sm:w-[147px] sm:px-6"
          >
            <LoginIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Вход</span>
          </a>
          <button
            type="button"
            aria-label="Открыть меню"
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[8px] bg-[rgba(230,230,242,0.07)] transition-colors duration-300 ease-out hover:bg-[rgba(230,230,242,0.12)] max-[430px]:h-9 max-[430px]:w-9 max-[430px]:gap-1 lg:hidden"
          >
            <span className="block h-[2px] w-5 rounded-full bg-[#bebecc]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#bebecc]" />
            <span className="block h-[2px] w-5 rounded-full bg-[#bebecc]" />
          </button>
        </div>
      </div>
    </header>
  );
}
