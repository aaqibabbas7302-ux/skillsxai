import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact SkillsXAI — Enroll in AI & Tech Courses | Get in Touch',
  description: 'Contact SkillsXAI for course enrollment, school partnerships, or corporate training inquiries. Call +91 8285347868, email info@skillsxai.com, or visit us in New Delhi.',
  keywords: [
    'contact SkillsXAI',
    'enroll automation testing course',
    'school partnership AI',
    'tech course enrollment India',
    'SkillsXAI phone number',
  ],
  openGraph: {
    title: 'Contact SkillsXAI — Enroll in AI & Tech Courses',
    description: 'Get in touch for course enrollment, school partnerships, or inquiries. New Delhi, India.',
    url: 'https://skillsxai.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://skillsxai.com/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
