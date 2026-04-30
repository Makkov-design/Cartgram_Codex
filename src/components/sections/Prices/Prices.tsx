"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/buttons/Button";

type BillingMode = "monthly" | "yearly";
type PlanKey = "start" | "plus" | "prime" | "business";
type FeatureIconType =
  | "store"
  | "orders"
  | "products"
  | "clients"
  | "sales"
  | "analytics"
  | "warehouse"
  | "staff"
  | "push"
  | "mail"
  | "history"
  | "support";

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
  { label: "Количество магазинов", icon: "store", values: { start: 1, plus: 1, prime: 1, business: 1 } },
  { label: "Количество заказов", icon: "orders", values: { start: "до 100", plus: "до 300", prime: "до 800", business: "Безлимитно" } },
  { label: "Количество товаров", icon: "products", values: { start: "до 30", plus: "до 60", prime: "до 90", business: "до 150" } },
  { label: "База клиентов", icon: "clients", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Заказы", icon: "orders", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Товары", icon: "products", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Склад", icon: "warehouse", values: { start: true, plus: true, prime: true, business: true } },
  { label: "Раздел Сотрудники", icon: "staff", values: { start: false, plus: true, prime: true, business: true } },
  { label: "Push уведомления", icon: "push", values: { start: false, plus: true, prime: true, business: true } },
  { label: "Рассылки", icon: "mail", values: { start: false, plus: true, prime: true, business: true } },
  { label: "Отложенные рассылки по шаблону", icon: "mail", values: { start: false, plus: true, prime: true, business: true } },
  { label: "История покупок клиента", icon: "history", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Сегментация клиентов", icon: "clients", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Промокоды и купоны", icon: "sales", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Журнал действий сотрудников", icon: "staff", values: { start: false, plus: false, prime: true, business: true } },
  { label: "Приоритетная техподдержка", icon: "support", values: { start: false, plus: false, prime: false, business: true } },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.8 10.1 2.1 2.1 4.3-4.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.4 7.4 12.6 12.6M12.6 7.4 7.4 12.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function FunctionIcon({ type }: { type: FeatureIconType }) {
  const paths: Record<FeatureIconType, string> = {
    store: "M4 8.5 6 4h8l2 4.5V16H4V8.5Zm2.2 1.2V14h7.6V9.7M6 4v4.2m4-4.2v4.2m4-4.2v4.2",
    orders: "M6 4h8l2 3v9H4V7l2-3Zm0 4h8M7.5 11h5M7.5 13.5h3.5",
    products: "M10 3.8 16 7v6l-6 3.2L4 13V7l6-3.2Zm0 6.5V16M4.7 7.3 10 10.3l5.3-3",
    clients: "M7.8 9.2a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2ZM3.5 16c.4-2.7 2.1-4.3 4.3-4.3s3.9 1.6 4.3 4.3M13 9.2a2.1 2.1 0 1 0-.5-4.1M12.8 11.8c1.7.4 2.9 1.8 3.2 4.2",
    sales: "M4 13.5 8.5 9l2.5 2.5L16 6.5M13 6.5h3v3",
    analytics: "M4 15V5m4 10V8m4 7V4m4 11v-5",
    warehouse: "M4 8 10 4l6 4v8H4V8Zm3 8v-5h6v5",
    staff: "M7.5 8.5a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8ZM3.5 16c.4-2.5 1.9-4 4-4s3.6 1.5 4 4M13.5 5v4m-2-2h4",
    push: "M10 17a2 2 0 0 0 1.8-1.2H8.2A2 2 0 0 0 10 17ZM5.5 13.5h9l-1.2-1.7V8.4A3.3 3.3 0 0 0 10 5.1 3.3 3.3 0 0 0 6.7 8.4v3.4l-1.2 1.7Z",
    mail: "M4 6h12v9H4V6Zm1 .5 5 4 5-4",
    history: "M5.1 6.4A5.6 5.6 0 1 1 4.4 10M4.4 5.2v3.5h3.5M10 7.5V11l2.4 1.4",
    support: "M10 4a5 5 0 0 0-5 5v3a2 2 0 0 0 2 2h1v-4H6.5V9a3.5 3.5 0 0 1 7 0v1H12v4h1a2 2 0 0 0 2-2V9a5 5 0 0 0-5-5Z",
  };

  return (
    <svg className="prices-compare__function-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45" />
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
  const mobilePlusPeek = 40;

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

    const positionMobileScroller = () => {
      if (!window.matchMedia("(max-width: 600px)").matches) {
        return;
      }

      const plusSlide = scroller.querySelector<HTMLElement>('[data-plan-slide="plus"]');
      if (!plusSlide) {
        return;
      }

      const offset = Math.max(0, plusSlide.offsetLeft - mobilePlusPeek);
      scroller.scrollTo({ left: offset, behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(() => {
      positionMobileScroller();
      window.setTimeout(positionMobileScroller, 80);
    });

    window.addEventListener("resize", positionMobileScroller);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", positionMobileScroller);
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
            <Image src="/images/figma-rebuilt/prices-activation-icon.svg" alt="" width={40} height={40} />
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
