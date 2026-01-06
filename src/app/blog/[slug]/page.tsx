import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['SkillsXAI'],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="pt-24 pb-16 px-6 sm:px-12 max-w-4xl mx-auto">
      <Link href="/blog" className="text-blue-400 hover:text-blue-300 mb-8 inline-block">
        &larr; Back to Blog
      </Link>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-slate-400">
          <time>{post.date}</time>
          <span>•</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}
