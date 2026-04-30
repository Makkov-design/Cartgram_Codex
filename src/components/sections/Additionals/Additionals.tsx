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
            d="M18 18h28v28H18z"
            rx="8"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.9"
          />
          <circle cx="26" cy="26" r="5" fill="currentColor" opacity="0.92" />
          <path
            d="M21 39c4-4.667 8.333-7 13-7 3.333 0 6.667 1.667 10 5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "launch":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M21 43c-1.333-8 1.333-14.667 8-20 5.333-4.267 11.333-6.6 18-7-0.4 6.933-2.733 13-7 18.2-5.2 6.4-12 9-20 7.8z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M31 33l-8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M37 27l6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="41" cy="23" r="3" fill="currentColor" />
        </svg>
      );
    case "traffic":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M18 46V30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 46V22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M46 46V14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M18 28l10-8 8 6 10-12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M42 14h8v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "warehouse":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M14 28l18-12 18 12v20H14V28z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M24 48V34h16v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 28h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "staff":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="3" />
          <circle cx="42" cy="26" r="5" stroke="currentColor" strokeWidth="3" opacity="0.82" />
          <path
            d="M14 46c1.333-7.333 6-11 14-11s12.667 3.667 14 11"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M38 44c1.067-4.267 3.733-6.4 8-6.4 2.133 0 4 0.667 5.6 2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.82"
          />
        </svg>
      );
    case "tasks":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M18 20h28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 32h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 44h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M42 31l4 4 8-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "api":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M19 32h10m6 0h10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M25 24l-8 8 8 8M39 24l8 8-8 8"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "custom":
      return (
        <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M20 42l3.2-8.8L41 15.4a5.657 5.657 0 018 8L31.2 41.2 22.4 44 20 42z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M34 22l8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 48h28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
      <div className="additionals-card__plus" aria-hidden="true">
        <span />
        <span />
      </div>

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
