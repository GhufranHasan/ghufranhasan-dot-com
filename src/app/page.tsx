'use client'; // Ensure this is at the top if not already (for client-side hooks)

import dynamic from 'next/dynamic';

// Dynamically import with SSR disabled
const StarfieldBackground = dynamic(
  () => import('@/components/animations/StarfieldBackground'), // Adjust path to your component
  { ssr: false }
);

// import { StarfieldBackground } from "@/components/animations/StarfieldBackground";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/shared/Footer";
import { Navigation } from "@/components/shared/Navigation";


export default function Home() {
  return (
    <main className="relative">
      <StarfieldBackground /> {/* Now client-only */}
      <Navigation />
      <Hero />
      <Projects />
      <Skills />
      <ContactCTA />
      <Footer />
    </main>
  );
}