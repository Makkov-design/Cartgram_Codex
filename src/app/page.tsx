import { Header } from "@/components/layout/Header/Header";
import { Features } from "@/components/sections/Features/Features";
import { Hero } from "@/components/sections/Hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks/HowItWorks";

const placeholderSections = [
  "prices",
  "testimonials",
  "faq",
];

export default function Home() {
  return (
    <main className="bg-page text-primary">
      <Header />
      <section id="hero">
        <Hero />
      </section>

      <section id="how-it-works" className="overflow-x-clip">
        <HowItWorks />
      </section>

      <section id="features" className="overflow-x-clip">
        <Features />
      </section>

      {placeholderSections.map((id) => (
        <section key={id} id={id} aria-hidden="true" className="h-px" />
      ))}
    </main>
  );
}
