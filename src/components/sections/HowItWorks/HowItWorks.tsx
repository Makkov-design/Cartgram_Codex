"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const HIW_ASSET = "/images/how-it-works";

const checkItems = [
  "Заказы и статусы обновляются автоматически",
  "Выручка и средний чек считаются в реальном времени",
  "Клиенты и история покупок в одной системе",
  "Склад и остатки списываются без ручной работы",
];

function Badge({
  children,
  icon,
  variant = "violet",
}: {
  children: string;
  icon: "palette" | "finance";
  variant?: "violet" | "mint";
}) {
  return (
    <div className={`hiw-badge hiw-badge--${variant}`}>
      <span className="hiw-badge__icon" aria-hidden="true">
        <Image
          src={`${HIW_ASSET}/${icon === "palette" ? "palette-icon.svg" : "finance-icon.svg"}`}
          alt=""
          width={24}
          height={24}
        />
      </span>
      <span>{children}</span>
    </div>
  );
}

function PhoneDemo() {
  return (
    <div className="hiw-phone" aria-label="Telegram Mini-App demo">
      <div className="hiw-phone__screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hiw-phone__video"
        >
          <source src="/videos/how-it-works-video-1.mp4" type="video/mp4" />
        </video>
      </div>
      <Image
        src={`${HIW_ASSET}/iphone-14-pro.png`}
        alt=""
        width={613}
        height={694}
        sizes="613px"
        className="hiw-phone__frame"
        priority={false}
      />
    </div>
  );
}

function MacBookDemo() {
  return (
    <div className="hiw-macbook" aria-label="Cartgram CRM dashboard demo">
      <div className="hiw-macbook__screen-frame">
        <Image
          src={`${HIW_ASSET}/macbook-screen-body.svg`}
          alt=""
          fill
          sizes="920px"
          className="object-fill"
        />
        <div className="hiw-macbook__display">
          <Image
            src={`${HIW_ASSET}/phone-screen.png`}
            alt="Cartgram CRM dashboard"
            fill
            sizes="840px"
            className="object-cover"
          />
          <div className="hiw-macbook__shade" />
          <div className="hiw-macbook__dots" />
          <button className="hiw-play" type="button" aria-label="Посмотреть демо">
            <Image src={`${HIW_ASSET}/play-button.svg`} alt="" width={112} height={112} />
          </button>
        </div>
        <Image
          src={`${HIW_ASSET}/macbook-notch.svg`}
          alt=""
          width={91}
          height={17}
          className="hiw-macbook__notch"
        />
        <Image
          src={`${HIW_ASSET}/macbook-camera.svg`}
          alt=""
          width={6}
          height={7}
          className="hiw-macbook__camera"
        />
      </div>
      <Image
        src={`${HIW_ASSET}/macbook-body.svg`}
        alt=""
        width={1059}
        height={54}
        className="hiw-macbook__body"
      />
    </div>
  );
}

function CheckCard({ children }: { children: string }) {
  return (
    <div className="hiw-check-card">
      <span className="hiw-check-card__lights" aria-hidden="true" />
      <Image src={`${HIW_ASSET}/check-circle.svg`} alt="" width={24} height={24} />
      <span>{children}</span>
    </div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const revealIfVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.08) {
        node.classList.add("is-ready");
        node.classList.add("is-visible");
        return true;
      }

      return false;
    };

    if (revealIfVisible()) {
      return;
    }

    node.classList.add("is-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    const frame = window.requestAnimationFrame(revealIfVisible);

    window.addEventListener("hashchange", revealIfVisible);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", revealIfVisible);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hiw-section container-1920 px-20">
      <div className="section-shell">
        <header className="hiw-header hiw-reveal">
          <h2>Как работает Cartgram?</h2>
          <p>
            Cartgram — это связка Telegram miniApp для клиентов и CRM для владельца бизнеса.
            <br />
            Покажем, как это работает на реальном примере ↴
          </p>
        </header>

        <div className="hiw-content">
          <article className="hiw-card hiw-card--phone hiw-reveal">
            <div className="hiw-card__pattern hiw-card__pattern--left" aria-hidden="true" />
            <div className="hiw-card__copy">
              <div className="hiw-inner-reveal">
                <Badge icon="palette">Глубокая кастомизация</Badge>
              </div>
              <h3 className="hiw-inner-reveal">
                1. Клиент оформляет заказ{" "}
                <span>в готовом под ваш бизнес</span>{" "}
                <span className="hiw-title-icon" aria-hidden="true">
                  <Image src={`${HIW_ASSET}/telegram-icon.svg`} alt="" width={28} height={28} />
                </span>{" "}
                <span>Telegram Mini-App</span>
              </h3>
              <p className="hiw-inner-reveal">
                Посмотрите, как выглядит путь клиента — от выбора товара до оформления заказа.
              </p>
            </div>

            <div className="hiw-phone-stage hiw-inner-reveal">
              <PhoneDemo />
            </div>
          </article>

          <article className="hiw-card hiw-card--dashboard hiw-reveal">
            <div className="hiw-card__pattern hiw-card__pattern--right" aria-hidden="true" />
            <Image
              src={`${HIW_ASSET}/light-top.svg`}
              alt=""
              width={438}
              height={402}
              className="hiw-card__light hiw-card__light--top"
            />
            <Image
              src={`${HIW_ASSET}/light-bottom.svg`}
              alt=""
              width={486}
              height={402}
              className="hiw-card__light hiw-card__light--bottom"
            />

            <div className="hiw-dashboard-copy">
              <div className="hiw-dashboard-top hiw-inner-reveal">
                <Badge icon="finance" variant="mint">Детальная аналитика</Badge>
                <p>CRM синхронизируется с ботом при каждом заказе.</p>
              </div>

              <h3 className="hiw-inner-reveal">
                <span>2. Все заказы, деньги, клиенты и аналитика</span> — в одном дашборде
              </h3>

              <div className="hiw-check-grid">
                {checkItems.map((item) => (
                  <CheckCard key={item}>{item}</CheckCard>
                ))}
              </div>
            </div>

            <div className="hiw-inner-reveal">
              <MacBookDemo />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
