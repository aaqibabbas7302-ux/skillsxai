import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Certifications — SkillsXAI',
  description:
    'Get certified in Digital Marketing, AI, Generative AI, AI Agents, Prompt Engineering, and Data Analytics. Add to your LinkedIn and CV.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CertificationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
