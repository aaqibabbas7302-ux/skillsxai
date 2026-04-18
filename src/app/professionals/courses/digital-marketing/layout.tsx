import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Marketing with AI Course — SEO, Google Ads, Meta Ads | 100% Placement',
  description: 'Master AI-powered digital marketing in 8 weeks. Learn SEO, Google Ads, Meta Ads, content marketing, and marketing automation with AI tools. 100% placement assistance.',
  keywords: [
    'digital marketing course with AI',
    'AI marketing course India',
    'SEO course online',
    'Google Ads course India',
    'Meta Ads course',
    'content marketing course',
    'digital marketing course with placement',
    'learn digital marketing',
    'marketing automation course',
    'AI tools for marketing',
  ],
  openGraph: {
    title: 'Digital Marketing with AI Course | SkillsXAI',
    description: 'Master AI-powered digital marketing in 8 weeks. SEO, Google Ads, Meta Ads. 100% placement assistance.',
    url: 'https://skillsxai.com/professionals/courses/digital-marketing',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Digital Marketing Course - SkillsXAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing with AI Course | SkillsXAI',
    description: 'Master AI-powered digital marketing in 8 weeks. 100% placement assistance.',
  },
  alternates: {
    canonical: 'https://skillsxai.com/professionals/courses/digital-marketing',
  },
}

export default function DigitalMarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
