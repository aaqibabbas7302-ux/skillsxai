import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - AI & Workflow Automation',
  description: 'Read the latest articles about AI agents, workflow automation, and the future of education.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="pt-24 pb-16 px-6 sm:px-12 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
        Latest Insights
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="block group relative p-px rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative h-full bg-slate-900/90 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors">
                <div className="text-sm text-blue-400 mb-2">{post.date}</div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full border border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-slate-400">
            <p className="text-xl">No articles yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
