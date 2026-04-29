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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "header-glass fixed inset-x-0 top-0 z-[100] border-b border-[rgba(230,230,242,0.05)] transition-all duration-300 ease-out",
        isScrolled ? "header-glass-scrolled shadow-header" : "",
      ].join(" ")}
    >
      <div className="header-blur-layer" aria-hidden="true" />
      <div className="header-container container-1920 relative z-10 flex h-[72px] items-center justify-between px-20">
        <div className="header-brand-nav flex items-center gap-10">
          <Image
            src="/images/logos/cartgram-logo-white.svg"
            alt="Cartgram"
            width={181}
            height={28}
            priority
            className="header-logo-full h-7 w-[181px]"
          />
          <Image
            src="/images/logos/cartgram-logomark-white.svg"
            alt="Cartgram"
            width={181}
            height={28}
            priority
            className="header-logo-mark hidden"
          />

          <nav className="header-nav flex items-center gap-2">
            {navItems.map((item) => (
              <NavButton key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>

        <div className="header-actions flex items-center gap-4">
          <button className="header-menu-button hidden" type="button" aria-label="Открыть меню">
            <span />
            <span />
            <span />
          </button>
          <Button size="small" variant="primary">
            Регистрация
          </Button>
          <a
            href="#hero"
            className="header-login group inline-flex h-10 w-[147px] items-center justify-center gap-2 rounded-[8px] bg-[rgba(230,230,242,0.07)] px-6 text-[16px] font-medium leading-none text-secondary transition-all duration-300 ease-out hover:rounded-[24px] hover:bg-[rgba(230,230,242,0.12)]"
          >
            <LoginIcon className="h-5 w-5" />
            <span>Вход</span>
          </a>
        </div>
      </div>
    </header>
  );
}
