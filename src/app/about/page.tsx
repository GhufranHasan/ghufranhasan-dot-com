import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { StarfieldBackground } from '@/components/animations/StarfieldBackground';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const skills = [
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
];

const timeline = [
  { year: '2022', event: 'Started my journey as a freelance developer.' },
  { year: '2023', event: 'Worked with several clients on exciting projects.' },
  { year: '2024', event: 'Joined a startup as a full-stack engineer.' },
  { year: '2025', event: 'Continuously learning and growing my skills.' },
];

export default function AboutPage() {
  return (
    <main className="relative">
      <StarfieldBackground />
      <Navigation />
      <div className="container mx-auto px-6 py-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
            About Me
          </h1>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-96">
              <Image
                src="https://placehold.co/600x800/png"
                alt="Ghufran Hasan"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-6 text-lg text-foreground/80">
              <p>
                Hello! I&apos;m Ghufran Hasan, a passionate full-stack developer with a
                knack for building robust and user-friendly applications. My journey
                into the world of technology began with a fascination for how
                software can solve real-world problems and enhance experiences.
              </p>
              <p>
                Over the years, I&apos;ve honed my skills across various technologies,
                from modern frontend frameworks like React and Next.js to powerful
                backend solutions with Node.js and diverse databases such as
                PostgreSQL.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My Journey
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2"></div>
            {timeline.map((item, index) => (
              <div key={index} className="relative mb-8">
                <div className="flex items-center">
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                    <p className="text-foreground/80">{item.event}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                  <div className="flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My Skills
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex flex-col items-center space-y-3"
              >
                <img src={skill.icon} alt={skill.name} className="h-12 w-12" />
                <span className="text-foreground">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}