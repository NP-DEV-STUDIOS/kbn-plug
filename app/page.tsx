import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Why from "@/components/landing/Why";

export default function Home() {
  return (
    <main className="space-y-24">
      <Hero />
      <Features />
      <Why />
    </main>
  );
}
