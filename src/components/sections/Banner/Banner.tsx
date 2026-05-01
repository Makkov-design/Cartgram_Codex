"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { Button } from "@/components/ui/buttons/Button";

export function Banner() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const revealIfVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.86 && rect.bottom > viewportHeight * 0.08) {
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
      { threshold: 0.14 },
    );

    observer.observe(node);
    const frame = window.requestAnimationFrame(revealIfVisible);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="banner-section container-1920 px-20">
      <div className="section-shell banner-shell">
        <article className="banner-card banner-reveal" style={{ "--banner-delay": "0.08s" } as CSSProperties}>
          <div className="banner-card__pattern" aria-hidden="true" />
          <div className="banner-card__line-lights" aria-hidden="true">
            <Image
              className="banner-card__line-lights-desktop"
              src="/images/banner/line-lights-desktop.png"
              alt=""
              fill
              sizes="520px"
            />
            <Image
              className="banner-card__line-lights-mobile"
              src="/images/banner/line-lights-mobile.png"
              alt=""
              fill
              sizes="220px"
            />
          </div>

          <div className="banner-card__inner">
            <div className="banner-card__visual">
              <Image
                className="banner-card__visual-desktop"
                src="/images/banner/banner-visual-desktop.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
              />
              <Image
                className="banner-card__visual-mobile"
                src="/images/banner/banner-visual-mobile.webp"
                alt=""
                fill
                sizes="100vw"
              />
            </div>

            <div className="banner-card__content">
              <h2>
                Запусти магазин в Telegram Mini-App за 5 минут <span>без кода и разработчиков</span>
              </h2>
              <p>
                Всё управление через CRM Cartgram: добавляешь товары и категории — они сразу
                появляются в mini-app, а заказы автоматически поступают в систему.
              </p>
              <Button className="banner-card__button" variant="primary" size="large" icon="arrow">
                Запустить за 5 минут
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
