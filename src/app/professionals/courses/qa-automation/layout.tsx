import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QA Automation Course with Playwright & Cypress — 100% Placement',
  description: 'Master QA automation testing with Playwright and Cypress in 8 weeks. Learn E2E testing, API testing, CI/CD with GitHub Actions, and visual regression testing. 100% placement assistance for freshers and working professionals in India.',
  keywords: [
    'QA automation course',
    'playwright testing course',
    'cypress testing course',
    'automation testing course with placement',
    'playwright course online India',
    'QA automation testing training',
    'learn playwright testing',
    'E2E testing course',
    'API testing course',
    'selenium to playwright migration',
  ],
  openGraph: {
    title: 'QA Automation Course with Playwright & Cypress | SkillsXAI',
    description: 'Master Playwright & Cypress in 8 weeks. E2E testing, API testing, CI/CD integration. 100% placement assistance. Expected salary: ₹5L–₹18L/year.',
    url: 'https://skillsxai.com/professionals/courses/qa-automation',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'QA Automation Course with Playwright - SkillsXAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QA Automation Course with Playwright & Cypress | SkillsXAI',
    description: 'Master Playwright & Cypress in 8 weeks. 100% placement assistance.',
  },
  alternates: {
    canonical: 'https://skillsxai.com/professionals/courses/qa-automation',
  },
}

export default function QAAutomationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
