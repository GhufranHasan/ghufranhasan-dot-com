'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


// Placeholder for data fetching
const getSkills = async () => {
  // const skills = await prisma.skill.findMany({
  //   orderBy: { order: 'asc' },
  // });
  // return skills;
  return [
    {
      id: '1',
      name: 'TypeScript',
      category: 'Frontend',
      level: 9,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      order: 1,
    },
    {
      id: '2',
      name: 'Next.js',
      category: 'Frontend',
      level: 8,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      order: 2,
    },
    {
      id: '3',
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 9,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      order: 3,
    },
    {
      id: '4',
      name: 'React',
      category: 'Frontend',
      level: 9,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      order: 4,
    },
    {
      id: '5',
      name: 'Node.js',
      category: 'Backend',
      level: 8,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      order: 5,
    },
    {
      id: '6',
      name: 'Prisma',
      category: 'Backend',
      level: 7,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
      order: 6,
    },
    {
      id: '7',
      name: 'PostgreSQL',
      category: 'Database',
      level: 8,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      order: 7,
    },
    {
      id: '8',
      name: 'Docker',
      category: 'DevOps',
      level: 6,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      order: 8,
    },
  ];
};

export const Skills = () => {
  // const skills = await getSkills();
  const skills = [
    {
      id: '1',
      name: 'TypeScript',
      category: 'Frontend',
      level: 9,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      order: 1,
    },
    {
      id: '2',
      name: 'Next.js',
      category: 'Frontend',
      level: 8,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      order: 2,
    },
    {
      id: '3',
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 9,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      order: 3,
    },
    {
      id: '4',
      name: 'React',
      category: 'Frontend',
      level: 9,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      order: 4,
    },
    {
      id: '5',
      name: 'Node.js',
      category: 'Backend',
      level: 8,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      order: 5,
    },
    {
      id: '6',
      name: 'Prisma',
      category: 'Backend',
      level: 7,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
      order: 6,
    },
    {
      id: '7',
      name: 'PostgreSQL',
      category: 'Database',
      level: 8,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      order: 7,
    },
    {
      id: '8',
      name: 'Docker',
      category: 'DevOps',
      level: 6,
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      order: 8,
    },
  ];

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <section id="skills" className="container mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        My Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, skillIndex) => (
                      <div key={skill.id} className="flex items-center space-x-3">
                        {skill.icon && (
                          <motion.img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-8 w-8"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                          />
                        )}
                        <span className="text-foreground">{skill.name}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
