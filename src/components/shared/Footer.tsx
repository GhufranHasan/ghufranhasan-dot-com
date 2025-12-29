'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-transparent py-12">
      <div className="container mx-auto px-6 flex flex-col items-center justify-between md:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-foreground/80 text-center md:text-left mb-4 md:mb-0">
            © 2024 Ghufran Hasan. All rights reserved.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex space-x-6"
        >
          <Link href="https://github.com/ghufran" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6 text-foreground/80 hover:text-foreground transition-colors" />
          </Link>
          <Link href="https://linkedin.com/in/ghufran" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6 text-foreground/80 hover:text-foreground transition-colors" />
          </Link>
          <Link href="https://twitter.com/ghufran" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 text-foreground/80 hover:text-foreground transition-colors" />
          </Link>
        </motion.div>
      </div>
    </footer>
  );
};
