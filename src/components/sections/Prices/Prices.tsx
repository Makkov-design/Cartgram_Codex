"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/buttons/Button";

type BillingMode = "monthly" | "yearly";
type PlanKey = "start" | "plus" | "prime" | "business";
type FeatureIconType =
  | "storefront"
  | "warehouse"
  | "shopping_cart"
  | "inventory_2"
  | "person_add"
  | "receipt_long"
  | "group"
  | "inventory"
  | "swap_horiz"
  | "notifications_active"
  | "campaign"
  | "event_available"
  | "history"
  | "filter_list"
  | "sell"
  | "fact_check"
  | "support_agent";

type Plan = {
  key: PlanKey;
  name: string;
  monthly: number;
  yearlyMonthly: number;
  accent: string;
  variant?: "featured";
  features: string[];
};

type ComparisonRow = {
  label: string;
  icon: FeatureIconType;
  values: Record<PlanKey, string | number | boolean>;
};

const plans: Plan[] = [
  {
    key: "start",
    name: "Start",
    monthly: 50,
    yearlyMonthly: 40,
    accent: "#9999ff",
    features: [
      "1 магазин",
      "1 склад",
      "До 100 заказов",
      "До 30 товаров",
      "Доступ к разделу Заказы",
      "Доступ к разделу База клиентов",
      "Доступ к разделу Товары",
      "Доступ к разделу Инвентарь",
      "Доступ к разделу Движение товаров",
      "Доступ к разделу Склад",
    ],
  },
  {
    key: "plus",
    name: "Plus",
    monthly: 80,
    yearlyMonthly: 64,
    accent: "#a59bff",
    features: [
      "Включено всё из Start +",
      "До 300 заказов",
      "До 60 товаров",
      "Доступ к разделу Сотрудники (роли и права доступа)",
      "1 сотрудник",
      "Push уведомления от бота",
      "Рассылки",
      "Отложенные рассылки по шаблону",
    ],
  },
  {
    key: "prime",
    name: "Prime",
    monthly: 150,
    yearlyMonthly: 120,
    accent: "#a1e5e5",
    variant: "featured",
    features: [
      "Включено всё из Plus +",
      "До 800 заказов",
      "До 90 товаров",
      "3 сотрудника",
      "История покупок клиента (LTV)",
      "Сегментация клиентов для рассылок",
      "Промокоды, купоны",
      "Журнал действий сотрудников",
    ],
  },
  {
    key: "business",
    name: "Business",
    monthly: 250,
    yearlyMonthly: 200,
    accent: "#98cbff",
    features: ["Включено всё из Prime +", "До 3000 заказов", "До 150 товаров", "5 сотрудников", "Приоритетная техподдержка"],
  },
];

const comparisonRows: ComparisonRow[] = [
  { label: "Кол-во магазинов", icon: "storefront", values: { start: "1", plus: "1", prime: "1", business: "1" } },
  { label: "Кол-во складов", icon: "warehouse", values: { start: "1", plus: "1", prime: "1", business: "1" } },
  { label: "Кол-во заказов", icon: "shopping_cart", values: { start: "до 100", plus: "до 300", prime: "до 800", business: "Безлимитно" } },
  { label: "Кол-во товаров", icon: "inventory_2", values: { start: "до 30", plus: "до 60", prime: "до 90", business: "Безлимитно" } },
  { label: "Кол-во сотрудников", icon: "person_add", values: { start: "0", plus: "1", prime: "3", business: "Безлимитно" } },
  { label: "Раздел Заказы", icon: "receipt_long", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел База клиентов", icon: "group", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Товары", icon: "inventory", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Инвентарь", icon: "inventory_2", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Движение товаров", icon: "swap_horiz", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Склад", icon: "warehouse", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Сотрудники (роли и права доступа)", icon: "person_add", values: { start: false, plus: true, prime: true, business: true } },
  { label: "Push уведомления от бота", icon: "notifications_active", values: { start: false, plus: true, prime: true, business: true } },
  { label: "Рассылки", icon: "campaign", values: { start: false, plus: true, prime: true, business: true } },
  { label: "Отложенные рассылки по шаблону", icon: "event_available", values: { start: false, plus: true, prime: true, business: true } },
  { label: "История покупок клиента (LTV)", icon: "history", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Сегментация клиентов для рассылок", icon: "filter_list", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Промокоды, купоны", icon: "sell", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Журнал действий сотрудников", icon: "fact_check", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Приоритетная техподдержка", icon: "support_agent", values: { start: false, plus: false, prime: false, business: true } },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
    </svg>
  );
}

function FunctionIcon({ type }: { type: FeatureIconType }) {
  const paths: Record<FeatureIconType, string[]> = {
    storefront: ["m21.9 8.89-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9 1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52 9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41a1.42 1.42 0 0 1-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z"],
    warehouse: ["M20 8.35V19h-2v-8H6v8H4V8.35l8-3.2 8 3.2zM22 21V7L12 3 2 7v14h6v-8h8v8h6zm-11-2H9v2h2v-2zm2-3h-2v2h2v-2zm2 3h-2v2h2v-2z"],
    shopping_cart: ["M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"],
    inventory_2: ["M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-1 18H5V9h14v11zm1-13H4V4h16v3z"],
    person_add: ["M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"],
    receipt_long: ["M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zM15 20H6c-.55 0-1-.45-1-1v-1h10v2zm4-1c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11v14z"],
    group: ["M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"],
    inventory: ["M5 5h2v3h10V5h2v5h2V5c0-1.1-.9-2-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6v-2H5V5zm7-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z", "M21 11.5 15.51 17l-3.01-3-1.5 1.5 4.51 4.5 6.99-7z"],
    swap_horiz: ["M6.99 11 3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"],
    notifications_active: ["M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zM7.58 4.08 6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2a8.445 8.445 0 0 1 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43a8.495 8.495 0 0 1 3.54 6.42z"],
    campaign: ["M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm5.03 1.71L11 9.53v4.94l-1.97-1.18-.48-.29H4v-2h4.55l.48-.29zM15.5 12c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"],
    event_available: ["M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm5.56 10.46 5.93-5.93-1.06-1.06-4.87 4.87-2.11-2.11-1.06 1.06z"],
    history: ["M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"],
    filter_list: ["M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"],
    sell: ["m21.41 11.41-8.83-8.83c-.37-.37-.88-.58-1.41-.58H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83zM12.83 20 4 11.17V4h7.17L20 12.83 12.83 20z"],
    fact_check: ["M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H4V5h16v14z", "M19.41 10.42 17.99 9l-3.17 3.17-1.41-1.42L12 12.16 14.82 15zM5 7h5v2H5zm0 4h5v2H5zm0 4h5v2H5z"],
    support_agent: ["M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z", "M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47z"],
  };

  return (
    <svg className="prices-compare__function-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type].map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}

function TooltipIcon() {
  return (
    <span className="prices-compare__tooltip" title="Описание появится позже" aria-label="Описание появится позже">
      ?
    </span>
  );
}

function formatPrice(value: number) {
  return `$${value}`;
}

function yearlyTotal(plan: Plan) {
  return `${plan.yearlyMonthly * 12}$ ежегодно`;
}

function ComparisonCell({ value }: { value: string | number | boolean }) {
  if (typeof value === "boolean") {
    return <span className={`prices-compare__icon ${value ? "is-positive" : "is-negative"}`}>{value ? <CheckIcon /> : <CloseIcon />}</span>;
  }

  return <span className="prices-compare__text">{value}</span>;
}

function PlanCard({ plan, billing, index }: { plan: Plan; billing: BillingMode; index: number }) {
  const price = billing === "monthly" ? plan.monthly : plan.yearlyMonthly;
  const inheritedPlan = plan.key === "plus" ? "Start" : plan.key === "prime" ? "Plus" : "Prime";
  const labelText = plan.key === "start" ? "Что входит:" : `Включено всё из ${inheritedPlan} +`;
  const isYearly = billing === "yearly";

  return (
    <article
      className={`prices-card prices-card--${plan.key} ${plan.variant === "featured" ? "prices-card--featured" : ""} prices-reveal`}
      style={{ "--prices-accent": plan.accent, "--prices-delay": `${0.28 + index * 0.06}s` } as CSSProperties}
    >
      <div className="prices-card__pattern" aria-hidden="true" />
      <div className="prices-card__light" aria-hidden="true" />

      {plan.variant === "featured" ? <div className="prices-card__badge">Лучшая выгода</div> : null}

      <h3>{plan.name}</h3>
      <div className={`prices-card__price-row ${isYearly ? "is-yearly" : ""}`}>
        {isYearly ? <span className="prices-card__old-price-inline">{formatPrice(plan.monthly)}</span> : null}
        <div className="prices-card__price-main">
          <span>{formatPrice(price)}</span>
          <small>/мес</small>
        </div>
      </div>
      <div className={`prices-card__payment-row ${isYearly ? "is-yearly" : ""}`}>
        <p className="prices-card__payment">{isYearly ? yearlyTotal(plan) : "ежемесячная оплата"}</p>
        {isYearly ? <p className="prices-card__saving">Экономия 20%</p> : null}
      </div>
      <Button className="prices-card__cta" variant="primary" size="large" icon="arrow">
        Подключить {plan.name}
      </Button>
      <p className={`prices-card__label ${plan.key === "start" ? "prices-card__label--base" : "prices-card__label--accent"}`}>
        {labelText}
      </p>
      <ul>
        {plan.features.map((feature, featureIndex) => (
          <li key={`${plan.key}-${featureIndex}`}>
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Prices() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const [billing, setBilling] = useState<BillingMode>("monthly");
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
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
      { threshold: 0.16 },
    );

    observer.observe(node);
    const frame = window.requestAnimationFrame(revealIfVisible);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) {
      return;
    }

    let centred = false;
    const positionMobileScroller = (force = false) => {
      if (!window.matchMedia("(max-width: 600px)").matches) {
        return false;
      }
      if (centred && !force) {
        return true;
      }
      const plusSlide = scroller.querySelector<HTMLElement>('[data-plan-slide="plus"]');
      if (!plusSlide || scroller.clientWidth === 0 || plusSlide.offsetWidth === 0) {
        return false;
      }
      // Center the Plus slide inside the scrollport so adjacent cards peek on both sides.
      const slideCenter = plusSlide.offsetLeft + plusSlide.offsetWidth / 2;
      const offset = Math.max(0, slideCenter - scroller.clientWidth / 2);
      scroller.scrollLeft = offset;
      centred = true;
      return true;
    };

    // ResizeObserver fires once the scroller actually has a size — that's the
    // earliest moment we can reliably set scrollLeft (rAF/setTimeout sometimes
    // run before layout in Next dev with deferred hydration).
    const ro = new ResizeObserver(() => {
      positionMobileScroller();
    });
    ro.observe(scroller);

    const onResize = () => {
      centred = false;
      positionMobileScroller();
    };
    window.addEventListener("resize", onResize);

    // Belt-and-braces immediate attempts.
    const frame = window.requestAnimationFrame(() => positionMobileScroller());
    const t1 = window.setTimeout(() => positionMobileScroller(), 120);
    const t2 = window.setTimeout(() => positionMobileScroller(), 400);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="prices-section container-1920 px-20">
      <div className="section-shell prices-shell">
        <header className="prices-header">
          <h2 className="prices-title prices-reveal" style={{ "--prices-delay": "0.04s" } as CSSProperties}>
            Тарифы Cartgram
          </h2>
          <p className="prices-subtitle prices-reveal" style={{ "--prices-delay": "0.1s" } as CSSProperties}>
            Выберите тариф под текущий масштаб бизнеса. Без скрытых ограничений и сложных настроек.
          </p>
        </header>

        <div className="prices-activation prices-reveal" style={{ "--prices-delay": "0.14s" } as CSSProperties}>
          <span className="prices-activation__icon">
            <Image src="/images/tg-ready-icon.png" alt="" width={80} height={80} />
          </span>
          <div className="prices-activation__copy">
            <h3>Единоразовая активация Telegram-магазина (mini-app)</h3>
            <p>Полный запуск Telegram-магазина с подключением к CRM и готовностью к продажам.</p>
          </div>
          <strong className="prices-activation__price">$500</strong>
        </div>

        <div className="prices-divider prices-reveal" aria-hidden="true" style={{ "--prices-delay": "0.18s" } as CSSProperties}>
          <span className="prices-divider__dots" />
          <span className="prices-divider__button">+</span>
        </div>

        <div className="prices-toggle-wrap prices-reveal" style={{ "--prices-delay": "0.22s" } as CSSProperties}>
          <div className="prices-toggle" role="tablist" aria-label="Billing mode">
            <button type="button" className={billing === "monthly" ? "is-active" : ""} onClick={() => setBilling("monthly")}>
              Помесячно
            </button>
            <button type="button" className={`prices-toggle__yearly ${billing === "yearly" ? "is-active" : ""}`} onClick={() => setBilling("yearly")}>
              <span>Годично</span>
              <span className="prices-toggle__savings">Экономия 20%</span>
            </button>
          </div>
        </div>

        <div className="prices-grid prices-grid--desktop">
          {plans.map((plan, index) => (
            <PlanCard key={plan.key} plan={plan} billing={billing} index={index} />
          ))}
        </div>

        <div className="prices-mobile-slider prices-reveal" style={{ "--prices-delay": "0.3s" } as CSSProperties}>
          <div ref={mobileScrollerRef} className="prices-mobile-slider__scroller">
            {plans.map((plan) => {
              const price = billing === "monthly" ? plan.monthly : plan.yearlyMonthly;
              const inheritedPlan = plan.key === "plus" ? "Start" : plan.key === "prime" ? "Plus" : "Prime";
              const labelText = plan.key === "start" ? "Что входит:" : `Включено всё из ${inheritedPlan} +`;
              const isYearly = billing === "yearly";

              return (
                <div key={`mobile-${plan.key}`} className="prices-mobile-slider__slide" data-plan-slide={plan.key}>
                  <article
                    className={`prices-card prices-mobile-card prices-mobile-card--${plan.key} ${
                      plan.variant === "featured" ? "prices-card--featured" : ""
                    }`}
                    style={{ "--prices-accent": plan.accent } as CSSProperties}
                  >
                    <div className="prices-card__pattern" aria-hidden="true" />
                    <div className="prices-card__light" aria-hidden="true" />

                    {plan.variant === "featured" ? <div className="prices-card__badge">Лучшая выгода</div> : null}

                    <div className="prices-mobile-card__header">
                      <h3>{plan.name}</h3>
                      {plan.key === "plus" ? <span className="prices-mobile-card__chip">Оптимально</span> : null}
                    </div>

                    <div className="prices-mobile-card__price-block">
                      <div className={`prices-card__price-row ${isYearly ? "is-yearly" : ""}`}>
                        {isYearly ? <span className="prices-card__old-price-inline">{formatPrice(plan.monthly)}</span> : null}
                        <div className="prices-card__price-main">
                          <span>{formatPrice(price)}</span>
                          <small>/мес</small>
                        </div>
                      </div>
                      <div className={`prices-card__payment-row ${isYearly ? "is-yearly" : ""}`}>
                        <p className="prices-card__payment">{isYearly ? yearlyTotal(plan) : "ежемесячная оплата"}</p>
                        {isYearly ? <p className="prices-card__saving">Экономия 20%</p> : null}
                      </div>
                    </div>

                    <Button className="prices-card__cta" variant="primary" size="large" icon="arrow">
                      Подключить {plan.name}
                    </Button>

                    <div className="prices-mobile-card__features">
                      <p className={`prices-card__label ${plan.key === "start" ? "prices-card__label--base" : "prices-card__label--accent"}`}>
                        {labelText}
                      </p>
                      <ul>
                        {plan.features.map((feature, featureIndex) => (
                          <li key={`mobile-${plan.key}-${featureIndex}`}>
                            <CheckIcon />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>
              );
            })}

            <div className="prices-mobile-slider__slide prices-mobile-slider__slide--enterprise">
              <article className="prices-mobile-enterprise">
                <div className="prices-mobile-enterprise__copy">
                  <h3>
                    Enterprise <span>[Custom pricing]</span>
                  </h3>
                  <p>Индивидуальные решения для крупных проектов и масштабируемых e-commerce систем.</p>
                  <Button className="prices-mobile-enterprise__cta" variant="primary" size="large" icon="arrow">
                    Подключить Enterprise
                  </Button>
                </div>
                <div className="prices-mobile-enterprise__features">
                  <p>Что входит:</p>
                  <ul>
                    {[
                      "Индивидуальные лимиты на заказы, товары, сотрудников",
                      "API без ограничений",
                      "Индивидуальные интеграции",
                      "Кастомная разработка",
                    ].map((feature) => (
                      <li key={`mobile-enterprise-${feature}`}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>

        <article className="prices-enterprise prices-reveal" style={{ "--prices-delay": "0.56s" } as CSSProperties}>
          <div className="prices-enterprise__copy">
            <h3>
              Enterprise <span>[Custom pricing]</span>
            </h3>
            <p>Индивидуальные решения для крупных проектов и масштабируемых e-commerce систем.</p>
            <Button className="prices-enterprise__cta" variant="primary" size="large" icon="arrow">
              Подключить Enterprise
            </Button>
          </div>
          <div className="prices-enterprise__features">
            <p>Что входит:</p>
            <ul>
              {["Индивидуальные лимиты на заказы, товары, сотрудников", "API без ограничений", "Индивидуальные интеграции", "Кастомная разработка"].map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="prices-compare-toggle prices-reveal" style={{ "--prices-delay": "0.62s" } as CSSProperties}>
          <Button className="prices-compare-toggle__button" variant="secondary" size="large" onClick={() => setShowCompare((current) => !current)}>
            {showCompare ? "Скрыть сравнение" : "Сравнить тарифы"}
          </Button>
        </div>

        {showCompare ? (
          <div className="prices-compare prices-reveal is-open" style={{ "--prices-delay": "0s" } as CSSProperties}>
            <div className="prices-compare__table">
              <div className="prices-compare__header">
                <div className="prices-compare__head-cell prices-compare__head-cell--label">Функции</div>
                {plans.map((plan) => (
                  <div key={plan.key} className="prices-compare__head-cell">
                    {plan.name}
                  </div>
                ))}
              </div>
              <div className="prices-compare__body">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="prices-compare__row">
                    <div className="prices-compare__cell prices-compare__cell--label">
                      <span className="prices-compare__feature">
                        <FunctionIcon type={row.icon} />
                        <span>{row.label}</span>
                        <TooltipIcon />
                      </span>
                    </div>
                    {plans.map((plan) => (
                      <div key={`${row.label}-${plan.key}`} className="prices-compare__cell">
                        <ComparisonCell value={row.values[plan.key]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
