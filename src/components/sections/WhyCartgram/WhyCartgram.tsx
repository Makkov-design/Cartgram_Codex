"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type WhyItem = {
  title: string;
  description: string;
};

type WhyMobileItem = {
  beforeTitle: string;
  beforeDescription: string;
  afterTitle: string;
  afterDescription: string;
};

const withoutCartgram: WhyItem[] = [
  {
    title: "Ручная обработка заказов",
    description:
      "Долгие ответы, клиенты теряются в переписке. Менеджер работает по графику, продажи — нет.",
  },
  {
    title: "Хаос в финансах",
    description:
      "Деньги в Excel, чатах, заметках и скриншотах. Ручные подсчеты каждый день, неделю, месяц.",
  },
  {
    title: "Нет базы клиентов",
    description:
      "Клиенты разбросаны по чатам и аккаунтам. Непонятно, кто покупает, сколько и как часто.",
  },
  {
    title: "Отсутствие аналитики",
    description:
      "Не видно конверсию, средний чек, маржу и LTV. Решения принимаются «на ощущениях».",
  },
  {
    title: "Нет четкого учета склада",
    description:
      "Постоянные инвентаризации и ошибки. Неясно, сколько товара и денег заморожено в остатках.",
  },
  {
    title: "Рассылки через сторонние сервисы",
    description: "База клиентов в разных местах. Сложно делать точечные рассылки.",
  },
  {
    title: "Постоянная операционка 24/7",
    description:
      "Контроль менеджеров, таблицы, CRM вручную, общение с клиентами без пауз.",
  },
  {
    title: "Информация разбросана",
    description:
      "Чаты, таблицы, Trello, документы, сервисы — десятки вкладок и никакой целостной картины.",
  },
];

const withCartgram: WhyItem[] = [
  {
    title: "Автоматический прием заказов 24/7",
    description: "Клиент оформляет заказ сам в пару кликов, вы сразу видите его в CRM.",
  },
  {
    title: "Порядок в финансах",
    description: "Все расчеты в одном интерфейсе. Данные обновляются в реальном времени.",
  },
  {
    title: "Единая база клиентов",
    description: "Клиент оформляет заказ сам в пару кликов, вы сразу видите его в CRM.",
  },
  {
    title: "Полная аналитика бизнеса",
    description: "Все ключевые метрики автоматически собираются в наглядный дашборд.",
  },
  {
    title: "Автоматизированный склад",
    description: "Товар списывается сам при заказе. Остатки и стоимость всегда под контролем.",
  },
  {
    title: "Рассылки в 2 клика",
    description: "Сообщения по базе клиентов и автоматические push-уведомления по сценариям.",
  },
  {
    title: "Cartgram берет рутину на себя",
    description: "Меньше операционки — больше времени на рост и стратегию бизнеса.",
  },
  {
    title: "Единый центр управления",
    description: "Заказы, деньги, клиенты, склад и аналитика — все в одном месте.",
  },
];

const mobileItems: WhyMobileItem[] = [
  {
    beforeTitle: "Ручная обработка заказов",
    beforeDescription: "Клиенты пишут в чат, ждут ответа и теряются в переписке",
    afterTitle: "Автоматический прием заказов 24/7",
    afterDescription: "Клиент сам оформляет заказ без переписки и ожидания",
  },
  {
    beforeTitle: "Хаос в финансах",
    beforeDescription: "Деньги разбросаны по Excel, чатам и заметкам без системы",
    afterTitle: "Финансы под полным контролем",
    afterDescription: "Все деньги и показатели собраны в одном интерфейсе",
  },
  {
    beforeTitle: "Нет базы клиентов",
    beforeDescription: "Непонятно, кто покупает, сколько и как часто возвращается",
    afterTitle: "Единая база клиентов",
    afterDescription: "История, покупки и LTV каждого клиента в одной системе",
  },
  {
    beforeTitle: "Отсутствие аналитики",
    beforeDescription: "Решения принимаются на ощущениях без цифр и метрик",
    afterTitle: "Полная аналитика бизнеса",
    afterDescription: "Все ключевые метрики собраны в понятном дашборде",
  },
  {
    beforeTitle: "Проблемы со складом",
    beforeDescription: "Остатки ведутся вручную, ошибки и недостачи неизбежны",
    afterTitle: "Автоматизированный склад",
    afterDescription: "Остатки обновляются сами при каждом оформленном заказе",
  },
  {
    beforeTitle: "Сложные рассылки",
    beforeDescription: "База разбросана, сложно запускать точечные сообщения",
    afterTitle: "Рассылки в пару кликов",
    afterDescription: "Сообщения и пуши отправляются по базе за секунды",
  },
  {
    beforeTitle: "Постоянная операционка",
    beforeDescription: "Чаты, таблицы и контроль процессов забирают всё время",
    afterTitle: "Минимум ручной работы",
    afterDescription: "Система убирает рутину и освобождает время на рост",
  },
  {
    beforeTitle: "Разрозненные системы",
    beforeDescription: "Данные в разных сервисах без единой картины бизнеса",
    afterTitle: "Единый центр управления",
    afterDescription: "Заказы, клиенты и деньги находятся в одном окне",
  },
];

function pairItems(items: WhyItem[]) {
  const rows: WhyItem[][] = [];

  for (let index = 0; index < items.length; index += 2) {
    rows.push(items.slice(index, index + 2));
  }

  return rows;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.757 7.757 16.243 16.243M16.243 7.757l-8.486 8.486"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m6.5 12.5 3.75 3.75L17.5 8.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  );
}

function CompareArrow() {
  return (
    <svg viewBox="0 0 12 40" aria-hidden="true">
      <path
        d="M1 1 10 20 1 39"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function WhyCard({
  title,
  description,
  positive,
}: WhyItem & {
  positive?: boolean;
}) {
  return (
    <div className={`why-card ${positive ? "why-card--positive" : "why-card--negative"}`}>
      <div className="why-card__icon-shell" aria-hidden="true">
        {positive ? <CheckIcon /> : <CloseIcon />}
      </div>
      <div className="why-card__copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function WhyMobileCard({
  title,
  description,
  positive = false,
}: {
  title: string;
  description: string;
  positive?: boolean;
}) {
  return (
    <div className={`why-mobile-card ${positive ? "why-mobile-card--positive" : "why-mobile-card--negative"}`}>
      <div className="why-mobile-card__icon-shell" aria-hidden="true">
        {positive ? <CheckIcon /> : <CloseIcon />}
      </div>
      <div className="why-mobile-card__copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function WhyPanel({
  title,
  items,
  positive = false,
  delayOffset,
}: {
  title: string;
  items: WhyItem[];
  positive?: boolean;
  delayOffset: number;
}) {
  return (
    <article className={`why-panel ${positive ? "why-panel--positive" : "why-panel--negative"} why-reveal`}>
      <h3
        className="why-panel__title"
        style={{ "--why-delay": `${delayOffset}s` } as CSSProperties}
      >
        {title}
      </h3>
      <div className="why-panel__rows">
        {pairItems(items).map((row, rowIndex) => (
          <div
            key={`${title}-${rowIndex}`}
            className="why-row why-reveal"
            style={{ "--why-delay": `${delayOffset + 0.1 + rowIndex * 0.08}s` } as CSSProperties}
          >
            {row.map((item) => (
              <WhyCard
                key={item.title}
                title={item.title}
                description={item.description}
                positive={positive}
              />
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}

export function WhyCartgram() {
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
      { threshold: 0.18 },
    );

    observer.observe(node);
    const frame = window.requestAnimationFrame(revealIfVisible);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="why-section container-1920 px-20">
      <div className="why-bg-light why-reveal" aria-hidden="true" style={{ "--why-delay": "0s" } as CSSProperties} />
      <div className="section-shell">
        <h2
          className="why-title why-reveal"
          style={{ "--why-delay": "0.04s" } as CSSProperties}
        >
          Зачем тебе Cartgram?
        </h2>

        <div className="why-compare why-reveal" style={{ "--why-delay": "0.14s" } as CSSProperties}>
          <WhyPanel title="Без Cartgram" items={withoutCartgram} delayOffset={0.16} />
          <WhyPanel title="С Cartgram" items={withCartgram} positive delayOffset={0.24} />
        </div>

        <div className="why-mobile">
          <div className="why-mobile__header why-reveal" style={{ "--why-delay": "0.14s" } as CSSProperties}>
            <p>До</p>
            <p>После</p>
          </div>

          <div className="why-mobile__list">
            {mobileItems.map((item, index) => (
              <div
                key={item.beforeTitle}
                className="why-mobile__row why-reveal"
                style={{ "--why-delay": `${0.2 + index * 0.06}s` } as CSSProperties}
              >
                <WhyMobileCard title={item.beforeTitle} description={item.beforeDescription} />
                <div className="why-mobile__arrow" aria-hidden="true">
                  <CompareArrow />
                </div>
                <WhyMobileCard
                  title={item.afterTitle}
                  description={item.afterDescription}
                  positive
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
