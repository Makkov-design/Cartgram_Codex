import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cartgram — CRM для продаж в Telegram",
  description: "Cartgram — современная CRM-система для управления продажами в Telegram. Автоматизируйте заказы, покупателей и аналитику прямо внутри мессенджера.",
  keywords: ["cartgram", "crm", "telegram", "продажи", "интернет-магазин", "бот"],
  openGraph: {
    title: "Cartgram — CRM для продаж в Telegram",
    description: "Современная CRM для управления продажами в Telegram",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartgram — CRM для продаж в Telegram",
    description: "Современная CRM для управления продажами в Telegram",
  },
};

const revealPreloadScript = `
(() => {
  const root = document.documentElement;
  root.classList.add("reveal-pending");
  root.classList.add("preloader-active");
})();
`;

const revealScript = `
(() => {
  let wasPageHidden = false;
  const restoreRevealFlag = "cartgram:restore-reveal";
  const revealSectionSelector = [
    ".hiw-section",
    ".features-section",
    ".why-section",
    ".niches-section",
    ".numbers-section",
    ".prices-section",
    ".additionals-section",
    ".steps-section",
    ".banner-section"
  ].join(", ");

  const init = () => {
    const sections = document.querySelectorAll(revealSectionSelector);
    const reveal = (node) => {
      node.classList.add("is-ready", "is-visible");
    };
    const isVisible = (node) => {
      const rect = node.getBoundingClientRect();
      const height = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < height * 0.84 && rect.bottom > height * 0.08;
    };

    sections.forEach((node) => {
      if (isVisible(node)) {
        reveal(node);
      } else {
        node.classList.add("is-ready");
      }
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

      sections.forEach((node) => {
        if (!node.classList.contains("is-visible")) {
          observer.observe(node);
        }
      });
    } else {
      sections.forEach(reveal);
    }

    const heroVideo = document.querySelector("[data-hero-video]");
    if (heroVideo && typeof heroVideo.play === "function") {
      heroVideo.pause();
      heroVideo.currentTime = 0;
      window.setTimeout(() => {
        heroVideo.play().catch(() => {});
      }, 1650);
    }

    const featureMenu = document.querySelector(".features-menu");
    const featureContent = document.querySelector(".features-content");
    if (featureMenu) {
      featureMenu.addEventListener("click", (event) => {
        const button = event.target.closest("[data-feature-index]");
        if (!button) return;

        featureMenu.querySelectorAll("[data-feature-index]").forEach((item) => {
          item.classList.toggle("features-menu-button--active", item === button);
        });

        if (featureContent) {
          featureContent.classList.remove("features-content--switching");
          void featureContent.offsetWidth;
          featureContent.classList.add("features-content--switching");
        }
      });
    }
  };

  const revealRestoredPage = () => {
    document.querySelectorAll(revealSectionSelector).forEach((node) => {
      node.classList.add("is-ready", "is-visible");
    });
  };

  const restoreHeader = () => {
    const header = document.querySelector("header");
    if (!header) return;

    header.classList.remove("-translate-y-full", "opacity-0");
    header.classList.add("translate-y-0", "opacity-100");
    header.querySelectorAll(":scope > div:first-child > div").forEach((node) => {
      node.classList.remove("translate-y-3", "opacity-0");
      node.classList.add("translate-y-0", "opacity-100");
    });
  };

  const finishInitialRevealSetup = () => {
    if (document.documentElement.classList.contains("preloader-active")) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("reveal-pending");
    });
  };

  const finishPreloader = () => {
    const root = document.documentElement;
    root.classList.add("preloader-exit");

    window.setTimeout(() => {
      root.classList.remove("preloader-active", "preloader-exit", "reveal-pending");
    }, 420);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  finishInitialRevealSetup();

  if (document.documentElement.classList.contains("preloader-active")) {
    window.setTimeout(finishPreloader, 1280);
  }

  try {
    if (window.sessionStorage.getItem(restoreRevealFlag) === "1") {
      window.sessionStorage.removeItem(restoreRevealFlag);
      restoreHeader();
      revealRestoredPage();
      window.requestAnimationFrame(() => {
        restoreHeader();
        revealRestoredPage();
      });
      finishInitialRevealSetup();
    }
  } catch {}

  window.addEventListener("pagehide", () => {
    wasPageHidden = true;
    try {
      window.sessionStorage.setItem(restoreRevealFlag, "1");
    } catch {}
  });

  window.addEventListener("pageshow", (event) => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const isHistoryRestore =
      wasPageHidden || event.persisted || (navigation && navigation.type === "back_forward");

    if (isHistoryRestore) {
      restoreHeader();
      revealRestoredPage();
      window.requestAnimationFrame(() => {
        restoreHeader();
        revealRestoredPage();
      });
      finishInitialRevealSetup();
    }
  });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="antialiased">
      <body className="bg-page text-primary">
        <script dangerouslySetInnerHTML={{ __html: revealPreloadScript }} />
        <div className="site-preloader" aria-hidden="true">
          <div className="site-preloader__backdrop" />
          <div className="site-preloader__glow" />
          <div className="site-preloader__grid" />
          <div className="site-preloader__stage">
            <span className="site-preloader__ring site-preloader__ring--outer" />
            <span className="site-preloader__ring site-preloader__ring--inner" />
            <svg
              className="site-preloader__mark"
              width="76"
              height="64"
              viewBox="0 0 33 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="site-preloader__trace"
                d="M24.3718 2.81751C25.0256 2.81751 25.6526 3.07866 26.1153 3.54365L32.3923 9.85246C33.3582 10.8232 33.3582 12.399 32.3923 13.3697L18.7377 27.0923C17.5334 28.3026 15.5833 28.3026 14.379 27.0923L0.724434 13.3697C-0.24147 12.399 -0.241486 10.8232 0.724434 9.85246L7.0015 3.54365C7.46418 3.07868 8.09116 2.81752 8.74488 2.81751H12.0172C13.6004 2.81751 13.6127 5.27004 12.0346 5.27004H9.64755C8.99381 5.27004 8.36676 5.53118 7.90406 5.99618L4.06739 9.85246C2.66572 11.2634 2.66573 11.9587 4.06739 13.3697L14.379 23.7327C16.019 25.3833 17.0977 25.3833 18.7377 23.7327L29.0493 13.3697C30.451 11.9587 30.451 11.2635 29.0493 9.85246L25.2127 5.99618C24.7501 5.53119 24.123 5.27004 23.4693 5.27004H21.1962C19.6193 5.27004 19.6356 2.81751 21.2147 2.81751H24.3718Z"
                pathLength="1"
              />
              <path
                className="site-preloader__shell"
                d="M24.3718 2.81751C25.0256 2.81751 25.6526 3.07866 26.1153 3.54365L32.3923 9.85246C33.3582 10.8232 33.3582 12.399 32.3923 13.3697L18.7377 27.0923C17.5334 28.3026 15.5833 28.3026 14.379 27.0923L0.724434 13.3697C-0.24147 12.399 -0.241486 10.8232 0.724434 9.85246L7.0015 3.54365C7.46418 3.07868 8.09116 2.81752 8.74488 2.81751H12.0172C13.6004 2.81751 13.6127 5.27004 12.0346 5.27004H9.64755C8.99381 5.27004 8.36676 5.53118 7.90406 5.99618L4.06739 9.85246C2.66572 11.2634 2.66573 11.9587 4.06739 13.3697L14.379 23.7327C16.019 25.3833 17.0977 25.3833 18.7377 23.7327L29.0493 13.3697C30.451 11.9587 30.451 11.2635 29.0493 9.85246L25.2127 5.99618C24.7501 5.53119 24.123 5.27004 23.4693 5.27004H21.1962C19.6193 5.27004 19.6356 2.81751 21.2147 2.81751H24.3718Z"
              />
              <path
                className="site-preloader__core"
                d="M17.3742 0.721673L18.0355 5.85251C18.3574 8.35033 20.2709 10.3384 22.7405 10.7409L26.0397 11.2785C26.9613 11.4287 26.9614 12.7635 26.0397 12.9137L22.6056 13.4733C20.2008 13.8652 18.3154 15.7635 17.9262 18.1847L17.3704 21.6423C17.2213 22.5702 15.8955 22.5702 15.7463 21.6423L15.1905 18.1847C14.8013 15.7635 12.9159 13.8652 10.5111 13.4733L7.07699 12.9137C6.15538 12.7635 6.15538 11.4287 7.07699 11.2785L10.3763 10.7409C12.8458 10.3384 14.7593 8.35033 15.0813 5.85251L15.7426 0.721673C15.8666 -0.240558 17.2501 -0.240558 17.3742 0.721673ZM14.1756 11.1945C13.7868 11.257 13.8046 11.8231 14.1934 11.8856C15.2206 12.0506 16.0421 12.8635 16.2106 13.897C16.2752 14.2931 16.8416 14.2931 16.9062 13.897C17.0746 12.8635 17.8961 12.0506 18.9234 11.8856C19.3121 11.8231 19.3299 11.257 18.9412 11.1945C17.8017 11.0114 17.0797 10.0796 16.9347 8.9701C16.8768 8.52705 16.24 8.52705 16.1821 8.9701C16.037 10.0796 15.315 11.0114 14.1756 11.1945Z"
              />
            </svg>
            <div className="site-preloader__beam" />
          </div>
        </div>
        {children}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </body>
    </html>
  );
}
