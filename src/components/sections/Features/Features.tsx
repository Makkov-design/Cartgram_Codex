"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FeatureCard = {
  title: string;
  description: string;
};

type FeatureItem = {
  title: string;
  section?: string;
  primary?: boolean;
  icon: "analytics" | "sales" | "team" | "stock" | "filter" | "delivery" | "mail" | "channel";
  cards: FeatureCard[];
};

const defaultCards: FeatureCard[] = [
  {
    title: "Полный дашборд со всеми данными",
    description:
      "Отслеживайте метрики и финансовые показатели в удобном дашборде, принимая точные решения",
  },
  {
    title: "Удобные фильтры по датам",
    description:
      "Анализ показателей в разрезе нужных дат - сегодня, вчера, неделя, месяц, год или же выбор нужного диапазона",
  },
  {
    title: "Переключение между магазинами",
    description:
      "Если у вас несколько магазинов, вы можете переключаться между ними, а также смотреть на общие показатели в целом",
  },
  {
    title: "Динамика изменения показателей",
    description:
      "На графике отображены изменения показателей за выбранный период, для отслеживания тенденций и сравнения с прошлыми показателями",
  },
];

const featureItems: FeatureItem[] = [
  { title: "Аналитика", primary: true, icon: "analytics", cards: defaultCards },
  { title: "Продажи", section: "Продажи", icon: "sales", cards: defaultCards },
  { title: "Заказы", icon: "analytics", cards: defaultCards },
  { title: "База клиентов", icon: "analytics", cards: defaultCards },
  { title: "Сотрудники", section: "Сотрудники", icon: "team", cards: defaultCards },
  { title: "Сотрудники", icon: "analytics", cards: defaultCards },
  { title: "Роли и права доступа", icon: "analytics", cards: defaultCards },
  { title: "Склад", section: "Склад", icon: "stock", cards: defaultCards },
  { title: "Товары", icon: "analytics", cards: defaultCards },
  { title: "Инвентарь", icon: "analytics", cards: defaultCards },
  { title: "Движение товаров", icon: "analytics", cards: defaultCards },
  { title: "Склады", icon: "analytics", cards: defaultCards },
  { title: "Фильтры", section: "Фильтры", icon: "filter", cards: defaultCards },
  { title: "Категории и подкатегории", icon: "analytics", cards: defaultCards },
  { title: "Смарт-цена", icon: "analytics", cards: defaultCards },
  { title: "Доставка", icon: "delivery", cards: defaultCards },
  { title: "Рассылки", icon: "mail", cards: defaultCards },
  { title: "Каналы", icon: "channel", cards: defaultCards },
];

function FeatureIcon({
  icon,
  active = false,
}: {
  icon: FeatureItem["icon"];
  active?: boolean;
}) {
  const color = active ? "currentColor" : "currentColor";

  if (icon === "sales") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="M7.2 21a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm10.2 0a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4ZM5.1 5.3h15.6l-1.8 7.2a2.3 2.3 0 0 1-2.2 1.7H8.1a2.3 2.3 0 0 1-2.2-1.8L4.4 3.7H2.2V2h3.6l.5 3.3h-1.2Zm1.5 1.8.9 4.9c.1.3.3.5.6.5h8.6c.3 0 .5-.2.6-.5l1.2-4.9H6.6Z"
        />
      </svg>
    );
  }

  if (icon === "stock" || icon === "delivery") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Zm0 2.1L6.5 7.2 12 10.3l5.5-3.1L12 4.1Zm-6.2 4.7v5.7l5.3 3V11.8l-5.3-3Zm7.1 8.7 5.3-3V8.8l-5.3 3v5.7Z"
        />
      </svg>
    );
  }

  if (icon === "filter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="M4 5h16l-6.1 7.1V19l-3.8 2v-8.9L4 5Zm3.8 1.8 4.2 4.9 4.2-4.9H7.8Z"
        />
      </svg>
    );
  }

  if (icon === "mail") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm.6 2 7.4 5.2L19.4 7H4.6Zm15.4 2.1-7.4 5.2a1.1 1.1 0 0 1-1.2 0L4 9.1V17h16V9.1Z"
        />
      </svg>
    );
  }

  if (icon === "channel") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="M12 3a7 7 0 0 0-7 7v3.3a4 4 0 0 0 4 4h.8V21h4.4v-3.7H15a4 4 0 0 0 4-4V10a7 7 0 0 0-7-7Zm0 1.8a5.2 5.2 0 0 1 5.2 5.2v3.3a2.2 2.2 0 0 1-2.2 2.2H9a2.2 2.2 0 0 1-2.2-2.2V10A5.2 5.2 0 0 1 12 4.8Zm0 2.4a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill={color}
        d="M4 16.8 9.8 11l3.4 3.4L20 7.6V12h2V4h-8v2h4.6l-5.4 5.4L9.8 8 2.6 15.2 4 16.8Z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <Image
      src="/images/features/done-all.svg"
      alt=""
      width={28}
      height={15}
      className="features-check-img"
    />
  );
}

function MenuChevron() {
  return (
    <span className="features-menu-chevron" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z"
        />
      </svg>
    </span>
  );
}

function MenuButton({
  item,
  index,
  active,
  onClick,
}: {
  item: FeatureItem;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const isSection = Boolean(item.section);
  const hasLargeIcon = isSection || item.primary;
  const className = [
    "features-menu-button",
    active ? "features-menu-button--active" : "",
    hasLargeIcon ? "features-menu-button--section" : "",
    isSection ? "features-menu-button--group" : "",
  ].join(" ");

  const content = (
    <>
      {hasLargeIcon ? (
        <span className="features-menu-icon" aria-hidden="true">
          <FeatureIcon icon={item.icon} active={active} />
        </span>
      ) : (
        <span className="features-menu-dot" aria-hidden="true" />
      )}
      <span>{item.title}</span>
      {isSection ? <MenuChevron /> : null}
    </>
  );

  if (isSection) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      data-feature-index={String(index)}
    >
      {hasLargeIcon ? (
        <span className="features-menu-icon" aria-hidden="true">
          <FeatureIcon icon={item.icon} active={active} />
        </span>
      ) : (
        <span className="features-menu-dot" aria-hidden="true" />
      )}
      <span>{item.title}</span>
      {isSection ? <span className="features-menu-chevron" aria-hidden="true">⌄</span> : null}
    </button>
  );
}

export function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = featureItems[activeIndex];
  const activeCards = activeItem.cards;

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

  return (
    <section ref={sectionRef} className="features-section container-1920 px-20">
      <div className="features-bg-pattern features-reveal" aria-hidden="true" />
      <div className="features-bg-light features-reveal" aria-hidden="true" />

      <div className="section-shell">
        <h2 className="features-title features-reveal">Возможности платформы</h2>

        <div className="features-slider">
          <aside className="features-sidebar features-reveal" aria-label="Разделы возможностей">
            <div className="features-menu">
              {featureItems.map((item, index) => (
                <MenuButton
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <p className="features-note">
              CRM, товары, клиенты, склад, аналитика и автоматизация — всё в одной системе.
            </p>
          </aside>

          <div className="features-content features-reveal" key={activeIndex}>
            <div className="features-graphic">
              <Image
                src="/images/features/analytics-dashboard.png"
                alt={`Раздел ${activeItem.title} в Cartgram`}
                width={1290}
                height={782}
                className="features-graphic-image"
                sizes="(max-width: 600px) 358px, (max-width: 900px) 696px, (max-width: 1440px) 931px, 1316px"
              />
            </div>

            <div className="features-card-grid">
              {activeCards.map((card) => (
                <article className="features-info-card" key={card.title}>
                  <div className="features-info-heading">
                    <span className="features-check">
                      <CheckIcon />
                    </span>
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
