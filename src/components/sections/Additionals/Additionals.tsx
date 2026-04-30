"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/buttons/Button";

type AdditionalPrice =
  | {
      kind: "price";
      amount: string;
      suffix: string;
      note: string;
    }
  | {
      kind: "cta";
      label: string;
    };

type AdditionalItem = {
  title: string;
  description: string;
  accent: string;
  icon: string;
  recommended?: boolean;
  price: AdditionalPrice;
};

const additionals: AdditionalItem[] = [
  {
    title: "Персональная тема",
    description:
      "Настроим внешний вид магазина под ваш бренд: цвета, атмосфера, ощущение премиальности и узнаваемости.",
    accent: "#9999ff",
    icon: "theme",
    recommended: true,
    price: {
      kind: "price",
      amount: "$150",
      suffix: "единоразово",
      note: "дизайн под фирменный стиль",
    },
  },
  {
    title: 'Запуск магазина "под ключ"',
    description:
      "Полностью подготовим магазин к старту: структура, наполнение, подключение и первичная настройка бизнес-логики.",
    accent: "#98cbff",
    icon: "launch",
    recommended: true,
    price: {
      kind: "price",
      amount: "$150",
      suffix: "единоразово",
      note: "готовый запуск без лишней рутины",
    },
  },
  {
    title: "Трафик на продукты",
    description:
      "Поможем привести покупателей на конкретные товары и связать продвижение с заказами внутри системы.",
    accent: "#a1e5e5",
    icon: "traffic",
    price: {
      kind: "price",
      amount: "$700",
      suffix: "/мес",
      note: "ведение и оптимизация рекламного потока",
    },
  },
  {
    title: "Дополнительный склад",
    description:
      "Добавим новые точки учета остатков и движения товаров, если у вас несколько складов или магазинов.",
    accent: "#9fc0ff",
    icon: "warehouse",
    price: {
      kind: "price",
      amount: "$15",
      suffix: "/мес",
      note: "за каждую дополнительную точку",
    },
  },
  {
    title: "Дополнительный сотрудник",
    description:
      "Подключайте новых менеджеров и сотрудников с отдельными доступами внутри рабочей системы Cartgram.",
    accent: "#99b7ff",
    icon: "staff",
    price: {
      kind: "price",
      amount: "$10",
      suffix: "/мес",
      note: "за 1 дополнительного сотрудника",
    },
  },
  {
    title: "Задачи для команды",
    description:
      "Встроим внутренние задачи и постановку работы внутри CRM, чтобы команда двигалась по процессу без хаоса.",
    accent: "#9ce2ff",
    icon: "tasks",
    price: {
      kind: "price",
      amount: "$10",
      suffix: "/мес",
      note: "за модуль командных задач",
    },
  },
  {
    title: "API интеграция",
    description:
      "Подключим внешние сервисы, платежные решения или учетные системы через API под ваши процессы.",
    accent: "#a1e5e5",
    icon: "api",
    price: {
      kind: "cta",
      label: "Узнать стоимость",
    },
  },
  {
    title: "Персональная разработка",
    description:
      "Реализуем индивидуальный функционал, если вам нужен нестандартный сценарий продаж или управления.",
    accent: "#98cbff",
    icon: "custom",
    price: {
      kind: "cta",
      label: "Узнать стоимость",
    },
  },
];

function AdditionalIcon({ type }: { type: AdditionalItem["icon"] }) {
  const className = "additionals-card__icon-svg";

  switch (type) {
    case "theme":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M20 19.5h24a4.5 4.5 0 014.5 4.5v16a4.5 4.5 0 01-4.5 4.5H20A4.5 4.5 0 0115.5 40V24a4.5 4.5 0 014.5-4.5z"
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <circle cx="25.5" cy="28" r="4.2" stroke="currentColor" strokeWidth="2.4" />
          <path
            d="M18.5 41l10.2-10.2a2.8 2.8 0 014 0l4.3 4.3a2.8 2.8 0 004 0l3.2-3.2"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "launch":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M21 34.5c8.4-10.933 18.133-15.433 29.2-13.5-1.067 10.933-6.2 20.267-15.4 28-6.8 1.067-11.4-0.267-13.8-4 .267-4 .267-7.5 0-10.5z"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
          <path d="M25 39.5l-6.5 6.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M35.5 29L42 35.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
          <circle cx="40.5" cy="24.5" r="2.6" fill="currentColor" />
        </svg>
      );
    case "traffic":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M19 44V29" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M31.5 44V22.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M44 44V17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M19 28.5l10.5-7.5 8 6 10-12"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M42 16h7v7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "warehouse":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M16 29l16-12 16 12v17H16V29z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M26 46V34h12v12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22 28.5h20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "staff":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="25" cy="24" r="5.8" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="41.5" cy="26" r="4.5" stroke="currentColor" strokeWidth="2.4" opacity="0.82" />
          <path
            d="M15.5 45c1.333-6 5.5-9 12.5-9 7.067 0 11.2 3 12.4 9"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M37.5 42.5c1.067-3.4 3.533-5.1 7.4-5.1 2 0 3.8.567 5.4 1.7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.82"
          />
        </svg>
      );
    case "tasks":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M17 21h18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M17 32h26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M17 43h18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M40 29.5l3.6 3.6 7.4-8.6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "api":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M22 32h20"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M28 25l-7 7 7 7M36 25l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "custom":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M21 42.5l2.7-8L39.6 18.6a4.808 4.808 0 016.8 6.8L30.5 41.3 22.5 44l-1.5-1.5z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M34.5 23.5l6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M18 48h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function AdditionalCard({
  item,
  delay,
}: {
  item: AdditionalItem;
  delay: string;
}) {
  return (
    <article
      className="additionals-card additionals-reveal"
      style={{ "--additionals-delay": delay, "--additionals-accent": item.accent } as CSSProperties}
    >
      <div className="additionals-card__corner" aria-hidden="true" />

      {item.recommended ? <div className="additionals-card__recommend">Рекомендуем</div> : null}

      <div className="additionals-card__icon-wrap">
        <div className="additionals-card__icon-pattern" aria-hidden="true" />
        <div className="additionals-card__icon-circle">
          <AdditionalIcon type={item.icon} />
        </div>
        <div className="additionals-card__icon-glow" aria-hidden="true" />
      </div>

      <div className="additionals-card__copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <div className="additionals-card__footer">
        {item.price.kind === "price" ? (
          <div className="additionals-card__price-block">
            <div className="additionals-card__price-row">
              <strong>{item.price.amount}</strong>
              <span>{item.price.suffix}</span>
            </div>
            <small>{item.price.note}</small>
          </div>
        ) : (
          <Button className="additionals-card__cta" variant="secondary" size="large" icon="arrow">
            {item.price.label}
          </Button>
        )}
      </div>
    </article>
  );
}

function MobileAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: AdditionalItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={`additionals-mobile-card${isOpen ? " is-open" : ""}`}
      style={{ "--additionals-accent": item.accent } as CSSProperties}
    >
      <button
        type="button"
        className="additionals-mobile-card__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="additionals-mobile-card__left">
          <div className="additionals-mobile-card__icon-wrap">
            <div className="additionals-mobile-card__icon-pattern" aria-hidden="true" />
            <div className="additionals-mobile-card__icon-circle">
              <AdditionalIcon type={item.icon} />
            </div>
          </div>
          <h3>{item.title}</h3>
        </div>

        <span className="additionals-mobile-card__toggle" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="additionals-mobile-card__content" hidden={!isOpen}>
        <p>{item.description}</p>

        {item.price.kind === "price" ? (
          <div className="additionals-mobile-card__price-block">
            <div className="additionals-mobile-card__price-row">
              <strong>{item.price.amount}</strong>
              <span>{item.price.suffix}</span>
            </div>
            <small>{item.price.note}</small>
          </div>
        ) : (
          <Button
            className="additionals-mobile-card__cta"
            variant="secondary"
            size="large"
            icon="arrow"
          >
            {item.price.label}
          </Button>
        )}
      </div>
    </article>
  );
}

export function Additionals() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [openMobileIndex, setOpenMobileIndex] = useState(1);

  const revealItems = useMemo(
    () => additionals.map((item, index) => ({ ...item, delay: `${0.08 + index * 0.05}s` })),
    [],
  );

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
    const revealFrame = window.requestAnimationFrame(revealIfVisible);

    return () => {
      window.cancelAnimationFrame(revealFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="additionals-section container-1920 px-20">
      <div className="section-shell additionals-shell">
        <div
          className="additionals-bg-pattern additionals-reveal"
          aria-hidden="true"
          style={{ "--additionals-delay": "0s" } as CSSProperties}
        />

        <header className="additionals-header">
          <h2
            className="additionals-title additionals-reveal"
            style={{ "--additionals-delay": "0.04s" } as CSSProperties}
          >
            Дополнительные услуги
          </h2>
        </header>

        <div className="additionals-grid">
          {revealItems.map((item) => (
            <AdditionalCard key={item.title} item={item} delay={item.delay} />
          ))}
        </div>

        <div
          className="additionals-mobile additionals-reveal"
          style={{ "--additionals-delay": "0.12s" } as CSSProperties}
        >
          {additionals.map((item, index) => (
            <MobileAccordionItem
              key={item.title}
              item={item}
              isOpen={openMobileIndex === index}
              onToggle={() => setOpenMobileIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
