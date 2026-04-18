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
    return { title: 'Post Not Found' }
  }

  const url = `https://skillsxai.com/blog/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | SkillsXAI Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['SkillsXAI'],
      url,
      siteName: 'SkillsXAI',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: url,
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

function ArticleSchema({ post }: { post: { title: string; excerpt: string; date: string; slug: string; tags: string[] } }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'SkillsXAI', url: 'https://skillsxai.com' },
    publisher: {
      '@type': 'Organization',
      name: 'SkillsXAI',
      logo: { '@type': 'ImageObject', url: 'https://skillsxai.com/logo.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://skillsxai.com/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function RelatedCourses({ tags }: { tags: string[] }) {
  const lowerTags = tags.map(t => t.toLowerCase())

  const courses = []

  if (lowerTags.some(t => ['playwright', 'cypress', 'testing', 'qa', 'automation', 'selenium'].includes(t))) {
    courses.push({
      title: 'QA Automation with Playwright & Cypress',
      href: '/professionals/courses/qa-automation',
      duration: '8 Weeks',
      salary: '₹5L–₹18L/year',
    })
  }

  if (lowerTags.some(t => ['data', 'analytics', 'python', 'sql', 'power bi', 'tableau', 'excel'].includes(t))) {
    courses.push({
      title: 'Data Analyst with Python & Power BI',
      href: '/professionals/courses/data-analyst',
      duration: '10 Weeks',
      salary: '₹4L–₹14L/year',
    })
  }

  if (lowerTags.some(t => ['ai', 'agents', 'automation', 'n8n', 'langchain', 'chatbot'].includes(t))) {
    courses.push({
      title: 'Workflow Automation with AI Agents',
      href: '/professionals/courses/workflow-automation',
      duration: '8 Weeks',
      salary: '₹4L–₹15L/year',
    })
  }

  if (courses.length === 0) {
    courses.push({
      title: 'Explore All Courses',
      href: '/professionals',
      duration: '8-10 Weeks',
      salary: 'Up to ₹18L/year',
    })
  }

  return (
    <aside className="mt-16 pt-8 border-t border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Ready to go pro? Explore our courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link
            key={course.href}
            href={course.href}
            className="block p-5 rounded-xl border border-slate-700 bg-slate-800/50 hover:border-blue-500/50 transition-colors group"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
              {course.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>{course.duration}</span>
              <span>Expected: {course.salary}</span>
            </div>
            <div className="mt-3 text-sm text-blue-400 font-medium">
              Learn more &rarr;
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <ArticleSchema post={post} />
      <article className="pt-24 pb-16 px-6 sm:px-12 max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
            <li>/</li>
            <li className="text-slate-300 truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-400">
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true">&bull;</span>
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

        <RelatedCourses tags={post.tags} />
      </article>
    </>
  )
}
