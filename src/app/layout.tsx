import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Chatbot from '@/components/chatbot/Chatbot'
import ParticleBackground from '@/components/ui/ParticleBackground'
import SchemaMarkup from '@/components/seo/SchemaMarkup'

export const metadata: Metadata = {
  metadataBase: new URL('https://skillsxai.com'),
  title: {
    default: 'SkillsXAI - AI Education for Students',
    template: '%s | SkillsXAI'
  },
  description: 'Learn Workflow Automation & AI Agents. A practical learning program helping students understand how Artificial Intelligence can perform tasks, make decisions, and work automatically.',
  keywords: ['AI education', 'artificial intelligence', 'workflow automation', 'AI agents', 'student learning', 'future skills'],
  authors: [{ name: 'SkillsXAI' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'SkillsXAI - AI Education for Students',
    description: 'Learn Workflow Automation & AI Agents',
    url: 'https://skillsxai.com',
    siteName: 'SkillsXAI',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <SchemaMarkup />
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
