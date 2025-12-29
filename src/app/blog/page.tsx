import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { StarfieldBackground } from '@/components/animations/StarfieldBackground';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Empty array for now, to be replaced with Prisma data
const posts: any[] = [];

export default function BlogPage() {
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
          Blog
        </motion.h1>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold text-foreground/80">
              No posts yet.
            </h2>
            <p className="text-foreground/60 mt-2">
              Stay tuned for my thoughts on web development, design, and more.
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-t-lg"
                        />
                      </div>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/blog/${post.slug}`}>
                      <CardTitle className="mb-2 hover:text-secondary transition-colors">
                        {post.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-primary/50 text-foreground text-xs font-semibold px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-foreground/60 mt-4">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}