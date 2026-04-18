import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Tech Courses — QA Automation, Data Analytics, AI Agents | 100% Placement',
  description: 'Job-ready online courses in QA Automation (Playwright & Cypress), Data Analytics (Python & Power BI), AI Agents, and Digital Marketing. 8-10 week programs with 100% placement assistance. Live mentorship from industry experts.',
  keywords: [
    'professional tech courses India',
    'automation testing course with placement',
    'data analyst course online India',
    'AI agents course',
    'tech courses with placement guarantee',
    'career change to tech',
    'upskilling courses India',
    'QA automation training',
    'data analytics certification',
  ],
  openGraph: {
    title: 'Professional Tech Courses with 100% Placement | SkillsXAI',
    description: 'QA Automation, Data Analytics, AI Agents & Digital Marketing courses. 8-10 week programs with 100% placement assistance.',
    url: 'https://skillsxai.com/professionals',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Professional Tech Courses - SkillsXAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Tech Courses with 100% Placement | SkillsXAI',
    description: 'QA Automation, Data Analytics, AI Agents courses. 100% placement assistance.',
  },
  alternates: {
    canonical: 'https://skillsxai.com/professionals',
  },
}

export default function ProfessionalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
