import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Playwright Testing, Data Analytics & AI Automation Tutorials',
  description: 'Learn Playwright automation testing, data analytics with Python & Power BI, and AI agents. Free tutorials, career guides, tool comparisons, and industry insights from SkillsXAI experts.',
  keywords: [
    'playwright testing tutorial',
    'data analytics blog',
    'QA automation guides',
    'AI agents tutorial',
    'automation testing tips',
    'data analyst career guide',
    'playwright vs selenium',
    'power bi tutorial',
  ],
  openGraph: {
    title: 'Blog — Playwright Testing, Data Analytics & AI Tutorials | SkillsXAI',
    description: 'Free tutorials, career guides, and tool comparisons for QA automation, data analytics, and AI agents.',
    url: 'https://skillsxai.com/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://skillsxai.com/blog',
  },
}

const categoryColors: Record<string, string> = {
  'Playwright': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Testing': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Automation': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Selenium': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Cypress': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Data Analytics': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'SQL': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Python': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Power BI': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'AI': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Career': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'QA': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
}

export default function BlogPage() {
  const posts = getAllPosts()

  const featured = posts[0]
  const remaining = posts.slice(1)

  return (
    <div className="pt-24 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-slate-300">Blog</li>
        </ol>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Tutorials, Guides & Industry Insights
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          Learn Playwright testing, data analytics, and AI automation from industry experts. Free tutorials, career guides, and tool comparisons.
        </p>
      </div>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="block group mb-12 relative p-px rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative bg-slate-900/95 rounded-2xl p-8 md:p-10 border border-slate-700 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Featured
              </span>
              <span className="text-sm text-blue-400">{featured.date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
              {featured.title}
            </h2>
            <p className="text-slate-400 text-lg mb-6 max-w-3xl">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.tags.map(tag => (
                <span
                  key={tag}
                  className={`text-xs px-2.5 py-1 rounded-full border ${categoryColors[tag] || 'bg-slate-800 text-slate-300 border-slate-700'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {remaining.length > 0 ? (
          remaining.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group relative p-px rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative h-full bg-slate-900/90 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors flex flex-col">
                <div className="text-sm text-blue-400 mb-2">{post.date}</div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full border ${categoryColors[tag] || 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-slate-400">
            <p className="text-xl">More articles coming soon!</p>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <section className="mt-20 pt-12 border-t border-slate-800">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-4">Learn In-Demand Tech Skills</h2>
          <p className="text-slate-400 mb-4">
            Our blog covers the most sought-after tech skills in the Indian job market. Whether you are
            preparing for a QA automation role, transitioning into data analytics, or exploring AI agents
            and workflow automation, our tutorials and guides provide actionable, practical knowledge.
          </p>
          <p className="text-slate-400 mb-6">
            Every article is written by industry practitioners with hands-on experience in Playwright,
            Cypress, Selenium, Python, SQL, Power BI, n8n, and LangChain. We focus on what hiring
            managers actually look for.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/professionals/courses/qa-automation" className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
              QA Automation Course
            </Link>
            <Link href="/professionals/courses/data-analyst" className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors">
              Data Analyst Course
            </Link>
            <Link href="/professionals/courses/workflow-automation" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors">
              AI Agents Course
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
