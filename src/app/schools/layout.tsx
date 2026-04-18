import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Education Program for Schools — Classes 9-12 | 3-Day Workshop',
  description: 'India\'s leading AI literacy program for school students (Classes 9-12). 3-day intensive workshop covering AI fundamentals, workflow automation, logical thinking, and responsible AI use. 500+ students trained across 50+ schools.',
  keywords: [
    'AI education for schools India',
    'AI workshop for students',
    'AI literacy program schools',
    'artificial intelligence course for school students',
    'AI program classes 9 to 12',
    'school AI workshop India',
    'future skills for students',
    'AI training for schools',
  ],
  openGraph: {
    title: 'AI Education Program for Schools | SkillsXAI',
    description: '3-day AI workshop for Classes 9-12. 500+ students trained across 50+ schools in India.',
    url: 'https://skillsxai.com/schools',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI for Schools - SkillsXAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Education Program for Schools | SkillsXAI',
    description: '3-day AI workshop for Classes 9-12. 500+ students trained.',
  },
  alternates: {
    canonical: 'https://skillsxai.com/schools',
  },
}

export default function SchoolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
