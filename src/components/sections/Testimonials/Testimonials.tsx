"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/icons/ArrowRightIcon";
import styles from "./Testimonials.module.css";

type TestimonialItem = {
  videoSrc: string;
  name: string;
  about: string;
  avatarSrc?: string;
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    videoSrc: "/videos/testimonials/feedback 1.mp4",
    name: "Алексей",
    about: "Владелец интернет-магазина одежды",
    avatarSrc: "/images/testimonials/avatars/aleksei.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 2.mp4",
    name: "Мария",
    about: "Владелец интернет-магазина одежды",
    avatarSrc: "/images/testimonials/avatars/maria.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 3.mp4",
    name: "Дмитрий",
    about: "Руководитель сервисного бизнеса",
    avatarSrc: "/images/testimonials/avatars/dmitrii.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 4.mp4",
    name: "Сергей “Excel” Плотников",
    about: "Бывший жрец таблиц",
    avatarSrc: "/images/testimonials/avatars/sergei.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 5.mp4",
    name: "Иван “Складской”",
    about: "Владелец e-commerce проекта",
    avatarSrc: "/images/testimonials/avatars/ivan.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 6.mp4",
    name: "Максим “На парковке” Ковалёв",
    about: "Серьезный владелец e-commerce бизнеса",
    avatarSrc: "/images/testimonials/avatars/maksim.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 7.mp4",
    name: "Магистр Альдрик из Бухгалтерии",
    about: "Алхимик и торговец",
    avatarSrc: "/images/testimonials/avatars/aldrik.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 8.mp4",
    name: "OPT-47 (Optimus Protocol Unit)",
    about: "Гуманоидный аналитический робот Tesla",
    avatarSrc: "/images/testimonials/avatars/opt47.png",
  },
  {
    videoSrc: "/videos/testimonials/feedback 9.mp4",
    name: "Zlörg Vantaxx",
    about: "Верховный оператор межгалактической торговли",
    avatarSrc: "/images/testimonials/avatars/zlorg.png",
  },
];

const PAGE_STARTS = [0, 2, 4, 6, 8];
const MOBILE_PAGE_STARTS = TESTIMONIALS.map((_, index) => index);

function QuoteIcon() {
  return (
    <Image
      src="/images/testimonials/quote-left.svg"
      alt=""
      width={100}
      height={100}
      aria-hidden="true"
      className={styles.quoteIcon}
    />
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
  const [isMobileSliderMode, setIsMobileSliderMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeIndex = isDesktopHoverMode ? hoveredIndex : selectedIndex;
  const pageStarts = isMobileSliderMode ? MOBILE_PAGE_STARTS : PAGE_STARTS;
  const currentPageIndex = Math.min(currentPage, pageStarts.length - 1);

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
    const mobileSliderQuery = window.matchMedia("(max-width: 1180px)");

    const syncMode = () => {
      const nextIsDesktop = mediaQuery.matches;
      setIsDesktopHoverMode(nextIsDesktop);
      setIsMobileSliderMode(mobileSliderQuery.matches);

      if (nextIsDesktop) {
        setSelectedIndex(null);
      } else {
        setHoveredIndex(null);
      }
    };

    syncMode();
    mediaQuery.addEventListener("change", syncMode);
    mobileSliderQuery.addEventListener("change", syncMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMode);
      mobileSliderQuery.removeEventListener("change", syncMode);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) {
        return;
      }

      if (index === activeIndex) {
        video.currentTime = 0;
        video.muted = false;
        video.volume = 1;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => undefined);
        }
        return;
      }

      video.pause();
      video.muted = true;
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
    setCurrentPage(Math.max(0, Math.min(pageStarts.length - 1, nextPage)));
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
              onClick={() => handlePageChange(currentPageIndex - 1)}
              aria-label="Предыдущие отзывы"
              disabled={currentPageIndex === 0}
            >
              <ArrowRightIcon className={styles.navIconLeft} />
            </button>

            <div className={styles.pagination} aria-label="Навигация по отзывам">
              {pageStarts.map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  className={`${styles.paginationDot} ${pageIndex === currentPageIndex ? styles.paginationDotActive : ""}`}
                  onClick={() => handlePageChange(pageIndex)}
                  aria-label={`Перейти к слайду ${pageIndex + 1}`}
                  aria-pressed={pageIndex === currentPageIndex}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navButton}
              onClick={() => handlePageChange(currentPageIndex + 1)}
              aria-label="Следующие отзывы"
              disabled={currentPageIndex === pageStarts.length - 1}
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
              style={{ "--testimonials-offset": pageStarts[currentPageIndex] } as CSSProperties}
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
                          {item.avatarSrc ? (
                            <Image
                              className={styles.avatarImage}
                              src={item.avatarSrc}
                              alt=""
                              width={56}
                              height={56}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span className={styles.avatarInitials}>{getInitials(item.name)}</span>
                          )}
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
              onClick={() => handlePageChange(currentPageIndex - 1)}
              aria-label="Предыдущие отзывы"
              disabled={currentPageIndex === 0}
            >
              <ArrowRightIcon className={styles.navIconLeft} />
            </button>

            <div className={styles.pagination} aria-label="Навигация по отзывам">
              {pageStarts.map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  type="button"
                  className={`${styles.paginationDot} ${pageIndex === currentPageIndex ? styles.paginationDotActive : ""}`}
                  onClick={() => handlePageChange(pageIndex)}
                  aria-label={`Перейти к слайду ${pageIndex + 1}`}
                  aria-pressed={pageIndex === currentPageIndex}
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.navButton}
              onClick={() => handlePageChange(currentPageIndex + 1)}
              aria-label="Следующие отзывы"
              disabled={currentPageIndex === pageStarts.length - 1}
            >
              <ArrowRightIcon className={styles.navIconRight} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
