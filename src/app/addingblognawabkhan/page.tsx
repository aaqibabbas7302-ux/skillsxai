'use client'

import { createPost } from '@/app/actions/blog'

export default function AddBlogPage() {
  const handleSubmit = async (formData: FormData) => {
    await createPost(formData)
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-2xl mx-auto glass p-8 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
          Add New Blog Post (Admin)
        </h1>
        
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
            <input
              type="text"
              name="excerpt"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Content (Markdown)</label>
            <textarea
              name="content"
              required
              rows={15}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="AI, Education, Guide"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Admin Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  )
}
