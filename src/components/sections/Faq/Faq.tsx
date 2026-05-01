"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/buttons/Button";
import styles from "./Faq.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Что такое Cartgram простыми словами?",
    answer:
      "Cartgram — это Telegram Mini App и CRM в одной системе. Вы запускаете магазин, принимаете заявки, оплаты и ведёте клиентов в одном месте без сложной разработки.",
  },
  {
    question: "Подойдёт ли Cartgram для моего бизнеса?",
    answer:
      "Да. Cartgram подходит для любых товаров и услуг, где есть заявки, оплаты и клиенты: интернет-магазины, Instagram- и Telegram-продажи, опт, сервисы, бьюти, инфобизнес. Если сомневаетесь — покажем на демо именно под ваш формат.",
  },
  {
    question: "Нужно ли разбираться в технике или нанимать программиста?",
    answer:
      "Нет. Интерфейс рассчитан на владельца бизнеса и команду без технического бэкграунда: магазин собирается через готовые настройки, а Mini App подключается без кода.",
  },
  {
    question: "Как быстро можно начать продажи?",
    answer:
      "Обычно базовый запуск занимает считанные минуты: регистрируетесь, выбираете тариф, добавляете товары и сразу отправляете клиентам ссылку на магазин.",
  },
  {
    question: "Cartgram заменит менеджеров?",
    answer:
      "Cartgram не заменяет сильную команду, а снимает с неё рутину: автоматически собирает заявки, фиксирует оплаты, обновляет статусы и помогает менеджерам работать быстрее.",
  },
  {
    question: "Безопасны ли данные клиентов и заказов?",
    answer:
      "Да. Данные клиентов, заказы и статусы хранятся централизованно в системе, а не теряются по чатам, таблицам и пересылкам между сотрудниками.",
  },
  {
    question: "Можно ли подключить несколько магазинов?",
    answer:
      "Да, если у вас несколько направлений или витрин, структуру можно развести по отдельным каталогам и процессам. На демо покажем оптимальный сценарий под вашу модель.",
  },
  {
    question: "Есть ли ограничения по количеству заказов?",
    answer:
      "Лимиты зависят от выбранного тарифа и сценария использования, но система изначально рассчитана на поток заявок и работу без ручного bottleneck в чатах.",
  },
  {
    question: "Можно ли сменить тариф позже?",
    answer:
      "Да. Если бизнес вырастет или потребуется больше возможностей, тариф можно обновить позже без перезапуска магазина с нуля.",
  },
  {
    question: "Есть ли бесплатный период или демо?",
    answer:
      "Да, можно записаться на демо-встречу. Покажем интерфейс Cartgram в работе, разберём ваш сценарий и ответим на вопросы до старта.",
  },
  {
    question: "Что если Cartgram мне не подойдёт?",
    answer:
      "Именно для этого мы проводим демо заранее: чтобы понять, совпадает ли платформа с вашим процессом продаж. Если сценарий не подходит, честно скажем об этом до подключения.",
  },
];

function HelpIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={styles.iconSvg}>
      <circle cx="24" cy="24" r="15.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M19.75 18.25C20.934 16.771 22.846 15.875 24.981 15.875C28.57 15.875 31.48 18.411 31.48 21.539C31.48 23.575 30.248 25.01 28.656 25.917C27.096 26.806 25.625 27.767 25.625 29.75V31"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25.625" cy="35.625" r="1.625" fill="currentColor" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={styles.supportSvg}>
      <path
        d="M20 7C12.82 7 7 12.82 7 20V23C7 25.209 8.791 27 11 27H12.5C13.328 27 14 26.328 14 25.5V18.5C14 17.672 13.328 17 12.5 17H10.265C11.582 12.933 15.406 10 20 10C24.594 10 28.418 12.933 29.735 17H27.5C26.672 17 26 17.672 26 18.5V25.5C26 26.328 26.672 27 27.5 27H29.75C29.259 29.629 27.005 31.625 24.25 31.625H20.875C20.047 31.625 19.375 32.297 19.375 33.125C19.375 33.953 20.047 34.625 20.875 34.625H24.25C28.849 34.625 32.625 31.26 32.97 26.76C34.2 26.182 35 24.936 35 23.5V20C35 12.82 29.18 7 22 7H20Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      className={`${styles.toggleGlyph} ${open ? styles.toggleGlyphOpen : ""}`}
    >
      <path d="M11 4V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 11H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FaqItemCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) {
  const answerId = `faq-answer-${index}`;

  return (
    <article className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}>
      <button
        type="button"
        className={styles.cardTrigger}
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className={styles.cardQuestion}>{item.question}</span>
        <span className={`${styles.toggleButton} ${isOpen ? styles.toggleButtonOpen : ""}`}>
          <PlusIcon open={isOpen} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            id={answerId}
            className={styles.cardContentWrap}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.cardContent}>
              <p>{item.answer}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

export function Faq() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className={`container-1920 ${styles.section} ${isVisible ? styles.isVisible : ""}`}
    >
      <div className={`section-shell ${styles.shell}`}>
        <aside className={styles.leftColumn}>
          <div className={styles.titleRow}>
            <div className={styles.titleIconShell} aria-hidden="true">
              <HelpIcon />
            </div>
            <h2>Часто задаваемые вопросы</h2>
          </div>

          <div className={styles.supportCard}>
            <div className={styles.supportHeading}>
              <span className={styles.supportIcon} aria-hidden="true">
                <SupportIcon />
              </span>
              <h3>Остались вопросы?</h3>
            </div>
            <p>
              Запишитесь на бесплатную демо-встречу — покажем Cartgram в работе и ответим на всё.
            </p>
            <Button className={styles.ctaButton} size="large" variant="primary">
              Оставить заявку
            </Button>
          </div>
        </aside>

        <div className={styles.rightColumn}>
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={item.question}
              className={styles.itemReveal}
              style={{ "--faq-delay": `${0.04 + index * 0.03}s` } as CSSProperties}
            >
              <FaqItemCard
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={toggle}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
