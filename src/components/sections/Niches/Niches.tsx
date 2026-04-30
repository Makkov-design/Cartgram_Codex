"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type NicheCardData = {
  title: string;
  description: string;
  image: string;
  glow: string;
  badges: string[];
};

const topNiches: NicheCardData[] = [
  {
    title: "🛍 Торговля и e-commerce",
    description:
      "Автоматический прием заказов в Telegram, учет склада, аналитика продаж и база клиентов без ручной обработки",
    image: "/images/niches/niche-ecommerce.png",
    glow: "#98cbff",
    badges: ["Интернет-магазины", "Instagram-шопы", "Telegram-продажи"],
  },
  {
    title: "💄 Бьюти и FMCG",
    description: "Быстрое оформление заказов, контроль остатков и повторные продажи через рассылки",
    image: "/images/niches/niche-beauty.png",
    glow: "#f199ff",
    badges: ["Косметика", "Парфюмерия", "Уход", "FMCG"],
  },
  {
    title: "📦 Опт и производство",
    description: "Контроль заказов, клиентов и денежных потоков без Excel и разрозненных таблиц",
    image: "/images/niches/niche-wholesale.png",
    glow: "#ffbd99",
    badges: ["Оптовые клиенты", "Партии", "Регулярные заказы"],
  },
];

const bottomNiches: NicheCardData[] = [
  {
    title: "🎓 Инфобизнес и эксперты",
    description:
      "Заявки, оплаты, база клиентов и автоматические напоминания — для курсов, консультаций и онлайн-продуктов.",
    image: "/images/niches/niche-education.png",
    glow: "#f7ff8d",
    badges: ["Курсы", "Консультации", "Наставничество"],
  },
  {
    title: "🚀 Малый бизнес и стартапы",
    description:
      "Запуск продаж без сайта и сложной инфраструктуры. Быстрое подключение и полный контроль заказов с первого дня.",
    image: "/images/niches/niche-startups.png",
    glow: "#99ffaf",
    badges: ["Проекты без сайта и сложной IT-инфраструктуры"],
  },
  {
    title: "🛠 Услуги и сервисы",
    description:
      "Прием заявок, статусы заказов, база клиентов и уведомления — всё в одной системе для сервисных компаний.",
    image: "/images/niches/niche-services.png",
    glow: "#576dff",
    badges: ["Студии", "Мастера", "Сервисные компании"],
  },
];

function NicheCard({ title, description, image, glow, badges }: NicheCardData) {
  return (
    <article className="niches-card" style={{ "--niche-glow": glow } as CSSProperties}>
      <div className="niches-card__image-shell">
        <div className="niches-card__image-frame">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 600px) 104px, (max-width: 900px) 128px, 140px"
            className="niches-card__image"
          />
        </div>
      </div>

      <div className="niches-card__copy">
        <div className="niches-card__heading">
          <h3>{title}</h3>
          <div className="niches-card__badges">
            {badges.map((badge) => (
              <span key={badge} className="niches-card__badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <p>{description}</p>
      </div>

      <div className="niches-card__lights" aria-hidden="true" />
    </article>
  );
}

export function Niches() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topViewportRef = useRef<HTMLDivElement | null>(null);
  const bottomViewportRef = useRef<HTMLDivElement | null>(null);
  const topTrackRef = useRef<HTMLDivElement | null>(null);
  const bottomTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const revealIfVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.08) {
        node.classList.add("is-ready", "is-visible");
        return true;
      }

      return false;
    };

    if (!revealIfVisible()) {
      node.classList.add("is-ready");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(node);
    const revealFrame = window.requestAnimationFrame(revealIfVisible);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 601px)", () => {
      const topViewport = topViewportRef.current;
      const bottomViewport = bottomViewportRef.current;
      const topTrack = topTrackRef.current;
      const bottomTrack = bottomTrackRef.current;

      if (!topViewport || !bottomViewport || !topTrack || !bottomTrack) {
        return undefined;
      }

      const getTopTravel = () =>
        Math.min(500, Math.max(0, topTrack.scrollWidth - topViewport.clientWidth));
      const getBottomTravel = () =>
        Math.min(500, Math.max(0, bottomTrack.scrollWidth - bottomViewport.clientWidth));

      const topTween = gsap.to(topTrack, {
        x: () => -getTopTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: node,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const bottomTween = gsap.to(bottomTrack, {
        x: () => getBottomTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: node,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      window.requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        topTween.scrollTrigger?.kill();
        bottomTween.scrollTrigger?.kill();
        topTween.kill();
        bottomTween.kill();
      };
    });

    return () => {
      window.cancelAnimationFrame(revealFrame);
      observer.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="niches-section container-1920 px-20">
      <div className="niches-bg-pattern niches-reveal" aria-hidden="true" style={{ "--niches-delay": "0s" } as CSSProperties} />
      <div className="niches-bg-light niches-reveal" aria-hidden="true" style={{ "--niches-delay": "0.08s" } as CSSProperties} />
      <div className="section-shell">
        <div className="niches-header">
          <h2 className="niches-title niches-reveal" style={{ "--niches-delay": "0.04s" } as CSSProperties}>
            Cartgram подходит для любого бизнеса,{" "}
            <span className="niches-title__muted">где есть заказы и движение денег</span>
          </h2>
          <div
            className="niches-description niches-reveal"
            style={{ "--niches-delay": "0.12s" } as CSSProperties}
          >
            <p>Неважно, что вы продаете — товары или услуги.</p>
            <p>Если у вас есть заявки, оплаты и клиенты, Cartgram берёт это под контроль.</p>
          </div>
        </div>

        <div className="niches-desktop">
          <div
            ref={topViewportRef}
            className="niches-row-viewport niches-row-viewport--top niches-reveal"
            style={{ "--niches-delay": "0.2s" } as CSSProperties}
          >
            <div ref={topTrackRef} className="niches-row-track niches-row-track--top">
              {topNiches.map((item) => (
                <NicheCard key={item.title} {...item} />
              ))}
            </div>
          </div>

          <div
            ref={bottomViewportRef}
            className="niches-row-viewport niches-row-viewport--bottom niches-reveal"
            style={{ "--niches-delay": "0.28s" } as CSSProperties}
          >
            <div ref={bottomTrackRef} className="niches-row-track niches-row-track--bottom">
              {bottomNiches.map((item) => (
                <NicheCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>

        <div className="niches-mobile niches-reveal" style={{ "--niches-delay": "0.2s" } as CSSProperties}>
          <div className="niches-mobile__scroller">
            {[...topNiches, ...bottomNiches].map((item) => (
              <div key={item.title} className="niches-mobile__slide">
                <NicheCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
