'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export const ContactCTA = () => {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to build something amazing?
        </h2>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          I&apos;m always open to new opportunities and collaborations. Let&apos;s
          connect and create something impactful.
        </p>
        <Button asChild>
          <a href="/contact">
            <Mail className="mr-2 h-4 w-4" /> Get In Touch
          </a>
        </Button>
      </motion.div>
    </section>
  );
};
