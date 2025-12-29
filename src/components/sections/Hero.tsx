'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="container mx-auto px-6 py-24 md:py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Ghufran Hasan
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
          Full-Stack Developer crafting beautiful and performant web
          applications.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild>
            <a href="/projects">
              View My Work <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/contact">Get In Touch</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
