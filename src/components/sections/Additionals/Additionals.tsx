"use client";

import Image from "next/image";
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

const iconMap: Record<AdditionalItem["icon"], string> = {
  theme: "/images/additionals/icon-theme-fill.svg",
  launch: "/images/additionals/icon-launch.svg",
  traffic: "/images/additionals/icon-traffic.svg",
  warehouse: "/images/additionals/icon-warehouse.svg",
  staff: "/images/additionals/icon-staff.svg",
  tasks: "/images/additionals/icon-tasks.svg",
  api: "/images/additionals/icon-api.svg",
  custom: "/images/additionals/icon-custom.svg",
};

function AdditionalIcon({ type }: { type: AdditionalItem["icon"] }) {
  return (
    <Image
      className="additionals-card__icon-image"
      src={iconMap[type]}
      alt=""
      width={32}
      height={32}
      aria-hidden="true"
    />
  );
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

      {item.recommended ? (
        <div className="additionals-card__recommend">
          <span className="additionals-card__recommend-icon" aria-hidden="true">
            <Image src="/images/additionals/icon-thumb-fill.svg" alt="" width={14} height={14} />
          </span>
          <span>Рекомендуем</span>
        </div>
      ) : null}

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
