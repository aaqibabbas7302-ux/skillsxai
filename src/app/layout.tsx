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
    default: 'SkillsXAI — AI Education & Career-Ready Tech Courses | India',
    template: '%s | SkillsXAI'
  },
  description: 'India\'s leading AI education platform. Job-ready courses in QA Automation with Playwright, Data Analytics with Python & Power BI, and Workflow Automation with AI Agents. 100% placement assistance.',
  keywords: [
    'AI education India',
    'QA automation course',
    'playwright testing course',
    'data analyst course India',
    'automation testing course with placement',
    'AI agents course',
    'workflow automation',
    'data analytics course online',
    'cypress testing course',
    'power bi course India',
  ],
  authors: [{ name: 'SkillsXAI', url: 'https://skillsxai.com' }],
  creator: 'SkillsXAI',
  publisher: 'SkillsXAI',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'SkillsXAI — AI Education & Career-Ready Tech Courses',
    description: 'Job-ready courses in QA Automation, Data Analytics & AI Agents. 100% placement assistance. Learn from industry experts.',
    url: 'https://skillsxai.com',
    siteName: 'SkillsXAI',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SkillsXAI - AI Education & Career-Ready Tech Courses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillsXAI — AI Education & Career-Ready Tech Courses',
    description: 'Job-ready courses in QA Automation, Data Analytics & AI Agents. 100% placement assistance.',
    images: ['/og-image.png'],
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
  alternates: {
    canonical: 'https://skillsxai.com',
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
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
