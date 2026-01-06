'use server'

import fs from 'fs'
import path from 'path'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const tags = formData.get('tags') as string
  const password = formData.get('password') as string

  // Simple security check (you might want to enhance this)
  if (password !== 'skillsxai2026') {
    return { error: 'Invalid password' }
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const date = new Date().toISOString().split('T')[0]
  const tagList = tags.split(',').map(t => t.trim()).filter(t => t)
  const tagString = JSON.stringify(tagList)

  const mdContent = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
tags: ${tagString}
---

${content}
`

  const postsDir = path.join(process.cwd(), 'content/posts')
  
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  const filePath = path.join(postsDir, `${slug}.md`)
  fs.writeFileSync(filePath, mdContent)

  redirect(`/blog/${slug}`)
}
