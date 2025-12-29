import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { StarfieldBackground } from '@/components/animations/StarfieldBackground';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Github, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  // Placeholder data - to be replaced with Prisma data
  {
    id: '1',
    title: 'Project One',
    description: 'A brief description of project one.',
    coverImage: 'https://placehold.co/600x400/png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'Project Two',
    description: 'A brief description of project two.',
    coverImage: 'https://placehold.co/600x400/png',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Project Three',
    description: 'A brief description of project three.',
    coverImage: 'https://placehold.co/600x400/png',
    techStack: ['Vue', 'Firebase', 'Chakra UI'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'Project Four',
    description: 'A brief description of project four.',
    coverImage: 'https://placehold.co/600x400/png',
    techStack: ['Angular', 'Spring Boot', 'MySQL'],
    githubUrl: '#',
    liveUrl: '#',
  },
];

export default function ProjectsPage() {
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
          My Projects
        </motion.h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/80 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary/50 text-foreground text-xs font-semibold px-2.5 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}