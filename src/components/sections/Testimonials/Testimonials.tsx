"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import styles from "./Testimonials.module.css";

type TestimonialItem = {
  videoSrc: string;
  name: string;
  about: string;
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    videoSrc: "/videos/testimonials/feedback 1.mp4",
    name: "Алексей",
    about: "Владелец интернет-магазина одежды",
  },
  {
    videoSrc: "/videos/testimonials/feedback 2.mp4",
    name: "Мария",
    about: "Владелец интернет-магазина одежды",
  },
  {
    videoSrc: "/videos/testimonials/feedback 3.mp4",
    name: "Дмитрий",
    about: "Руководитель сервисного бизнеса",
  },
  {
    videoSrc: "/videos/testimonials/feedback 4.mp4",
    name: "Сергей “Excel” Плотников",
    about: "Бывший жрец таблиц",
  },
  {
    videoSrc: "/videos/testimonials/feedback 5.mp4",
    name: "Иван “Складской”",
    about: "Владелец e-commerce проекта",
  },
  {
    videoSrc: "/videos/testimonials/feedback 6.mp4",
    name: "Максим “На парковке” Ковалёв",
    about: "Серьезный владелец e-commerce бизнеса",
  },
  {
    videoSrc: "/videos/testimonials/feedback 7.mp4",
    name: "Магистр Альдрик из Бухгалтерии",
    about: "Алхимик и торговец",
  },
  {
    videoSrc: "/videos/testimonials/feedback 8.mp4",
    name: "OPT-47 (Optimus Protocol Unit)",
    about: "Гуманоидный аналитический робот Tesla",
  },
  {
    videoSrc: "/videos/testimonials/feedback 9.mp4",
    name: "Zlörg Vantaxx",
    about: "Верховный оператор межгалактической торговли",
  },
];

const PAGE_STARTS = [0, 2, 4, 6, 8];

function QuoteIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={styles.quoteIcon}>
      <path
        d="M26.667 13.333H16c-2.946 0-5.333 2.388-5.333 5.334v18.666C10.667 40.279 13.054 42.667 16 42.667h10.667c2.945 0 5.333-2.388 5.333-5.334V26.667c0-2.945-2.388-5.334-5.333-5.334h-5.334v-2.666c0-1.473 1.194-2.667 2.667-2.667h2.667V13.333ZM53.333 13.333H42.667c-2.946 0-5.334 2.388-5.334 5.334v18.666c0 2.946 2.388 5.334 5.334 5.334h10.666c2.946 0 5.334-2.388 5.334-5.334V26.667c0-2.945-2.388-5.334-5.334-5.334H48v-2.666c0-1.473 1.194-2.667 2.667-2.667h2.666V13.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={styles.playGlyph}>
      <path d="M31 24.5L55 40L31 55.5V24.5Z" fill="currentColor" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktopHoverMode, setIsDesktopHoverMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeIndex = isDesktopHoverMode ? hoveredIndex : selectedIndex;

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
      { threshold: 0.18 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 1181px) and (hover: hover) and (pointer: fine)");

    const syncMode = () => {
      const nextIsDesktop = mediaQuery.matches;
      setIsDesktopHoverMode(nextIsDesktop);

      if (nextIsDesktop) {
        setSelectedIndex(null);
      } else {
        setHoveredIndex(null);
      }
    };

    syncMode();
    mediaQuery.addEventListener("change", syncMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMode);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === activeIndex) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => undefined);
        }
        return;
      }

      video.pause();
      video.currentTime = 0;
    });
  }, [activeIndex]);

  const handleCardMouseEnter = (index: number) => {
    if (!isDesktopHoverMode) {
      return;
    }

    setHoveredIndex(index);
  };

  const handleCardMouseLeave = () => {
    if (!isDesktopHoverMode) {
      return;
    }

    setHoveredIndex(null);
  };

  const handleCardClick = (index: number) => {
    if (isDesktopHoverMode) {
      return;
    }

    setSelectedIndex((current) => (current === index ? null : index));
  };

  const handlePageChange = (nextPage: number) => {
    setHoveredIndex(null);
    setSelectedIndex(null);
    setCurrentPage(Math.max(0, Math.min(PAGE_STARTS.length - 1, nextPage)));
  };

  return (
    <section
      ref={sectionRef}
      className={`container-1920 ${styles.section} ${isVisible ? styles.isVisible : ""}`}
    >
      <div className={`section-shell ${styles.shell}`}>
        <div className={styles.info}>
          <div className={styles.infoPattern} aria-hidden="true" />
          <div className={styles.infoText}>
            <QuoteIcon />
            <h2>Что говорят предприниматели о Cartgram?</h2>
            <p>
              Владельцы магазинов и сервисов делятся, как Cartgram упростил приём заказов и навёл
              порядок в цифрах — без Excel и ручной рутины.
            </p>
          </div>

          <div className={styles.controlsDesktop}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Предыдущие отзывы"
              disabled={currentPage === 0}
            >
              <ArrowRightIcon className={styles.navIconLeft} />
            </button>

            <div className={styles.pagination} aria-label="Навигация по отзывам">
              {PAGE_STARTS.map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  className={`${styles.paginationDot} ${pageIndex === currentPage ? styles.paginationDotActive : ""}`}
                  onClick={() => handlePageChange(pageIndex)}
                  aria-label={`Перейти к слайду ${pageIndex + 1}`}
                  aria-pressed={pageIndex === currentPage}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navButton}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Следующие отзывы"
              disabled={currentPage === PAGE_STARTS.length - 1}
            >
              <ArrowRightIcon className={styles.navIconRight} />
            </button>
          </div>
        </div>

        <div className={styles.mobileHeader}>
          <QuoteIcon />
          <h2>Что говорят предприниматели о Cartgram?</h2>
        </div>

        <div className={styles.sliderBlock}>
          <div className={styles.sliderViewport}>
            <div
              className={styles.sliderTrack}
              style={{ "--testimonials-offset": PAGE_STARTS[currentPage] } as CSSProperties}
            >
              {TESTIMONIALS.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <button
                    key={item.videoSrc}
                    type="button"
                    className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
                    onMouseEnter={() => handleCardMouseEnter(index)}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={() => handleCardClick(index)}
                    aria-label={`Видео-отзыв: ${item.name}`}
                  >
                    <span className={`${styles.cardFrame} ${isActive ? styles.cardFrameActive : ""}`}>
                      <video
                        ref={(node) => {
                          videoRefs.current[index] = node;
                        }}
                        className={styles.video}
                        src={item.videoSrc}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />

                      <span className={`${styles.playButton} ${isActive ? styles.playButtonActive : ""}`}>
                        <span className={styles.playRing} />
                        <PlayIcon />
                      </span>

                      <span className={styles.videoShade} aria-hidden="true" />

                      <span className={`${styles.meta} ${isActive ? styles.metaActive : ""}`}>
                        <span className={styles.avatar} aria-hidden="true">
                          <span className={styles.avatarInitials}>{getInitials(item.name)}</span>
                        </span>
                        <span className={styles.metaText}>
                          <strong>{item.name}</strong>
                          <span>{item.about}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.controlsMobile}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Предыдущие отзывы"
              disabled={currentPage === 0}
            >
              <ArrowRightIcon className={styles.navIconLeft} />
            </button>

            <div className={styles.pagination} aria-label="Навигация по отзывам">
              {PAGE_STARTS.map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  className={`${styles.paginationDot} ${pageIndex === currentPage ? styles.paginationDotActive : ""}`}
                  onClick={() => handlePageChange(pageIndex)}
                  aria-label={`Перейти к слайду ${pageIndex + 1}`}
                  aria-pressed={pageIndex === currentPage}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navButton}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Следующие отзывы"
              disabled={currentPage === PAGE_STARTS.length - 1}
            >
              <ArrowRightIcon className={styles.navIconRight} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
