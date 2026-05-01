"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { Button } from "@/components/ui/buttons/Button";

type StepItem = {
  title: string;
  description: string;
};

const steps: StepItem[] = [
  {
    title: "Зарегистрируйтесь в Cartgram, выберите тариф и активируйте доступ",
    description:
      "Создайте аккаунт за минуту, оплатите тариф и сразу получите доступ к системе.",
  },
  {
    title: "Создайте Telegram Mini-App в 1 клик",
    description:
      "Mini-App автоматически подключится к системе и будет готов к запуску магазина.",
  },
  {
    title: "Настройте магазин под себя, добавьте товары в CRM",
    description:
      "Название, оформление, способы доставки и каталог сразу появятся внутри mini-app.",
  },
  {
    title: "Отправьте ссылку клиентам и начните продажи - магазин запущен!",
    description:
      "Рассылка, пост или реклама - и первые заказы уже поступают в CRM Cartgram.",
  },
];

const desktopDigits = {
  1: "/images/steps/number-1-desktop.svg",
  2: "/images/steps/number-2-desktop.svg",
  3: "/images/steps/number-3-desktop.svg",
} as const;

const mobileDigits = {
  1: "/images/steps/number-1-mobile.svg",
  2: "/images/steps/number-2-mobile.svg",
  3: "/images/steps/number-3-mobile.svg",
} as const;

const desktopDigitSizes = {
  1: { width: 5, height: 20 },
  2: { width: 14, height: 19 },
  3: { width: 14, height: 20 },
} as const;

const mobileDigitSizes = {
  1: { width: 3, height: 15 },
  2: { width: 11, height: 15 },
  3: { width: 10, height: 15 },
} as const;

function StepHexagon({
  done = false,
  mobile = false,
  step,
}: {
  done?: boolean;
  mobile?: boolean;
  step: 1 | 2 | 3 | 4;
}) {
  const suffix = mobile ? "mobile" : "desktop";

  return (
    <span className={`steps-hex${mobile ? " steps-hex--mobile" : ""}`} aria-hidden="true">
      <Image
        className="steps-hex__stroke steps-hex__stroke--outer"
        src={`/images/steps/stroke-outer-${suffix}.svg`}
        alt=""
        fill
        sizes="96px"
      />
      <Image
        className="steps-hex__stroke steps-hex__stroke--inner"
        src={`/images/steps/stroke-inner-${suffix}.svg`}
        alt=""
        fill
        sizes="82px"
      />
      <Image
        className="steps-hex__light"
        src={`/images/steps/number-light-${suffix}.svg`}
        alt=""
        fill
        sizes="56px"
      />

      {done ? (
        <>
          <Image
            className="steps-hex__bg"
            src={`/images/steps/number-bg-4-${suffix}.svg`}
            alt=""
            fill
            sizes="72px"
          />
          <Image
            className="steps-hex__check"
            src={`/images/steps/check-fill-${suffix}.svg`}
            alt=""
            width={mobile ? 22 : 27}
            height={mobile ? 16 : 20}
          />
        </>
      ) : (
        <>
          <Image
            className="steps-hex__bg"
            src={`/images/steps/number-bg-1-${suffix}.svg`}
            alt=""
            fill
            sizes="72px"
          />
          <Image
            className={`steps-hex__digit steps-hex__digit--${step}`}
            src={mobile ? mobileDigits[step as 1 | 2 | 3] : desktopDigits[step as 1 | 2 | 3]}
            alt=""
            width={
              mobile
                ? mobileDigitSizes[step as 1 | 2 | 3].width
                : desktopDigitSizes[step as 1 | 2 | 3].width
            }
            height={
              mobile
                ? mobileDigitSizes[step as 1 | 2 | 3].height
                : desktopDigitSizes[step as 1 | 2 | 3].height
            }
          />
        </>
      )}
    </span>
  );
}

function DesktopStepCard({
  item,
  step,
}: {
  item: StepItem;
  step: 1 | 2 | 3 | 4;
}) {
  const isFinal = step === 4;
  const line =
    step === 1 ? "/images/steps/line-1-desktop.svg" : "/images/steps/line-2-desktop.svg";

  return (
    <article
      className={`steps-card${isFinal ? " steps-card--final" : ""}${
        step === 1 ? " steps-card--with-action" : ""
      }`}
    >
      {isFinal ? (
        <Image
          className="steps-card__effect"
          src="/images/steps/last-step-effect-desktop.png"
          alt=""
          fill
          sizes="360px"
        />
      ) : null}

      <div className="steps-card__top">
        <StepHexagon step={step} done={isFinal} />
        {!isFinal ? (
          <span className="steps-card__line" aria-hidden="true">
            <Image src={line} alt="" fill sizes="180px" />
          </span>
        ) : null}
      </div>

      <div className="steps-card__copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      {step === 1 ? (
        <div className="steps-card__action">
          <Button className="steps-card__button" size="large" icon="arrow">
            Создать магазин
          </Button>
        </div>
      ) : null}
    </article>
  );
}

function MobileStepCard({
  item,
  step,
}: {
  item: StepItem;
  step: 1 | 2 | 3 | 4;
}) {
  const isFinal = step === 4;

  return (
    <article className={`steps-mobile-card${isFinal ? " steps-mobile-card--final" : ""}`}>
      {isFinal ? (
        <Image
          className="steps-mobile-card__effect"
          src="/images/steps/last-step-effect-mobile.png"
          alt=""
          fill
          sizes="358px"
        />
      ) : null}

      <div className="steps-mobile-card__top">
        <StepHexagon step={step} done={isFinal} mobile />
        <h3>{item.title}</h3>
      </div>

      <p>{item.description}</p>

      {step === 1 ? (
        <Button className="steps-mobile-card__button" size="large" icon="arrow">
          Создать магазин
        </Button>
      ) : null}
    </article>
  );
}

export function Steps() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const revealIfVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.84 && rect.bottom > viewportHeight * 0.08) {
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
      { threshold: 0.12 },
    );

    observer.observe(node);
    const frame = window.requestAnimationFrame(revealIfVisible);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="steps-section container-1920 px-20">
      <div className="section-shell steps-shell">
        <div
          className="steps-pattern steps-reveal"
          aria-hidden="true"
          style={{ "--steps-delay": "0s" } as CSSProperties}
        />

        <header className="steps-header">
          <h2 className="steps-reveal" style={{ "--steps-delay": "0.04s" } as CSSProperties}>
            Как запустить свой магазин <span className="gradient-text">за 4 шага</span>?
          </h2>
          <p
            className="steps-header__desktop steps-reveal"
            style={{ "--steps-delay": "0.1s" } as CSSProperties}
          >
            Всего 4 шага - и ваш магазин готов принимать заказы через Telegram.
            <br />
            Запуск занимает минуты, а не недели.
          </p>
        </header>

        <div className="steps-grid">
          {steps.map((item, index) => (
            <div
              key={`steps-desktop-${index + 1}`}
              className="steps-reveal"
              style={{ "--steps-delay": `${0.18 + index * 0.06}s` } as CSSProperties}
            >
              <DesktopStepCard item={item} step={(index + 1) as 1 | 2 | 3 | 4} />
            </div>
          ))}
        </div>

        <div className="steps-mobile">
          {steps.map((item, index) => (
            <div key={`steps-mobile-${index + 1}`} className="steps-mobile__block">
              <div
                className="steps-reveal"
                style={{ "--steps-delay": `${0.16 + index * 0.06}s` } as CSSProperties}
              >
                <MobileStepCard item={item} step={(index + 1) as 1 | 2 | 3 | 4} />
              </div>

              {index < steps.length - 1 ? (
                <div
                  className="steps-mobile__arrow steps-reveal"
                  aria-hidden="true"
                  style={{ "--steps-delay": `${0.2 + index * 0.06}s` } as CSSProperties}
                >
                  <Image src="/images/steps/arrow-fill-mobile.svg" alt="" width={20} height={20} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
