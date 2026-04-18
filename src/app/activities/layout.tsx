import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Curriculum for Schools — 3-Day AI Fundamentals, Automation & Ethics',
  description: 'Explore the SkillsXAI curriculum for school students: 18 hours covering AI fundamentals, workflow automation, logical thinking, prompt writing, AI ethics, and career awareness. Designed for Classes 9-12.',
  keywords: [
    'AI curriculum for schools',
    'AI workshop curriculum',
    'AI fundamentals for students',
    'school AI program syllabus',
    'AI ethics for students',
  ],
  openGraph: {
    title: 'AI Curriculum for Schools | SkillsXAI',
    description: '18-hour curriculum covering AI fundamentals, automation, and ethics for Classes 9-12.',
    url: 'https://skillsxai.com/activities',
    type: 'website',
  },
  alternates: {
    canonical: 'https://skillsxai.com/activities',
  },
}

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
