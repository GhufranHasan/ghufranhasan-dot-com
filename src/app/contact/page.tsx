'use client';

import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { StarfieldBackground } from '@/components/animations/StarfieldBackground';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic goes here
  };

  return (
    <main className="relative">
      <StarfieldBackground />
      <Navigation />
      <section className="container mx-auto px-6 py-24 min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-foreground text-center mb-12"
        >
          Contact Me
        </motion.h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Have a question or want to work together? Fill out the form
                  below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <Input id="name" placeholder="Your Name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your Email" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your Message" rows={5} required />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-secondary" />
                  <span className="text-foreground/80">ghufran@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-secondary" />
                  <span className="text-foreground/80">+1 (123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span className="text-foreground/80">
                    City, State, Country
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Follow Me</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-6">
                <Link href="https://github.com/ghufran" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6 text-foreground/80 hover:text-foreground transition-colors" />
                </Link>
                <Link href="https://linkedin.com/in/ghufran" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6 text-foreground/80 hover:text-foreground transition-colors" />
                </Link>
                <Link href="https://twitter.com/ghufran" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-6 w-6 text-foreground/80 hover:text-foreground transition-colors" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}