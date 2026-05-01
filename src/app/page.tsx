import { Header } from "@/components/layout/Header/Header";
import { Additionals } from "@/components/sections/Additionals/Additionals";
import { Banner } from "@/components/sections/Banner/Banner";
import { Features } from "@/components/sections/Features/Features";
import { Hero } from "@/components/sections/Hero/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks/HowItWorks";
import { Niches } from "@/components/sections/Niches/Niches";
import { Numbers } from "@/components/sections/Numbers/Numbers";
import { Prices } from "@/components/sections/Prices/Prices";
import { Steps } from "@/components/sections/Steps/Steps";
import { WhyCartgram } from "@/components/sections/WhyCartgram/WhyCartgram";

const placeholderSections = [
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

      <section id="why-cartgram" className="overflow-x-clip">
        <WhyCartgram />
      </section>

      <section id="niches" className="overflow-x-clip">
        <Niches />
      </section>

      <section id="numbers" className="overflow-x-clip">
        <Numbers />
      </section>

      <section id="prices" className="overflow-x-clip">
        <Prices />
      </section>

      <section id="additionals" className="overflow-x-clip">
        <Additionals />
      </section>

      <section id="steps" className="overflow-x-clip">
        <Steps />
      </section>

      <section id="banner" className="overflow-x-clip">
        <Banner />
      </section>

      {placeholderSections.map((id) => (
        <section key={id} id={id} aria-hidden="true" className="h-px" />
      ))}
    </main>
  );
}
