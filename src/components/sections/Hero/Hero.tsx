"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/buttons/Button";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const demoRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const underlineMaskRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    videoRef.current?.pause();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void videoRef.current?.play();
      return;
    }

    const ctx = gsap.context(() => {
      const decorativeItems = gsap.utils.toArray<HTMLElement>(".hero-decor-enter");
      const frameItems = gsap.utils.toArray<HTMLElement>(".hero-frame-enter");
      const videoGlowItems = gsap.utils.toArray<HTMLElement>(".hero-video-glow-enter");
      const copyItems = [
        badgeRef.current,
        titleRef.current,
        subRef.current,
        actionsRef.current,
      ].filter(Boolean);

      gsap.set(
        [
          ...decorativeItems,
          ...frameItems,
          ...videoGlowItems,
          ...copyItems,
          demoRef.current,
        ],
        { autoAlpha: 0 },
      );
      gsap.set(underlineMaskRef.current, {
        autoAlpha: 0,
        clipPath: "inset(0 100% 0 0)",
      });
      gsap.set(decorativeItems, { y: 16 });
      gsap.set(frameItems, { y: 24 });
      gsap.set(videoGlowItems, { y: 18 });
      gsap.set(copyItems, { y: 26 });
      gsap.set(demoRef.current, { y: 44 });

      const timeline = gsap.timeline({
        delay: 0.12,
        onComplete: () => {
          void videoRef.current?.play();
        },
      });

      timeline
        .to(decorativeItems, {
          y: 0,
          autoAlpha: 1,
          duration: 0.96,
          ease: "power2.out",
          stagger: 0.1,
        })
        .to(
          copyItems,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.78,
            ease: "power2.out",
            stagger: 0.12,
          },
          "-=0.52",
        )
        .to(
          frameItems,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.09,
          },
          "-=0.24",
        )
        .to(
          demoRef.current,
          { y: 0, autoAlpha: 1, duration: 0.88, ease: "power2.out" },
          "-=0.56",
        )
        .to(
          videoGlowItems,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.92,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.22",
        )
        .to(
          underlineMaskRef.current,
          {
            autoAlpha: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.18",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section container-1920 relative isolate px-20 pb-[120px] pt-2"
    >
      <div className="hero-decor-enter hero-pattern absolute inset-x-0 top-0 -z-10 h-[521px]" />
      <div className="hero-decor-enter hero-top-light absolute left-1/2 top-[-190px] h-[502px] w-[910px] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(153,153,255,0.68),rgba(152,203,255,0.6),rgba(161,229,229,0.56))] blur-[180px]" />
      <div className="hero-video-glow-enter hero-center-glow absolute left-1/2 top-[778px] h-[702px] w-[1337px] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(153,153,255,0.26),rgba(152,203,255,0.22),rgba(161,229,229,0.22))] blur-[60px]" />
      <Image
        src="/images/hero/bg-light-top.svg"
        alt=""
        aria-hidden="true"
        width={1337}
        height={254}
        className="hero-video-glow-enter hero-bg-light-top pointer-events-none absolute left-1/2 top-[613px] h-[253.5px] w-[1337px] -translate-x-1/2 opacity-70"
      />
      <Image
        src="/images/hero/bg-light-bottom.svg"
        alt=""
        aria-hidden="true"
        width={657}
        height={286}
        className="hero-video-glow-enter hero-bg-light-bottom pointer-events-none absolute left-1/2 top-[1373px] h-[285.5px] w-[657px] -translate-x-1/2 opacity-70"
      />
      <Image
        src="/images/hero/lights-lines.svg"
        alt=""
        aria-hidden="true"
        width={1687}
        height={1174}
        className="hero-decor-enter hero-lights-lines pointer-events-none absolute left-[31px] top-[-203px] h-[1174px] w-[1687px] opacity-90"
      />

      <div className="hero-shell section-shell relative flex flex-col items-center rounded-[40px] pt-[168px]">
        <div className="flex flex-col items-center gap-10">
          <div
            ref={badgeRef}
            className="hero-copy-enter badge-stroke rounded-full border border-white/15 bg-white/[0.01] px-5 py-3"
          >
            <span className="text-[16px] font-medium leading-none text-primary">
              #1 CRM для e-commerce в Telegram
            </span>
          </div>

          <div className="relative flex flex-col items-center gap-8">
            <h1
              ref={titleRef}
            className="hero-copy-enter hero-title max-w-[1274px] text-center text-[64px] font-medium leading-none text-primary"
            >
              Контролируй все заказы, деньги и клиентов{" "}
              <span className="gradient-text hero-gradient-phrase">
                в единой системе
                <span
                  ref={underlineMaskRef}
                  aria-hidden="true"
                  className="hero-underline-mask pointer-events-none"
                >
                  <Image
                    src="/images/hero/underline.svg"
                    alt=""
                    width={515}
                    height={20}
                    className="h-full w-full max-w-none"
                  />
                </span>
              </span>
            </h1>

            <p
              ref={subRef}
              className="hero-copy-enter hero-subtitle max-w-[960px] text-center text-[20px] leading-[1.4] text-tertiary"
            >
              Cartgram объединяет приём заказов в Telegram, CRM и аналитику.
              <br />
              Без Excel, переписок и потерянных заявок.
            </p>

            <div ref={actionsRef} className="hero-copy-enter hero-actions flex items-center gap-4">
              <Button size="large" variant="primary" icon="arrow">
                Открыть магазин
              </Button>
              <Button
                as="a"
                href="#hero-demo"
                size="large"
                variant="secondary"
              >
                Посмотреть демо
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-frame-enter hero-grid absolute bottom-[-174px] left-1/2 h-[374px] w-[1398px] -translate-x-1/2" />

        <div className="hero-demo-stage relative mt-[140px] pb-[31px]">
          <div className="hero-frame-enter pointer-events-none absolute left-1/2 top-[80px] h-[575px] w-[1657px] -translate-x-1/2 rounded-[32px] bg-white/[0.05] backdrop-blur-[20px]" />
          <div className="hero-frame-enter pointer-events-none absolute left-1/2 top-[40px] h-[655px] w-[1597px] -translate-x-1/2 rounded-[32px] bg-white/[0.05] backdrop-blur-[20px]" />
          <div className="hero-frame-enter pointer-events-none absolute left-1/2 top-0 h-[735px] w-[1531px] -translate-x-1/2 rounded-[32px] bg-white/[0.05] backdrop-blur-[20px]" />

          <div
            ref={demoRef}
            id="hero-demo"
            className="hero-demo-frame relative top-[-40px] h-[815px] w-[1449px] overflow-hidden rounded-[32px] border-[8px] border-white/25 bg-[#1a1a1a] shadow-[0_0_0_1px_rgba(230,230,242,0.08),0_10px_80px_rgba(152,203,255,0.12)]"
          >
            <video
              ref={videoRef}
              data-hero-video
              muted
              playsInline
              preload="auto"
              onEnded={(event) => {
                const node = event.currentTarget;
                node.pause();
              }}
              className="h-full w-full object-cover"
            >
              <source src="/videos/hero-main-video.mp4" type="video/mp4" />
            </video>
            <span className="visually-hidden">Демо-интерфейс Cartgram</span>
          </div>
        </div>
      </div>
    </section>
  );
}
