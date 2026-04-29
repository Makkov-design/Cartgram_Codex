# ТЕХНИЧЕСКОЕ ЗАДАНИЕ v4.0 — ФИНАЛЬНАЯ ВЕРСИЯ
# Лендинг Cartgram (vibecode) — Готово к автономной разработке

---

## ⚡ СТАРТ — ЧТО ДЕЛАТЬ В ПЕРВЫЕ 30 МИНУТ

**Шаг 1. Проверить наличие всего необходимого перед стартом:**
```
□ Figma Desktop открыта с файлом "Cartgram (vibecode)"
□ Dev Mode MCP Server включён в Figma (Preferences → Enable Dev Mode MCP Server)
□ В папке проекта лежит шрифт: public/fonts/TTFirsNeueTrl/*.woff2
□ GitHub репозиторий клонирован локально
□ .env.local создан (скопировать из .env.example, заполнить FORMSPREE ID)
```

**Если шрифта нет → СТОП**, написать заказчику. Без шрифта вёрстка невозможна.

**Шаг 2. Инициализация проекта:**
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
npm install gsap @gsap/react framer-motion lottie-react react-countup react-intersection-observer swiper
npm install -D sharp prettier
```

**Шаг 3. Настройка и проверка:**
```bash
npm run dev   # убедиться что localhost:3000 открывается
```

**Шаг 4. Начать с Фазы 0** (раздел 10 этого документа).

---

## 1. ДОСТУПЫ И ИНСТРУМЕНТЫ

### 1.1 Figma — Dev Mode MCP

**File Key:** `36Oq1qcJFIV0kwgcqasM73`

**Как агент использует Figma:**
- Инструмент: `get_design_context` с параметрами `fileKey` + `nodeId`
- Инструмент: `get_metadata` — для получения структуры слоёв (обзор фрейма)
- Ассеты (SVG, PNG) доступны по URL: `http://localhost:3845/assets/{hash}`
- Видеофайлы доступны по URL: `http://localhost:3845/_videos/v1/{hash}`

**⚠️ Важно:** Figma MCP работает ТОЛЬКО когда Figma Desktop запущена и файл открыт. При закрытии Figma — MCP недоступен. Если инструмент не отвечает → написать заказчику.

**Все Node ID для работы:**

| Что | Node ID |
|---|---|
| UI-Kit (компоненты, иконки) | `27:4` |
| 1920 Part 1 (Header, Hero, How It Works, Features) | `927:1338` |
| 1920 Part 2 (Why Cartgram, Niches, Numbers) | `3003:6901` |
| 1920 Part 3 (Prices, Comparison, Additionals) | `3003:11112` |
| 1920 Part 4 (Steps, Banner, Testimonials, FAQ, Footer) | `3003:13163` |
| 1440 (весь лендинг) | `1267:2062` |
| 390 (весь лендинг) | `1303:6411` |
| Header | `927:1937` |
| Hero | `1120:6293` |
| Hero видео-блок | `1120:6387` |
| How It Works | `927:1438` |
| Features | `1117:4181` |
| Why Cartgram | `3003:7117` |
| Niches | `3003:7230` |
| Numbers | `3003:7243` |
| Prices | `3003:11417` |
| Detailed Comparison | `3003:11669` |
| Additionals | `3003:11937` |
| Steps | `3003:13859` |
| Banner | `3003:13875` |
| Testimonials | `3003:13897` |
| FAQ | `3003:13898` |
| Footer | `3003:13923` |
| Contact Form (модал) | `697:1713` |
| btn-primary-big-1 | `647:1709` |
| btn-primary-big-2 | `647:1622` |
| secondary-btn-big | `647:1780` |
| btn-primary-small | `653:578` |
| btn-secondary-small | `653:655` |
| menu-btn | `119:1105` |
| chips | `699:2187` |
| faq card | `632:601` |
| niche card | `702:2271` |
| niche card lights (цвета) | `716:3805` |
| orders animation | `727:5105` |
| feedback player | `623:8198` |
| step card | `977:6987` |
| addition option | `964:3769` |
| testimonials slider | `707:2579` |
| badge | `132:270` |
| icon_btn | `699:2165` |
| Логотип (полный) | `578:6879` |

### 1.2 GitHub

**URL репозитория:** `https://github.com/Makkov-design/Cartgram`

```bash
# Клонировать репозиторий:
git clone https://github.com/Makkov-design/Cartgram .

# Если репо пустой — связать локальный проект:
git remote add origin https://github.com/Makkov-design/Cartgram
git branch -M main
git push -u origin main
```

### 1.3 Vercel (Hobby — бесплатный план)

**Цель:** демонстрация клиенту по публичной ссылке. Hobby план полностью достаточен.

**Первое подключение (один раз, делает заказчик):**
1. Зайти на vercel.com → New Project
2. Импортировать репозиторий с GitHub
3. Framework Preset: **Next.js** (определится автоматически)
4. Environment Variables → добавить `NEXT_PUBLIC_FORMSPREE_ID`
5. Deploy → получить URL вида `cartgram-xyz.vercel.app`

**Далее автоматически:** каждый `git push` в ветку `main` → Vercel пересобирает и обновляет сайт по той же ссылке.

**Ссылка для клиента:** `https://cartgram-xyz.vercel.app` _(уточнить после первого деплоя)_

> После демонстрации клиент забирает код к себе и деплоит на собственную инфраструктуру. Hetzner и Nginx на этом этапе не нужны.

### 1.4 Formspree

1. Создать аккаунт на formspree.io
2. Создать новую форму → получить Form ID (вида `xxxxxxxz`)
3. Вставить в `.env.local`: `NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxz`
4. Endpoint: `https://formspree.io/f/{FORM_ID}`

### 1.5 Шрифт TT Firs Neue Trl

**Добавляет заказчик** в папку `public/fonts/TTFirsNeueTrl/` перед стартом разработки.

Ожидаемые файлы:
```
public/fonts/TTFirsNeueTrl/
├── TTFirsNeueTrl-Light.woff2       (weight: 300)
├── TTFirsNeueTrl-Regular.woff2     (weight: 400)
├── TTFirsNeueTrl-Medium.woff2      (weight: 500)
├── TTFirsNeueTrl-SemiBold.woff2    (weight: 600, если используется)
└── TTFirsNeueTrl-Bold.woff2        (weight: 700, если используется)
```

Если файлов нет — **СТОП**, написать заказчику.

### 1.6 Видеофайлы

Видео получаются через Figma MCP ассет-сервер (`localhost:3845`) или скачиваются напрямую из Figma.

| Видео | Где взять | Куда положить |
|---|---|---|
| Hero (1 раз, замирает) | Из Figma node `1120:6387` | `public/videos/hero-demo.mp4` |
| How It Works — телефон (loop) | Из Figma node `927:1438` | `public/videos/how-it-works-mobile.mp4` |
| How It Works — ноутбук | Заглушка (пока нет) | `public/videos/how-it-works-desktop.mp4` |
| Banner (loop) | Из Figma node `3003:13875` | `public/videos/banner-loop.mp4` |
| Отзывы (5 видео) | Из Figma node `623:8198`, путь: `/_videos/v1/...` | `public/videos/testimonials/review-{1-5}.mp4` |

Если видеофайл недоступен через MCP → использовать заглушку (черный/серый прямоугольник) и пометить в README как TODO.

---

## 2. СТРУКТУРА ПРОЕКТА (ДЕТАЛЬНАЯ)

```
cartgram/
├── public/
│   ├── fonts/
│   │   └── TTFirsNeueTrl/
│   │       ├── TTFirsNeueTrl-Regular.woff2
│   │       └── TTFirsNeueTrl-Medium.woff2
│   ├── images/
│   │   ├── hero/                   # hero mockup, bg элементы
│   │   ├── how-it-works/           # phone/laptop mockup
│   │   ├── features/               # скриншоты для каждого пункта меню
│   │   ├── niches/                 # иллюстрации для niche cards
│   │   ├── numbers/                # иконки, графики
│   │   ├── steps/                  # иллюстрации шагов
│   │   ├── testimonials/           # аватары пользователей
│   │   └── logos/                  # логотипы партнёров (если есть)
│   ├── videos/
│   │   ├── hero-demo.mp4           # 1 раз, freeze on last frame
│   │   ├── how-it-works-mobile.mp4 # loop
│   │   ├── how-it-works-desktop.mp4 # placeholder
│   │   ├── banner-loop.mp4         # loop
│   │   └── testimonials/
│   │       ├── review-1.mp4
│   │       ├── review-2.mp4
│   │       ├── review-3.mp4
│   │       ├── review-4.mp4
│   │       └── review-5.mp4
│   ├── lottie/
│   │   └── orders-animation.json   # Orders animation (если через Lottie)
│   ├── favicon.ico
│   └── og-image.png               # 1200×630px для OpenGraph
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: шрифты, мета, ContactModal провайдер
│   │   ├── page.tsx               # Сборка всех секций
│   │   └── globals.css            # → src/styles/globals.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── NavButton.tsx  # Компонент с hover-анимацией текста
│   │   │   └── Footer/
│   │   │       └── Footer.tsx
│   │   │
│   │   ├── sections/              # Каждая секция = отдельная папка
│   │   │   ├── Hero/
│   │   │   ├── HowItWorks/
│   │   │   ├── Features/
│   │   │   ├── WhyCartgram/
│   │   │   ├── Niches/
│   │   │   ├── Numbers/
│   │   │   ├── Prices/
│   │   │   ├── Additionals/
│   │   │   ├── Steps/
│   │   │   ├── Banner/
│   │   │   ├── Testimonials/
│   │   │   ├── Faq/
│   │   │   └── Footer/
│   │   │
│   │   └── ui/                   # Переиспользуемые компоненты
│   │       ├── buttons/
│   │       │   ├── BtnPrimary.tsx
│   │       │   ├── BtnSecondary.tsx
│   │       │   └── BtnText.tsx
│   │       ├── ContactModal/
│   │       │   ├── ContactModal.tsx
│   │       │   ├── ContactForm.tsx
│   │       │   └── NicheChips.tsx
│   │       ├── FeedbackPlayer.tsx
│   │       ├── FaqCard.tsx
│   │       ├── NicheCard.tsx
│   │       └── icons/            # SVG иконки как React компоненты
│   │
│   ├── context/
│   │   └── ContactModalContext.tsx  # Глобальный стейт модала
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts    # Переиспользуемые GSAP анимации
│   │   └── useContactModal.ts       # Хук для открытия/закрытия модала
│   │
│   └── styles/
│       └── globals.css
│
├── deploy/
│   └── nginx.conf
├── .env.example
├── .env.local                    # Не коммитить!
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── README.md
```

---

## 3. КОНФИГУРАЦИОННЫЕ ФАЙЛЫ

### next.config.ts
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // обязательно для static export
  },
};

export default nextConfig;
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      'sm': '390px',
      'md': '768px',
      'lg': '1440px',
      'xl': '1920px',
    },
    extend: {
      fontFamily: {
        sans: ['TT Firs Neue Trl', 'sans-serif'],
      },
      colors: {
        'bg-page':         '#0b0b0d',
        'bg-section':      '#17171a',
        'bg-inverted':     '#e6e6f2',
        'text-primary':    '#e6e6f2',
        'text-secondary':  '#bebecc',
        'text-tertiary':   '#a0a0b2',
        'text-muted':      '#8a8a99',
        'text-super-muted':'#595966',
        'text-inverted':   '#17171a',
        'stroke-medium':   '#2c2c33',
        'stroke-dim':      '#17171a',
      },
      borderRadius: {
        'xs':   '8px',
        's':    '12px',
        'xl':   '24px',
        'xxl':  '32px',
        'full': '9999px',
      },
      spacing: {
        '4.5': '18px',
      },
    },
  },
  plugins: [],
};

export default config;
```

### .env.example
```bash
# Formspree — ID формы с formspree.io/f/{ID}
NEXT_PUBLIC_FORMSPREE_ID=
```

### .gitignore
```
node_modules/
.next/
out/
.env.local
.env.*.local
*.log
.DS_Store
```

### deploy/nginx.conf
```nginx
server {
    listen 80;
    server_name cartgram.ru www.cartgram.ru;
    root /var/www/cartgram/out;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml image/svg+xml font/woff2;
    gzip_min_length 256;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    location ~* \.(js|css|woff2|woff|png|jpg|webp|svg|ico|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.html$ {
        add_header Cache-Control "no-cache";
    }
}
```

### README.md
```markdown
# Cartgram — Landing Page

## Запуск

1. Установить зависимости:
```bash
npm install
```

2. Создать `.env.local` из шаблона:
```bash
cp .env.example .env.local
# Заполнить NEXT_PUBLIC_FORMSPREE_ID
```

3. Запустить dev-сервер:
```bash
npm run dev
# → http://localhost:3000
```

## Сборка
```bash
npm run build
```

## Деплой
Vercel: автоматически при push в `main`. Ссылка для клиента: `https://cartgram-xyz.vercel.app`

> Hetzner/Nginx — только когда клиент забирает проект на продакшн (не сейчас).

## Шрифт
Положить файлы `*.woff2` в `public/fonts/TTFirsNeueTrl/`

## Прогресс разработки

### Фаза 0 — Setup
- [ ] Проект инициализирован
- [ ] Токены и переменные настроены
- [ ] Шрифт подключён

### Фаза 1 — Desktop 1920px
- [ ] Header
- [ ] ContactModal (глобальный)
- [ ] Hero
- [ ] How It Works
- [ ] Features
- [ ] Why Cartgram
- [ ] Niches
- [ ] Numbers
- [ ] Prices + Comparison
- [ ] Additionals
- [ ] Steps
- [ ] Banner
- [ ] Testimonials
- [ ] FAQ
- [ ] Footer
- [ ] GSAP анимации
- [ ] Форма Formspree

### Фаза 2 — Адаптивность
- [ ] 1440px
- [ ] 390px
- [ ] 768px tablet
- [ ] Burger menu

### Фаза 3 — Финализация
- [ ] WebP оптимизация
- [ ] Lighthouse ≥ 90
- [ ] Safari тесты
- [ ] Vercel деплой
```

---

## 4. ДИЗАЙН-ТОКЕНЫ (ВСЕ РЕАЛЬНЫЕ ЗНАЧЕНИЯ ИЗ FIGMA)

### globals.css — полная версия
```css
@font-face {
  font-family: 'TT Firs Neue Trl';
  src: url('/fonts/TTFirsNeueTrl/TTFirsNeueTrl-Light.woff2') format('woff2');
  font-weight: 300; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'TT Firs Neue Trl';
  src: url('/fonts/TTFirsNeueTrl/TTFirsNeueTrl-Regular.woff2') format('woff2');
  font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'TT Firs Neue Trl';
  src: url('/fonts/TTFirsNeueTrl/TTFirsNeueTrl-Medium.woff2') format('woff2');
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'TT Firs Neue Trl';
  src: url('/fonts/TTFirsNeueTrl/TTFirsNeueTrl-SemiBold.woff2') format('woff2');
  font-weight: 600; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'TT Firs Neue Trl';
  src: url('/fonts/TTFirsNeueTrl/TTFirsNeueTrl-Bold.woff2') format('woff2');
  font-weight: 700; font-style: normal; font-display: swap;
}

:root {
  /* COLORS */
  --color-bg-page:          #0b0b0d;
  --color-bg-section:       #17171a;
  --color-bg-inverted:      #e6e6f2;
  --color-text-primary:     #e6e6f2;
  --color-text-secondary:   #bebecc;
  --color-text-tertiary:    #a0a0b2;
  --color-text-muted:       #8a8a99;
  --color-text-super-muted: #595966;
  --color-text-inverted:    #17171a;
  --color-icon-primary:     #e6e6f2;
  --color-stroke-medium:    #2c2c33;
  --color-stroke-dim:       #17171a;

  /* RADIUS */
  --radius-xs:   8px;
  --radius-s:    12px;
  --radius-xl:   24px;
  --radius-xxl:  32px;
  --radius-full: 9999px;

  /* SPACING */
  --space-4:  4px;
  --space-8:  8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;
  --space-40: 40px;
  --space-80: 80px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  background-color: var(--color-bg-page);
  color: var(--color-text-primary);
}

body {
  font-family: 'TT Firs Neue Trl', sans-serif;
  font-weight: 400;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Блокировка скролла при открытом модале */
body.modal-open { overflow: hidden; }

/* ===================== UTILITIES ===================== */

/* Градиентный текст (brand) */
.gradient-text {
  background: linear-gradient(90deg, #9999ff 29.327%, #98cbff 57.692%, #a1e5e5 81.731%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Градиентная обводка карточек */
.gradient-border { position: relative; }
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(153,153,255,0.4), rgba(161,229,229,0.4));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Backdrop blur с Safari поддержкой */
.glass {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Типографика — ПОЛНАЯ ТАБЛИЦА (из Figma)

| Токен | Размер | Вес | Line-height | Применение |
|---|---|---|---|---|
| `heading/h1` | **64px** | 500 | 1.0 | Hero заголовок |
| `heading/h2` | **56px** | 500 | 1.0 | Заголовки секций, названия тарифов |
| `heading/h5` | **28px** | 500 | 1.2 | Подзаголовки, вопросы FAQ, заголовок формы |
| `heading/h6` | **20px** | 500 | 1.2 | Мелкие заголовки внутри карточек |
| `body/large` | **20px** | 400 | 1.4 | Hero subheader, описания |
| `body/small` | **16px** | 400 | 1.4 | Обычный текст, placeholder формы |
| `body/extra-small` | **14px** | 400 | 1.4 | Мелкие подписи, должность в отзывах |
| `label/medium` | **16px** | 500 | 1.0 | Текст кнопок, nav-пункты |
| `label/small` | **14px** | 500 | 1.0 | Текст chips, badge |

> h3 и h4 в проекте не обнаружены — при необходимости определить самостоятельно как промежуточные между h2 и h5.

### Brand gradient
```css
/* Текстовый градиент */
background: linear-gradient(90deg, #9999ff 29.327%, #98cbff 57.692%, #a1e5e5 81.731%);

/* Названия тарифных планов (отдельный эффект — shimmer) */
background: linear-gradient(115.46deg, rgba(153,153,255,0) 7.27%, #e6e6f2 23.33%, #e6e6f2 66.64%, rgba(153,153,255,0) 100.27%);
```

### Цвета niche cards (6 штук, точные hex)

| Карточка | Border | Glow цвет | Glow blur |
|---|---|---|---|
| type=1 (Ниша 1) | `#98cbff` | `#98cbff` | 100px |
| type=2 (Ниша 2) | `#f199ff` | `#f199ff` | 100px |
| type=3 (Ниша 3) | `#ffbd99` | `#ffbd99` | 100px |
| type=4 (Ниша 4) | `#f7ff8d` | `#f7ff8d` | 100px |
| type=5 (Ниша 5) | `#99ffaf` | `#99ffaf` | 100px |
| type=6 (Ниша 6) | `#576dff` | `#576dff` | 100px |

Glow позиция: `top: -66px`, `left: 36px`, `width: 90px`, `height: 100px`.

---

## 5. ГЛОБАЛЬНЫЕ МЕХАНИКИ

### 5.1 ContactModal — провайдер (Context API)

```typescript
// src/context/ContactModalContext.tsx
'use client';
import { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    document.body.classList.add('modal-open');
  };
  const close = () => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export const useContactModal = () => useContext(ContactModalContext);
```

```typescript
// src/app/layout.tsx — обернуть в провайдер
export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ContactModalProvider>
          {children}
          <ContactModal />  {/* Глобально */}
        </ContactModalProvider>
      </body>
    </html>
  );
}
```

**CTA кнопки, открывающие модал:**
- Header: "Регистрация"
- Hero: "Открыть магазин"
- Steps шаг 1: "Создать магазин"
- Banner: основная кнопка
- FAQ left: "Оставить заявку"

**НЕ открывают модал:**
- Hero: "Посмотреть демо" → `#testimonials`
- Header: "Вход" → `href="#"` (заглушка)

### 5.2 Плавный якорный скролл

```typescript
// При клике на nav-ссылки и CTA с якорями
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80; // высота sticky header
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};
```

---

## 6. СЕКЦИИ — id АТРИБУТЫ И СТРУКТУРА page.tsx

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main>
      <Header />                                          {/* sticky */}
      <section id="hero">          <Hero />        </section>
      <section id="how-it-works">  <HowItWorks />  </section>
      <section id="features">      <Features />    </section>
      <section id="why-cartgram">  <WhyCartgram /> </section>
      <section id="niches">        <Niches />      </section>
      <section id="numbers">       <Numbers />     </section>
      <section id="prices">        <Prices />      </section>
      <section id="additionals">   <Additionals /> </section>
      <section id="steps">         <Steps />       </section>
      <section id="banner">        <Banner />      </section>
      <section id="testimonials">  <Testimonials /></section>
      <section id="faq">           <Faq />         </section>
      <Footer />
    </main>
  );
}
```

**Якорная навигация Header:**
| Пункт меню | href | id секции |
|---|---|---|
| Как работает | `#how-it-works` | `how-it-works` |
| Функции | `#features` | `features` |
| Стоимость | `#prices` | `prices` |
| Отзывы | `#testimonials` | `testimonials` |
| FAQ | `#faq` | `faq` |

---

## 7. СПЕЦИФИКАЦИЯ СЕКЦИЙ

### 7.1 HEADER (node `927:1937`)

**Layout:**
```
Высота: 72px | Padding: 0 80px | z-index: 100
Position: sticky top-0
Border-bottom: 1px solid rgba(230,230,242,0.05)
```

**Scroll-эффект (срабатывает при scrollY > 50px):**
```css
/* По умолчанию */
background: transparent;
backdrop-filter: none;

/* При скролле */
background: rgba(11, 11, 13, 0.8);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
transition: all 0.3s ease;
```

**Nav-кнопки — hover механика (overflow clip + translateY):**
```css
/* Контейнер кнопки */
.nav-btn {
  height: 40px; padding: 0 20px;
  border-radius: 8px; overflow: hidden;
  transition: background 0.2s, border-radius 0.2s, border 0.2s;
}
.nav-btn:hover {
  background: rgba(230,230,242,0.05);
  border: 1px solid rgba(230,230,242,0.05);
  border-radius: 12px;
}
/* Блок с двумя копиями текста */
.nav-btn-text {
  height: 16px; overflow: clip;
  display: flex; flex-direction: column;
  transition: transform 0.25s ease;
}
.nav-btn:hover .nav-btn-text { transform: translateY(-16px); }
.nav-btn-text span:first-child { color: #bebecc; line-height: 1; }
.nav-btn-text span:last-child  { color: #e6e6f2; line-height: 1; }
```

---

### 7.2 HERO (node `1120:6293`)

**Контент offer (node `1120:6304`):**
- Badge: `#1 CRM для e-commerce в Telegram` — pill, backdrop-blur, border #e6e6f2
- H1: heading/h1 (64px), "Контролируй все заказы, деньги и клиентов " + `<span class="gradient-text">в единой системе</span>`
- SVG подчёркивание под градиентным текстом (node `1120:6310`)
- Subheader: body/large (20px, #a0a0b2), 2 строки
- Кнопки: "Открыть магазин" (primary → modal) | "Посмотреть демо" (secondary → `#testimonials`)

**Видео-блок (node `1120:6387`) — "UI video-demo":**
```tsx
const videoRef = useRef<HTMLVideoElement>(null);
useEffect(() => { videoRef.current?.play(); }, []);

<video ref={videoRef} muted playsInline preload="auto"
  style={{ width: '100%', borderRadius: 'var(--radius-xxl)' }}>
  <source src="/videos/hero-demo.mp4" type="video/mp4" />
</video>
// loop={false} по умолчанию → замирает на последнем кадре
```

**Floating rectangles** (3 прямоугольника вокруг видео, bg light):
- Абсолютные позиции из Figma: `52,684` / `82,644` / `115,604`
- Каждый: border с акцентным цветом, полупрозрачный, pointer-events: none

**Page load анимация:**
```typescript
const tl = gsap.timeline({ delay: 0.2 });
tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.5 })
  .from(h1Ref.current,    { y: 30, opacity: 0, duration: 0.7 }, "-=0.3")
  .from(subRef.current,   { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
  .from(btnsRef.current,  { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
  .from(videoRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.2");
```

---

### 7.3 HOW IT WORKS (node `927:1438`) id="how-it-works"

**Левая колонка — телефон с видео (autoplay + loop):**
```tsx
<video autoPlay muted loop playsInline className="w-full h-full object-cover">
  <source src="/videos/how-it-works-mobile.mp4" type="video/mp4" />
</video>
```
Маска через `border-radius` + `overflow: hidden` по форме экрана iPhone.

**Правая колонка — ноутбук с кликабельным плеером:**
```tsx
const [playing, setPlaying] = useState(false);
// До клика — статичный placeholder с иконкой play
// После клика — video element с controls
```
Заглушка: скриншот интерфейса или серый прямоугольник с иконкой ▶.

---

### 7.4 FEATURES (node `1117:4181`) id="features"

**Механика:** клик на пункт в левой навигации → меняет контент справа.

```tsx
const [activeIndex, setActiveIndex] = useState(0);

// Левая панель: feature menu (428px)
// Правая панель: AnimatePresence смена контента
<AnimatePresence mode="wait">
  <motion.div key={activeIndex}
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
    <FeatureContent item={features[activeIndex]} />
  </motion.div>
</AnimatePresence>
```

Контент для каждого пункта: большой скриншот (1316×797px) + 4 карточки снизу.
Все пункты меню и их контент — читать из Figma node `1117:4803`.

---

### 7.5 WHY CARTGRAM (node `3003:7117`)

Статика. 2 колонки × 8 пунктов. Левая: иконки ✗, правая: иконки ✓.

---

### 7.6 NICHES (node `3003:7230`) — PARALLAX СКРОЛЛ

```typescript
// GSAP scrub — привязка движения к прогрессу скролла
gsap.to(topRowRef.current, {
  x: -500, ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom", end: "bottom top", scrub: true
  }
});
gsap.to(bottomRowRef.current, {
  x: 500, ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top bottom", end: "bottom top", scrub: true
  }
});
```

Hover карточки: border становится цветным + glow (цвета см. раздел 4).
Все 6 карточек и их темы — читать из Figma node `3003:7234`.

---

### 7.7 NUMBERS (node `3003:7243`)

Счётчики через `react-countup` + `react-intersection-observer`.

**Orders Animation** (node `727:5105`) — 9 состояний, зацикленная:
```typescript
// GSAP timeline (бесконечный цикл)
const frames = [frame1, frame2, ...frame9]; // массив ref
gsap.set(frames.slice(1), { autoAlpha: 0 });
const tl = gsap.timeline({ repeat: -1 });
frames.forEach((frame, i) => {
  const next = frames[(i + 1) % frames.length];
  tl.to(frame, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" })
    .to(next,  { autoAlpha: 1, duration: 0.4, ease: "power2.inOut" }, "<")
    .to({}, { duration: 0.8 });
});
```

---

### 7.8 PRICES (node `3003:11417`) id="prices"

**4 плана:** Start, Plus, Prime (Best Value), Business.
**Enterprise:** отдельная строка снизу.
**Toggle:** Помесячно / Годично (экономия 20%). Переключает цены с анимацией.
**Detailed Comparison Table** (node `3003:11669`): 20 строк, иконки check/close.

Названия планов (стиль — shimmer gradient, читать из Figma node `3003:11461`):
```css
background: linear-gradient(115.46deg, rgba(153,153,255,0) 7.27%,
  #e6e6f2 23.33%, #e6e6f2 66.64%, rgba(153,153,255,0) 100.27%);
-webkit-background-clip: text; color: transparent;
```

---

### 7.9 ADDITIONALS (node `3003:11937`)

Сетка 2×4 карточек `addition option`. Все детали — читать из Figma.

---

### 7.10 STEPS (node `3003:13859`)

4 шага. Шаг 1 содержит кнопку **"Создать магазин"** → открывает ContactModal.
Компонент `step` (node `977:6987`) — читать из Figma.

---

### 7.11 BANNER (node `3003:13875`)

Правая сторона — **зацикленная** анимация/видео (`loop autoPlay muted playsInline`).
Левая: заголовок + текст + CTA кнопка → ContactModal.
Декор: corner lights + line lights (абсолютные SVG элементы из Figma).

---

### 7.12 TESTIMONIALS (node `3003:13897`) id="testimonials"

**Swiper слайдер:**
```tsx
<Swiper
  modules={[Navigation]}
  slidesPerView={1}
  initialSlide={0}   // стартует с 1-го
  loop={false}       // не зацикливать
  navigation={{
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }}
  onSlideChange={(s) => {
    // Управление состоянием кнопок prev/next
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  }}
>
```

**Кнопка "назад" на первом слайде — визуально неактивна** (dim opacity).
После первого свайпа — обе кнопки активны.
`overflow: hidden` на контейнере.

**Feedback Player hover (node `623:8134` → `623:8199`):**
```tsx
onMouseEnter={() => { setHovered(true); videoRef.current?.play(); }}
onMouseLeave={() => { setHovered(false); videoRef.current?.pause(); videoRef.current.currentTime = 0; }}
```

Default state: аватар 56px внизу слева, play button по центру (крупный).
Hover state: видео играет, аватар 40px вверху, play button 200px по центру.
Видео файлы: `public/videos/testimonials/review-{1-5}.mp4` (из Figma).

---

### 7.13 FAQ (node `3003:13898`) id="faq"

**Sticky левая колонка:**
```css
.faq-left {
  position: sticky;
  top: 88px; /* 72px header + 16px gap */
  align-self: flex-start;
}
```

**Аккордеон — одна карточка за раз:**
```tsx
const [open, setOpen] = useState<number | null>(null);
const toggle = (i: number) => setOpen(prev => prev === i ? null : i);
```

Анимация высоты через Framer Motion `animate={{ height: isOpen ? 'auto' : 0 }}`.

Кнопка "Оставить заявку" → `openContactModal()`.

---

### 7.14 CONTACT FORM MODAL (node `697:1713`)

**Структура поля формы:**
- "Как к вам обращаться?" — input, иконка person, placeholder
- "Ваша почта" — input, иконка mail, type="email"
- "Название компании (необязательно)" — input
- "Расскажите о вашем проекте" — textarea, 143px

**Chips нише (5 штук):** "E-commerce" | "Бьюти / FMCG" | "Опт и дистрибуция" | "Услуги" | "Другое"

Chips selected state (node `699:2191`): ширина 143px (vs 119px default), иконка галочки, стиль — читать из Figma.

**Кнопка submit:** "Отправить форму" + иконка `arrow_circle_right`.

**Formspree интеграция:**
```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setStatus('sending');
  const data = new FormData(e.currentTarget);
  data.append('niche', selectedNiche);
  const res = await fetch(
    `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
    { method: 'POST', body: data, headers: { Accept: 'application/json' } }
  );
  setStatus(res.ok ? 'success' : 'error');
};
```

---

### 7.15 FOOTER (node `3003:13923`)

Все навигационные ссылки — якоря к секциям (работающие).
Иконки соц.сетей — `href="#"` (заглушки).
Legal ссылки (Terms, Privacy, Policy, Contacts) — `href="#"` (заглушки).
Текст копирайта — точно из Figma.

---

## 8. АНИМАЦИИ

### 8.1 Инициализация GSAP (каждая секция)
```typescript
useEffect(() => {
  const ctx = gsap.context(() => { /* анимации */ }, sectionRef);
  return () => ctx.revert();
}, []);
```

### 8.2 Стандартные (fade-in + translateY)
```typescript
gsap.from(el, { y: 60, opacity: 0, duration: 0.8, ease: "power3.out",
  scrollTrigger: { trigger: section, start: "top 80%" } });
```

### 8.3 Niches parallax (scrub, ±500px)
```typescript
gsap.to(topRow, { x: -500, ease: "none",
  scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } });
gsap.to(bottomRow, { x: 500, ease: "none",
  scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } });
```

### 8.4 Primary button hover
```css
transition: border-radius 0.3s ease;
/* default: 8px → hover: 24px */
/* Стрелка: 2 копии, translateX slide-through эффект */
```

### 8.5 Правила
- Только `transform` + `opacity` (GPU)
- Easing: `power3.out` (вход), `power2.inOut` (переходы)
- `prefers-reduced-motion` → отключать всё

---

## 9. АДАПТИВНОСТЬ

| px | Дизайн |
|---|---|
| 390 | ✅ Figma `1303:6411` |
| 768 | ⚠️ Разработать самостоятельно |
| 1440 | ✅ Figma `1267:2062` |
| 1920 | ✅ Figma Parts 1–4 |

**Safari обязательные фиксы:**
```css
-webkit-backdrop-filter: blur(12px);
height: 100dvh; /* вместо 100vh */
```

---

## 10. СТРАТЕГИЯ ИТЕРАЦИЙ

### Фаза 0 — Setup (один раз)
1. `npx create-next-app@latest . --typescript --tailwind --app --src-dir`
2. `npm install gsap @gsap/react framer-motion lottie-react react-countup react-intersection-observer swiper`
3. Создать структуру папок из раздела 2
4. Перенести globals.css, tailwind.config.ts, next.config.ts из ТЗ
5. Подключить шрифт (`@font-face` в globals.css)
6. Создать ContactModalContext
7. Проверить `npm run dev` → localhost:3000
8. `git commit -m "chore: project setup"`

### Фаза 1 — Desktop 1920px (секция за секцией)
Порядок строго по списку:
```
ContactModal (глобальный компонент)
→ Header
→ Hero
→ How It Works
→ Features
→ Why Cartgram
→ Niches
→ Numbers
→ Prices + Detailed Comparison
→ Additionals
→ Steps
→ Banner
→ Testimonials
→ FAQ
→ Footer
→ Все GSAP scroll-анимации
→ Formspree интеграция
```
После каждой секции: `git commit`, `npm run build`, обновить README.

### Фаза 2 — Адаптивность
1440px → 390px → 768px (самостоятельно) → Burger menu

### Фаза 3 — Финализация
WebP → Lighthouse → Safari → Vercel deploy

---

## 11. ПРАВИЛА АГЕНТА

**Автономные решения (не спрашивать):**
- Easing-значения анимаций
- Tablet 768px layout (между 390 и 1440)
- Дизайн бургер-меню (тёмная тема, TT Firs Neue Trl)
- Выбор видеозаглушки для ноутбука
- Способ реализации (CSS vs JS) при идентичном визуале

**Обязательная остановка при:**
- `npm run build` не проходит с критической ошибкой
- Figma MCP недоступен и нужен критический ассет
- Шрифта нет в папке
- Неоднозначность в механике взаимодействия

**Коммиты:**
```
chore: project setup
chore: design tokens, fonts, CSS variables
feat: ContactModal — global component
feat: Header — 1920px
feat: Hero — 1920px
feat: HowItWorks — 1920px
...
feat: responsive — 1440px
feat: responsive — 390px
feat: responsive — 768px tablet
feat: burger menu
fix: safari compatibility
chore: image optimization WebP
release: v1.0.0
```

---

## 12. ЧЕКЛИСТ ПРИЁМКИ

**Дизайн**
- [ ] Pixel-perfect 1920px, 1440px, 390px
- [ ] Tablet 768px органичен
- [ ] Все bg_pattern / bg_light воспроизведены
- [ ] Градиентный текст h1 (#9999ff→#98cbff→#a1e5e5)
- [ ] Glow + backdrop-blur (Safari тоже!)
- [ ] Gradient borders карточек
- [ ] Шрифт TT Firs Neue Trl корректно

**Функциональность**
- [ ] ContactModal открывается со всех CTA
- [ ] Backdrop blur модала, закрытие X/Escape/backdrop
- [ ] Chips: enabled/hover/selected
- [ ] Форма отправляет на Formspree
- [ ] Все состояния формы: sending/success/error
- [ ] Features: смена контента при клике
- [ ] Prices toggle месяц/год
- [ ] FAQ аккордеон (одна за раз)
- [ ] Testimonials Swiper (prev недоступен на старте)
- [ ] Якорная навигация с плавным скроллом
- [ ] Sticky header + scroll-blur эффект
- [ ] Sticky FAQ левая колонка
- [ ] Burger menu mobile/tablet

**Видео**
- [ ] Hero: 1 раз, freeze на последнем кадре
- [ ] How It Works телефон: autoplay loop
- [ ] How It Works ноутбук: клик → плеер
- [ ] Banner: loop
- [ ] Testimonials: видео на hover feedback player

**Анимации**
- [ ] Nav hover: текст scroll-up + bg
- [ ] Header scroll-blur
- [ ] Niches: parallax ±500px
- [ ] Niche cards: цветной hover
- [ ] Orders animation: 9 состояний loop
- [ ] Счётчики (Numbers)
- [ ] GSAP scroll-fade на всех секциях
- [ ] Hero page-load stagger
- [ ] Primary btn: radius 8→24px + стрелка
- [ ] prefers-reduced-motion

**Производительность**
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] LCP < 2.5s, CLS < 0.1
- [ ] WebP + lazy loading (hero: priority)
- [ ] Нет горизонтального скролла на mobile

**Кросс-браузерность**
- [ ] Chrome, Firefox, Edge
- [ ] Safari macOS (backdrop-filter, шрифты)
- [ ] Safari iOS (100dvh, -webkit- префиксы)

**Код и деплой**
- [ ] `npm run build` без ошибок
- [ ] `npm run lint` без ошибок
- [ ] .env.example заполнен
- [ ] README актуален
- [ ] Задеплоено на Vercel
- [ ] Все ассеты грузятся без 404

---

*ТЗ v4.0 — исчерпывающий документ для полностью автономной итерационной разработки. Единственный источник правды по визуалу — Figma (fileKey `36Oq1qcJFIV0kwgcqasM73`, инструмент `get_design_context`).*
