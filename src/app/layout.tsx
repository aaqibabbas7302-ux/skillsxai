import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Chatbot from '@/components/chatbot/Chatbot'
import ParticleBackground from '@/components/ui/ParticleBackground'

export const metadata: Metadata = {
  title: 'SkillsXAI - AI Education for Students',
  description: 'Learn Workflow Automation & AI Agents. A practical learning program helping students understand how Artificial Intelligence can perform tasks, make decisions, and work automatically.',
  keywords: ['AI education', 'artificial intelligence', 'workflow automation', 'AI agents', 'student learning', 'future skills'],
  authors: [{ name: 'SkillsXAI' }],
  openGraph: {
    title: 'SkillsXAI - AI Education for Students',
    description: 'Learn Workflow Automation & AI Agents',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ParticleBackground />
        <Navbar />
        <main className="content-container min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}
