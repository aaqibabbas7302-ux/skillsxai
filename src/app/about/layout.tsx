import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About SkillsXAI — India\'s Leading AI Education Platform',
  description: 'Learn about SkillsXAI\'s mission to prepare the next generation for an AI-powered world. Founded in 2024, we\'ve trained 500+ students across 50+ schools and placed professionals in top companies.',
  keywords: [
    'about SkillsXAI',
    'AI education platform India',
    'SkillsXAI team',
    'AI education mission',
    'ed-tech India',
  ],
  openGraph: {
    title: 'About SkillsXAI — India\'s Leading AI Education Platform',
    description: 'Our mission to prepare the next generation for an AI-powered world. 500+ students trained across 50+ schools.',
    url: 'https://skillsxai.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://skillsxai.com/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
