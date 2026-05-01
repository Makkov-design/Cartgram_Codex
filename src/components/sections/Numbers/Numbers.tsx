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

const orders: OrderItem[] = [
  { id: "ID 82931", customer: "@Ivan", amount: "€124.55", status: "Принято", icon: "/images/numbers/order-icon-wait.svg", tone: "gold" },
  { id: "ID 20471", customer: "@Alex", amount: "€56.45", status: "Отправка", icon: "/images/numbers/order-icon-sent.svg", tone: "blue" },
  { id: "ID 55109", customer: "@Anna", amount: "€96.50", status: "Оплачено", icon: "/images/numbers/order-icon-done.svg", tone: "violet" },
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
      <Image
        src="/images/numbers/stores-graphic.png"
        alt=""
        width={436}
        height={332}
        className="numbers-store-graphic__img"
      />
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
