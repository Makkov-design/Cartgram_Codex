"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

type StatCard = {
  value: number;
  suffix: string;
  title: string;
  detail: string;
  icon: string;
  accent: string;
  delay: string;
};

type OrderItem = {
  id: string;
  customer: string;
  amount: string;
  status: string;
  icon: string;
  tone: "gold" | "blue" | "violet";
};

type StoreGraphicNode = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const orders: OrderItem[] = [
  { id: "ID 82931", customer: "@Ivan", amount: "€124.55", status: "Принято", icon: "/images/numbers/order-icon-wait.svg", tone: "gold" },
  { id: "ID 20471", customer: "@Alex", amount: "€56.45", status: "Отправка", icon: "/images/numbers/order-icon-sent.svg", tone: "blue" },
  { id: "ID 55109", customer: "@Anna", amount: "€96.50", status: "Оплачено", icon: "/images/numbers/order-icon-done.svg", tone: "violet" },
];

const storeGraphicNodes: StoreGraphicNode[] = [
  { src: "/images/figma-rebuilt/store-logo-delivery.svg", x: 96, y: 44, width: 72, height: 72 },
  { src: "/images/figma-rebuilt/store-logo-01.svg", x: 96, y: 216, width: 72, height: 72 },
  { src: "/images/figma-rebuilt/store-logo-02.svg", x: 268, y: 216, width: 72, height: 72 },
  { src: "/images/figma-rebuilt/store-logo-03.svg", x: 268, y: 44, width: 72, height: 72 },
  { src: "/images/figma-rebuilt/store-logo-04.svg", x: 186, y: 22, width: 64, height: 64 },
  { src: "/images/figma-rebuilt/store-logo-05.svg", x: 186, y: 246, width: 64, height: 64 },
  { src: "/images/figma-rebuilt/store-logo-06.svg", x: 74, y: 134, width: 64, height: 64 },
  { src: "/images/figma-rebuilt/store-logo-07.svg", x: 298, y: 134, width: 64, height: 64 },
  { src: "/images/figma-rebuilt/store-logo-08.svg", x: 362, y: 208, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-09.svg", x: 254, y: -18, width: 48, height: 48 },
  { src: "/images/figma-rebuilt/store-logo-10.svg", x: 362, y: 84, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-11.svg", x: 34, y: 84, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-12.svg", x: 34, y: 208, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-13.svg", x: 134, y: 302, width: 48, height: 48 },
  { src: "/images/figma-rebuilt/store-logo-14.svg", x: 254, y: 302, width: 48, height: 48 },
  { src: "/images/figma-rebuilt/store-logo-15.svg", x: 134, y: -18, width: 48, height: 48 },
  { src: "/images/figma-rebuilt/store-logo-16.svg", x: 406, y: 146, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-17.svg", x: -10, y: 146, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-18.svg", x: 340, y: 4, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-19.svg", x: 56, y: 4, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-20.svg", x: 340, y: 288, width: 40, height: 40 },
  { src: "/images/figma-rebuilt/store-logo-21.svg", x: 56, y: 288, width: 40, height: 40 },
];

const stats: StatCard[] = [
  {
    value: 47,
    suffix: " секунд",
    title: "Среднее время обработки клиента",
    detail: "От входа в бота до оформленного заказа — без переписок и ожиданий.",
    icon: "/images/numbers/icon-speed.svg",
    accent: "#9999ff",
    delay: "0.3s",
  },
  {
    value: 24,
    suffix: "/7",
    title: "Автоматическая обработка заявок",
    detail: "Cartgram сам принимает заказы, обновляет статусы и фиксирует оплаты — даже ночью.",
    icon: "/images/numbers/icon-24-7.svg",
    accent: "#98cbff",
    delay: "0.36s",
  },
  {
    value: 94,
    suffix: "%",
    title: "Клиентов приходят по рекомендации",
    detail: "Лучший маркетинг — результат. Владельцы магазинов советуют Cartgram партнёрам и коллегам по бизнесу.",
    icon: "/images/numbers/icon-referral.svg",
    accent: "#a1e5e5",
    delay: "0.42s",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string; duration?: number }) {
  return (
    <span className="numbers-counter">
      {value.toLocaleString("ru-RU").replace(/\u00a0/g, " ")}
      {suffix}
    </span>
  );
}

function OrdersAnimation() {
  return (
    <div className="numbers-orders" aria-hidden="true">
      <div className="numbers-orders__ghost numbers-orders__ghost--back" />
      <div className="numbers-orders__ghost numbers-orders__ghost--middle" />
      <div className="numbers-orders__ghost numbers-orders__ghost--front" />

      {orders.map((order, index) => (
        <div
          key={order.id}
          className={`numbers-orders__state numbers-orders__state--${index + 1}`}
          style={{ "--order-state-index": index } as CSSProperties}
        >
          <div className={`numbers-orders__card numbers-orders__card--${order.tone}`}>
            <span className="numbers-orders__icon">
              <Image src={order.icon} alt="" width={24} height={24} />
            </span>
            <span className="numbers-orders__group">
              <small>{order.id}</small>
              <strong>{order.customer}</strong>
            </span>
            <span className="numbers-orders__group">
              <small>Сумма</small>
              <strong>{order.amount}</strong>
            </span>
            <span className="numbers-orders__divider" />
            <span className="numbers-orders__group numbers-orders__group--status">
              <small>Статус</small>
              <strong>{order.status}</strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StoreGraphic() {
  return (
    <div className="numbers-store-graphic" aria-hidden="true">
      <div className="numbers-store-graphic__inner">
        <span className="numbers-store-graphic__light" />
        {storeGraphicNodes.map((node) => (
          <span
            key={`${node.src}-${node.x}-${node.y}`}
            className="numbers-store-graphic__node"
            style={
              {
                "--node-x": `${node.x}px`,
                "--node-y": `${node.y}px`,
                "--node-w": `${node.width}px`,
                "--node-h": `${node.height}px`,
              } as CSSProperties
            }
          >
            <Image src={node.src} alt="" width={node.width} height={node.height} />
          </span>
        ))}
        <span className="numbers-store-graphic__center">
          <Image src="/images/figma-rebuilt/stores-center.png" alt="" width={190} height={191} />
        </span>
      </div>
    </div>
  );
}

function StatCard({ value, suffix, title, detail, icon, accent, delay }: StatCard) {
  return (
    <article className="numbers-card numbers-card--stat numbers-reveal" style={{ "--numbers-accent": accent, "--numbers-delay": delay } as CSSProperties}>
      <div className="numbers-card__dots" aria-hidden="true" />
      <div className="numbers-card__icon-glow" aria-hidden="true" />
      <div className="numbers-card__stat-head">
        <div>
          <Counter value={value} suffix={suffix} />
          <h3>{title}</h3>
        </div>
        <span className="numbers-card__stat-icon">
          <Image src={icon} alt="" width={80} height={80} />
        </span>
      </div>
      <p>{detail}</p>
    </article>
  );
}

export function Numbers() {
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
    <section ref={sectionRef} className="numbers-section container-1920 px-20">
      <div className="numbers-bg-pattern numbers-reveal" aria-hidden="true" style={{ "--numbers-delay": "0s" } as CSSProperties} />
      <div className="numbers-bg-light numbers-reveal" aria-hidden="true" style={{ "--numbers-delay": "0.04s" } as CSSProperties} />

      <div className="section-shell numbers-shell">
        <header className="numbers-header">
          <h2 className="numbers-title numbers-reveal" style={{ "--numbers-delay": "0.06s" } as CSSProperties}>
            Наши достижения
          </h2>
          <p className="numbers-description numbers-reveal" style={{ "--numbers-delay": "0.12s" } as CSSProperties}>
            Cartgram — это стабильная платформа для e-commerce, которую ежедневно используют бизнесы, продающие через Telegram.
          </p>
        </header>

        <div className="numbers-layout">
          <div className="numbers-top-grid">
            <article className="numbers-card numbers-card--orders numbers-reveal" style={{ "--numbers-delay": "0.18s" } as CSSProperties}>
              <div className="numbers-card__text numbers-card__text--orders">
                <Counter value={1} suffix="+ млн" duration={1.4} />
                <h3>Обработанных заявок и заказов</h3>
                <p>Заказы автоматически принимаются, фиксируются и не теряются в переписках — даже при большом потоке клиентов.</p>
              </div>
              <OrdersAnimation />
            </article>

            <article className="numbers-card numbers-card--stores numbers-reveal" style={{ "--numbers-delay": "0.24s" } as CSSProperties}>
              <div className="numbers-card__text numbers-card__text--stores">
                <Counter value={1000} suffix="+" duration={1.8} />
                <h3>Магазинов на Cartgram</h3>
                <p>Интернет-магазины и сервисы уже используют Cartgram как основу продаж через Telegram miniApp + CRM.</p>
              </div>
              <StoreGraphic />
            </article>
          </div>

          <div className="numbers-bottom-grid">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
