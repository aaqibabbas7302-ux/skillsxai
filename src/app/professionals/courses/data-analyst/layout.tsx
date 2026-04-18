import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Analyst Course — Python, SQL, Power BI & Tableau | 100% Placement',
  description: 'Become a job-ready data analyst in 10 weeks. Learn Python, SQL, Power BI, Tableau, and statistical analysis with real-world projects. 100% placement assistance. Expected salary: ₹4L–₹14L/year.',
  keywords: [
    'data analyst course online',
    'data analytics course with placement',
    'learn data analytics India',
    'power bi course online',
    'python for data analysis course',
    'SQL for data analysts',
    'data analyst course for beginners',
    'tableau course India',
    'data analytics training with placement',
    'data analyst certification India',
  ],
  openGraph: {
    title: 'Data Analyst Course — Python, SQL, Power BI & Tableau | SkillsXAI',
    description: 'Become a data analyst in 10 weeks. Python, SQL, Power BI, Tableau. 100% placement assistance. Expected salary: ₹4L–₹14L/year.',
    url: 'https://skillsxai.com/professionals/courses/data-analyst',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Data Analyst Course - SkillsXAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Analyst Course — Python, SQL, Power BI & Tableau | SkillsXAI',
    description: 'Become a data analyst in 10 weeks. 100% placement assistance.',
  },
  alternates: {
    canonical: 'https://skillsxai.com/professionals/courses/data-analyst',
  },
}

export default function DataAnalystLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
