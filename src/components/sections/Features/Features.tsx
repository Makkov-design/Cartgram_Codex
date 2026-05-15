"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type FeatureCard = {
  title: string;
  description: string;
};

type FeatureItem = {
  title: string;
  section?: string;
  primary?: boolean;
  compact?: boolean;
  icon: "analytics" | "sales" | "team" | "stock" | "filter" | "delivery" | "mail" | "sell";
  image?: string;
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
  {
    title: "Аналитика",
    primary: true,
    icon: "analytics",
    image: "/images/features/screens/feature-01-analytics.webp",
    cards: defaultCards,
  },
  { title: "Продажи", section: "Продажи", icon: "sales", cards: defaultCards },
  {
    title: "Заказы",
    icon: "analytics",
    image: "/images/features/screens/feature-02-sales.webp",
    cards: [
      {
        title: "Все заказы в одном списке",
        description:
          "Видно статус, сумму, клиента и состав заказа без переключения между сервисами",
      },
      {
        title: "Быстрая обработка заявок",
        description:
          "Меняйте статусы, проверяйте детали и передавайте заказ в работу за пару кликов",
      },
      {
        title: "Понятная история покупок",
        description:
          "Каждый заказ связан с клиентом, товарами и оплатой, поэтому ничего не теряется",
      },
      {
        title: "Контроль продаж по дням",
        description:
          "Фильтруйте заказы по датам и быстро оценивайте нагрузку команды и выручку",
      },
    ],
  },
  {
    title: "База клиентов",
    icon: "analytics",
    image: "/images/features/screens/feature-03-clients.webp",
    cards: [
      {
        title: "Единая клиентская база",
        description:
          "Храните контакты, заказы и статусы клиентов в одном аккуратном списке",
      },
      {
        title: "Быстрый поиск покупателя",
        description:
          "Находите клиента по имени, телефону или активности и сразу открывайте карточку",
      },
      {
        title: "Сегменты для повторных продаж",
        description:
          "Выделяйте активных клиентов, новых покупателей и тех, кого стоит вернуть",
      },
      {
        title: "Больше контекста для команды",
        description:
          "Менеджеры видят историю заказов и общаются с клиентами точнее и быстрее",
      },
    ],
  },
  { title: "Сотрудники", section: "Сотрудники", icon: "team", cards: defaultCards },
  {
    title: "Сотрудники",
    icon: "analytics",
    image: "/images/features/screens/feature-04-employees.webp",
    cards: [
      {
        title: "Команда под контролем",
        description:
          "Добавляйте сотрудников и держите рабочие контакты в едином пространстве",
      },
      {
        title: "Понятные зоны ответственности",
        description:
          "Назначайте роли так, чтобы каждый видел только нужные для работы разделы",
      },
      {
        title: "Быстрый старт новичков",
        description:
          "Новый сотрудник получает доступ к системе без долгой настройки вручную",
      },
      {
        title: "Удобное управление доступом",
        description:
          "Отключайте неактуальные аккаунты и обновляйте права, когда меняется команда",
      },
    ],
  },
  {
    title: "Роли и права доступа",
    icon: "analytics",
    image: "/images/features/screens/feature-05-roles.webp",
    cards: [
      {
        title: "Гибкие роли для команды",
        description:
          "Создавайте роли под менеджеров, склад, админов и другие рабочие сценарии",
      },
      {
        title: "Доступ только к нужному",
        description:
          "Ограничивайте разделы и действия, чтобы защитить данные и процессы",
      },
      {
        title: "Меньше ошибок в работе",
        description:
          "Сотрудники не смогут случайно изменить то, что не относится к их задачам",
      },
      {
        title: "Масштабирование без хаоса",
        description:
          "Добавляйте людей и быстро назначайте им готовый набор прав",
      },
    ],
  },
  { title: "Склад", section: "Склад", icon: "stock", cards: defaultCards },
  {
    title: "Товары",
    icon: "analytics",
    image: "/images/features/screens/feature-06-goods.webp",
    cards: [
      {
        title: "Каталог всегда под рукой",
        description:
          "Ведите товары, цены, остатки и описания в одном понятном интерфейсе",
      },
      {
        title: "Быстрое обновление карточек",
        description:
          "Меняйте данные товара без таблиц и долгих ручных правок в разных местах",
      },
      {
        title: "Контроль наличия",
        description:
          "Видите остатки по товарам и заранее понимаете, что пора пополнить",
      },
      {
        title: "Готово для продаж",
        description:
          "Аккуратный каталог помогает быстрее принимать заказы и не путаться в позициях",
      },
    ],
  },
  {
    title: "Инвентарь",
    icon: "analytics",
    image: "/images/features/screens/feature-07-inventory.webp",
    cards: [
      {
        title: "Точные остатки",
        description:
          "Следите за количеством товаров и быстро находите расхождения на складе",
      },
      {
        title: "Простая инвентаризация",
        description:
          "Проверяйте позиции, фиксируйте изменения и поддерживайте порядок в учете",
      },
      {
        title: "Меньше ручной рутины",
        description:
          "Данные по товарам собраны в системе, поэтому сверка проходит быстрее",
      },
      {
        title: "Склад без сюрпризов",
        description:
          "Команда видит актуальную картину и не обещает клиентам отсутствующие товары",
      },
    ],
  },
  {
    title: "Движение товаров",
    icon: "analytics",
    image: "/images/features/screens/feature-08-movement.webp",
    cards: [
      {
        title: "История каждого перемещения",
        description:
          "Фиксируйте приходы, списания и переводы между складами в единой ленте",
      },
      {
        title: "Прозрачный учет запасов",
        description:
          "Понимайте, почему изменился остаток и кто выполнил операцию",
      },
      {
        title: "Контроль по складам",
        description:
          "Отслеживайте движение товаров между точками и быстрее закрывайте ошибки",
      },
      {
        title: "Больше доверия к цифрам",
        description:
          "Операции сохраняются в системе, поэтому остатки легче проверять и объяснять",
      },
    ],
  },
  {
    title: "Склады",
    icon: "analytics",
    image: "/images/features/screens/feature-09-warehouses.webp",
    cards: [
      {
        title: "Несколько складов в одном окне",
        description:
          "Управляйте точками хранения и сразу видьте, где лежит нужный товар",
      },
      {
        title: "Понятная структура запасов",
        description:
          "Разделяйте остатки по складам, магазинам или зонам выдачи без путаницы",
      },
      {
        title: "Быстрое пополнение",
        description:
          "Определяйте, какой склад требует поставки, и планируйте закупки точнее",
      },
      {
        title: "Удобно для роста",
        description:
          "Добавляйте новые точки по мере развития бизнеса и сохраняйте единый учет",
      },
    ],
  },
  { title: "Фильтры", section: "Фильтры", icon: "filter", cards: defaultCards },
  {
    title: "Категории и подкатегории",
    icon: "analytics",
    image: "/images/features/screens/feature-10-categories.webp",
    cards: [
      {
        title: "Навигация по каталогу",
        description:
          "Собирайте товары в категории, чтобы клиентам и команде было проще искать",
      },
      {
        title: "Глубокая структура",
        description:
          "Используйте подкатегории для больших каталогов без перегруженных списков",
      },
      {
        title: "Быстрая настройка витрины",
        description:
          "Меняйте порядок и состав категорий без разработчиков и сложных правок",
      },
      {
        title: "Аккуратный каталог",
        description:
          "Чистая структура помогает быстрее продавать и снижает вопросы покупателей",
      },
    ],
  },
  {
    title: "Доставка",
    primary: true,
    icon: "delivery",
    image: "/images/features/screens/feature-11-delivery-and-payment.webp",
    cards: [
      {
        title: "Настройки доставки",
        description:
          "Задавайте способы получения, условия и стоимость доставки под ваш формат",
      },
      {
        title: "Оплата без лишних шагов",
        description:
          "Покажите клиенту понятные варианты оплаты прямо в процессе оформления заказа",
      },
      {
        title: "Меньше вопросов от клиентов",
        description:
          "Условия доставки и оплаты видны заранее, поэтому оформление проходит спокойнее",
      },
      {
        title: "Готово к разным сценариям",
        description:
          "Настраивайте самовывоз, доставку и оплату так, как работает ваш бизнес",
      },
    ],
  },
  {
    title: "Рассылки",
    primary: true,
    icon: "mail",
    image: "/images/features/screens/feature-12-mailings.webp",
    cards: [
      {
        title: "Рассылки в пару кликов",
        description:
          "Запускайте сообщения клиентам без сторонних сервисов и сложной интеграции",
      },
      {
        title: "Возвращайте покупателей",
        description:
          "Сообщайте о новинках, акциях и важных обновлениях прямо вашей базе",
      },
      {
        title: "Понятная подготовка кампаний",
        description:
          "Соберите текст, аудиторию и отправку в одном месте, без лишней рутины",
      },
      {
        title: "Больше повторных заказов",
        description:
          "Регулярная коммуникация помогает клиентам чаще возвращаться за покупками",
      },
    ],
  },
  {
    title: "Промокоды",
    primary: true,
    icon: "sell",
    image: "/images/features/screens/feature-13-promo-codes.webp",
    cards: [
      {
        title: "Акции без разработчиков",
        description:
          "Создавайте промокоды и запускайте скидки самостоятельно в нужный момент",
      },
      {
        title: "Гибкие условия применения",
        description:
          "Настраивайте скидку, период действия и ограничения под конкретную кампанию",
      },
      {
        title: "Мотивация к покупке",
        description:
          "Промокоды помогают подтолкнуть клиента к заказу и повысить конверсию",
      },
      {
        title: "Контроль маркетинга",
        description:
          "Храните активные и завершенные акции в системе, чтобы видеть всю картину",
      },
    ],
  },
];

function isSectionItem(item: FeatureItem) {
  return Boolean(item.section);
}

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

  if (icon === "stock") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Zm0 2.1L6.5 7.2 12 10.3l5.5-3.1L12 4.1Zm-6.2 4.7v5.7l5.3 3V11.8l-5.3-3Zm7.1 8.7 5.3-3V8.8l-5.3 3v5.7Z"
        />
      </svg>
    );
  }

  if (icon === "delivery") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="M3.85569 18.7387C3.31086 18.1927 3.03844 17.5298 3.03844 16.75H1.34619V6.30775C1.34619 5.80258 1.52119 5.375 1.87119 5.025C2.22119 4.675 2.64869 4.5 3.15369 4.5H16.7692V8.30775H19.4229L22.6537 12.6348V16.75H20.8462C20.8462 17.5298 20.5729 18.1927 20.0264 18.7387C19.4801 19.2847 18.8167 19.5577 18.0362 19.5577C17.2557 19.5577 16.5929 19.2847 16.0479 18.7387C15.5031 18.1927 15.2307 17.5298 15.2307 16.75H8.65369C8.65369 17.532 8.38052 18.1954 7.83419 18.7402C7.28786 19.2852 6.62444 19.5577 5.84394 19.5577C5.06327 19.5577 4.40052 19.2847 3.85569 18.7387ZM6.77494 17.6788C7.02744 17.4263 7.15369 17.1167 7.15369 16.75C7.15369 16.3833 7.02744 16.0737 6.77494 15.821C6.52244 15.5685 6.21286 15.4423 5.84619 15.4423C5.47952 15.4423 5.16986 15.5685 4.91719 15.821C4.66469 16.0737 4.53844 16.3833 4.53844 16.75C4.53844 17.1167 4.66469 17.4263 4.91719 17.6788C5.16986 17.9314 5.47952 18.0577 5.84619 18.0577C6.21286 18.0577 6.52244 17.9314 6.77494 17.6788ZM2.84619 15.25H3.56919C3.78203 14.8795 4.08936 14.5689 4.49119 14.3183C4.89319 14.0676 5.34486 13.9423 5.84619 13.9423C6.33452 13.9423 6.78286 14.066 7.19119 14.3135C7.59952 14.561 7.91011 14.8732 8.12294 15.25H15.2692V6H3.15369C3.07686 6 3.00636 6.03208 2.94219 6.09625C2.87819 6.16025 2.84619 6.23075 2.84619 6.30775V15.25ZM18.9672 17.6788C19.2199 17.4263 19.3462 17.1167 19.3462 16.75C19.3462 16.3833 19.2199 16.0737 18.9672 15.821C18.7147 15.5685 18.4051 15.4423 18.0384 15.4423C17.6718 15.4423 17.3621 15.5685 17.1094 15.821C16.8569 16.0737 16.7307 16.3833 16.7307 16.75C16.7307 17.1167 16.8569 17.4263 17.1094 17.6788C17.3621 17.9314 17.6718 18.0577 18.0384 18.0577C18.4051 18.0577 18.7147 17.9314 18.9672 17.6788ZM16.7692 13.25H21.2499L18.6537 9.80775H16.7692V13.25Z"
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
          d="M4.30775 19.5C3.80258 19.5 3.375 19.325 3.025 18.975C2.675 18.625 2.5 18.1974 2.5 17.6923V6.30775C2.5 5.80258 2.675 5.375 3.025 5.025C3.375 4.675 3.80258 4.5 4.30775 4.5H19.6923C20.1974 4.5 20.625 4.675 20.975 5.025C21.325 5.375 21.5 5.80258 21.5 6.30775V17.6923C21.5 18.1974 21.325 18.625 20.975 18.975C20.625 19.325 20.1974 19.5 19.6923 19.5H4.30775ZM12 12.5577L4 7.44225V17.6923C4 17.7821 4.02883 17.8558 4.0865 17.9135C4.14417 17.9712 4.21792 18 4.30775 18H19.6923C19.7821 18 19.8558 17.9712 19.9135 17.9135C19.9712 17.8558 20 17.7821 20 17.6923V7.44225L12 12.5577ZM12 11L19.8463 6H4.15375L12 11ZM4 7.44225V6V17.6923C4 17.7821 4.02883 17.8558 4.0865 17.9135C4.14417 17.9712 4.21792 18 4.30775 18H4V7.44225Z"
        />
      </svg>
    );
  }

  if (icon === "sell") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill={color}
          d="M20.9578 14.202L14.202 20.9578C14.0203 21.1384 13.8159 21.274 13.5887 21.3645C13.3616 21.4548 13.1351 21.5 12.9093 21.5C12.6833 21.5 12.4572 21.4548 12.2312 21.3645C12.0052 21.274 11.8019 21.1384 11.6213 20.9578L3.027 12.373C2.8565 12.209 2.726 12.0165 2.6355 11.7955C2.54517 11.5745 2.5 11.342 2.5 11.098V4.31725C2.5 3.81758 2.67658 3.38975 3.02975 3.03375C3.38308 2.67792 3.81225 2.5 4.31725 2.5H11.098C11.3395 2.5 11.5734 2.549 11.7998 2.647C12.0263 2.74483 12.2225 2.87658 12.3885 3.04225L20.9578 11.627C21.1409 11.8087 21.2745 12.013 21.3585 12.24C21.4425 12.4672 21.4845 12.6949 21.4845 12.9233C21.4845 13.1516 21.4425 13.3761 21.3585 13.5968C21.2745 13.8176 21.1409 14.0193 20.9578 14.202ZM13.1328 19.9038L19.8885 13.148C19.9525 13.084 19.9845 13.0087 19.9845 12.922C19.9845 12.8355 19.9525 12.7602 19.8885 12.6962L11.2078 4.0095H4.31725C4.22758 4.0095 4.15225 4.03842 4.09125 4.09625C4.03042 4.15392 4 4.22758 4 4.31725V11.0828C4 11.1213 4.00642 11.1597 4.01925 11.198C4.03208 11.2365 4.0545 11.2718 4.0865 11.3038L12.6808 19.9038C12.7449 19.9679 12.8203 20 12.9068 20C12.9933 20 13.0686 19.9679 13.1328 19.9038ZM6.525 7.77875C6.87367 7.77875 7.16983 7.65725 7.4135 7.41425C7.657 7.17125 7.77875 6.87608 7.77875 6.52875C7.77875 6.17892 7.65725 5.88158 7.41425 5.63675C7.17125 5.39175 6.87608 5.26925 6.52875 5.26925C6.17892 5.26925 5.88158 5.39133 5.63675 5.6355C5.39175 5.87967 5.26925 6.17617 5.26925 6.525C5.26925 6.87367 5.39133 7.16983 5.6355 7.4135C5.87967 7.657 6.17617 7.77875 6.525 7.77875Z"
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

function MenuChevron({ expanded = false }: { expanded?: boolean }) {
  return (
    <span
      className={[
        "features-menu-chevron",
        expanded ? "features-menu-chevron--expanded" : "",
      ].join(" ")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z"
        />
      </svg>
    </span>
  );
}

function DesktopMenuButton({
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
  const isSection = isSectionItem(item);
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
      {content}
    </button>
  );
}

export function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeItem = featureItems[activeIndex];
  const activeCards = activeItem.cards;
  const activeImage = activeItem.image ?? "/images/features/screens/feature-01-analytics.webp";

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
    const handlePointerDown = (event: PointerEvent) => {
      if (!isMobileMenuOpen) {
        return;
      }

      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      const clickedMenu = mobileMenuRef.current?.contains(target);
      const clickedTrigger = mobileTriggerRef.current?.contains(target);

      if (!clickedMenu && !clickedTrigger) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  const handleSelectFeature = (index: number) => {
    setActiveIndex(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <section ref={sectionRef} className="features-section container-1920 px-20" id="features">
      <div className="features-bg-pattern features-reveal" aria-hidden="true" />
      <div className="features-bg-light features-reveal" aria-hidden="true" />

      <div className="section-shell">
        <h2 className="features-title features-reveal">Возможности платформы</h2>

        <div className="features-slider">
          <aside className="features-sidebar features-reveal" aria-label="Разделы возможностей">
            <div className="features-menu">
              {featureItems.map((item, index) => (
                <DesktopMenuButton
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  active={index === activeIndex}
                  onClick={() => handleSelectFeature(index)}
                />
              ))}
            </div>
            <p className="features-note">
              CRM, товары, клиенты, склад, аналитика и автоматизация - всё в одной
              системе.
            </p>
          </aside>

          <div className="features-content features-reveal" key={activeIndex}>
            <div className="features-mobile-nav">
              <button
                ref={mobileTriggerRef}
                type="button"
                className={[
                  "features-mobile-trigger",
                  isMobileMenuOpen ? "features-mobile-trigger--open" : "",
                ].join(" ")}
                aria-expanded={isMobileMenuOpen}
                aria-haspopup="listbox"
                aria-controls="features-mobile-menu"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                <span className="features-mobile-trigger__content">
                  <span className="features-mobile-trigger__icon" aria-hidden="true">
                    <FeatureIcon icon={activeItem.icon} active />
                  </span>
                  <span className="features-mobile-trigger__label">{activeItem.title}</span>
                </span>
                <MenuChevron expanded={isMobileMenuOpen} />
              </button>

              <div
                ref={mobileMenuRef}
                id="features-mobile-menu"
                className={[
                  "features-mobile-menu",
                  isMobileMenuOpen ? "features-mobile-menu--open" : "",
                ].join(" ")}
                role="listbox"
                aria-hidden={!isMobileMenuOpen}
              >
                {featureItems.map((item, index) => {
                  const isSection = isSectionItem(item);
                  const isActive = index === activeIndex;
                  const showsIcon = item.compact || item.primary;

                  if (isSection) {
                    return (
                      <div className="features-mobile-menu__group" key={`${item.title}-${index}`}>
                        <span className="features-mobile-menu__group-main">
                          <span className="features-mobile-menu__icon" aria-hidden="true">
                            <FeatureIcon icon={item.icon} active={false} />
                          </span>
                          <span className="features-mobile-menu__label">{item.title}</span>
                        </span>
                        <MenuChevron />
                      </div>
                    );
                  }

                  return (
                    <button
                      type="button"
                      key={`${item.title}-${index}`}
                      className={[
                        "features-mobile-option",
                        item.compact ? "features-mobile-option--compact" : "",
                        isActive ? "features-mobile-option--active" : "",
                      ].join(" ")}
                      onClick={() => handleSelectFeature(index)}
                      role="option"
                      aria-selected={isActive}
                    >
                      <span className="features-mobile-option__inner">
                        {showsIcon ? (
                          <span className="features-mobile-menu__icon" aria-hidden="true">
                            <FeatureIcon icon={item.icon} active={isActive} />
                          </span>
                        ) : null}
                        {!showsIcon ? (
                          <span className="features-mobile-option__dot" aria-hidden="true" />
                        ) : null}
                        <span className="features-mobile-menu__label">{item.title}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="features-graphic">
              <Image
                src={activeImage}
                alt={`Раздел ${activeItem.title} в Cartgram`}
                width={1290}
                height={726}
                className="features-graphic-image"
                sizes="(max-width: 600px) 358px, (max-width: 900px) 696px, (max-width: 1440px) 931px, 1316px"
              />
            </div>

            <div className="features-card-grid">
              {activeCards.map((card, index) => (
                <article
                  className="features-info-card features-card-reveal"
                  key={card.title}
                  style={
                    {
                      "--features-card-delay": `${0.46 + index * 0.08}s`,
                    } as CSSProperties
                  }
                >
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
