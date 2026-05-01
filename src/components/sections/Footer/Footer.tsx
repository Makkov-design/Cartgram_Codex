import Image from "next/image";
import styles from "./Footer.module.css";

const NAV_LINKS = [
  { href: "#how-it-works", label: "Как работает" },
  { href: "#features", label: "Функции" },
  { href: "#prices", label: "Стоимость" },
  { href: "#testimonials", label: "Отзывы" },
  { href: "#faq", label: "FAQ" },
];

const CONTACT_LINKS = [
  {
    icon: "/images/footer/icon-mail.svg",
    title: "Email us at",
    label: "info@cartgram",
  },
  {
    icon: "/images/footer/icon-chat.svg",
    title: "Chat with our",
    label: "Support Team",
  },
];

const LEGAL_LINKS = [
  { label: "Terms of Use" },
  { label: "Privacy Policy" },
  { label: "AML / KYC Policy" },
  { label: "Risk Disclosure" },
];

const SOCIAL_LINKS = [
  { icon: "/images/footer/social-telegram.svg", label: "Telegram", mobile: true },
  { icon: "/images/footer/social-x.svg", label: "X", mobile: true },
  { icon: "/images/footer/social-linkedin.svg", label: "LinkedIn", mobile: true },
  { icon: "/images/footer/social-discord.svg", label: "Discord", mobile: true },
  { icon: "/images/footer/social-tiktok.svg", label: "TikTok", mobile: false },
  { icon: "/images/footer/social-youtube.svg", label: "YouTube", mobile: false },
  { icon: "/images/footer/social-instagram.svg", label: "Instagram", mobile: false },
  { icon: "/images/footer/social-facebook.svg", label: "Facebook", mobile: false },
  { icon: "/images/footer/social-threads.svg", label: "Threads", mobile: false },
];

export function Footer() {
  return (
    <footer className={`container-1920 ${styles.section}`}>
      <div className={styles.card}>
        <div className={styles.pattern} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.brandColumn}>
            <div className={styles.logoBlock}>
              <Image
                src="/images/logos/cartgram-logo-white.svg"
                alt="Cartgram"
                width={414}
                height={64}
                className={styles.logoDesktop}
              />
              <Image
                src="/images/logos/cartgram-logo-white.svg"
                alt="Cartgram"
                width={181}
                height={28}
                className={styles.logoMobile}
              />
              <p className={styles.tagline}>#1 SaaS CRM for Telegram Commerce</p>
            </div>

            <div className={styles.socials}>
              {SOCIAL_LINKS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  className={`${styles.resetButton} ${styles.socialLink} ${item.mobile ? styles.socialMobile : ""}`}
                >
                  <Image src={item.icon} alt="" width={32} height={32} className={styles.socialIcon} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h3>Навигация</h3>
              <div className={styles.linkList}>
                {NAV_LINKS.map((item) => (
                  <a key={item.href} href={item.href} className={styles.textLink}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.linkColumn}>
              <h3>Контакты</h3>
              <div className={styles.contactList}>
                {CONTACT_LINKS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`${styles.resetButton} ${styles.contactItem}`}
                  >
                    <span className={styles.contactIconWrap} aria-hidden="true">
                      <Image src={item.icon} alt="" width={20} height={20} className={styles.contactIcon} />
                    </span>
                    <span className={styles.contactText}>
                      <span>{item.title}</span>
                      <strong>{item.label}</strong>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.linkColumn}>
              <h3>Legal</h3>
              <div className={styles.linkList}>
                {LEGAL_LINKS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`${styles.resetButton} ${styles.textLink}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.legalNote}>
            <p>© 2025 Cartgram. Все права защищены</p>
            <p>Копирование текста или его части возможно только с разрешения правообладателя.</p>
          </div>

          <button type="button" className={`${styles.resetButton} ${styles.backToTop}`}>
            <span>Наверх</span>
            <Image
              src="/images/footer/icon-arrow-up.svg"
              alt=""
              width={16}
              height={16}
              className={styles.backToTopIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
