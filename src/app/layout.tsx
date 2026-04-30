import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cartgram Landing Page",
  description: "Cartgram — CRM landing page for Telegram e-commerce",
};

const revealScript = `
(() => {
  const init = () => {
    const sections = document.querySelectorAll(".hiw-section, .features-section");
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
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
        {children}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </body>
    </html>
  );
}
