import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Agents & Workflow Automation Course — n8n, LangChain, OpenAI | 100% Placement',
  description: 'Build intelligent automation pipelines with AI agents in 8 weeks. Learn n8n, Make.com, LangChain, and OpenAI API. Create chatbots, lead gen bots, and production-ready workflows. 100% placement assistance.',
  keywords: [
    'AI agents course',
    'workflow automation course',
    'n8n automation tutorial',
    'LangChain course India',
    'AI automation course with placement',
    'no-code automation course',
    'Make.com course',
    'build AI chatbot course',
    'OpenAI API course',
    'automation with AI India',
  ],
  openGraph: {
    title: 'AI Agents & Workflow Automation Course | SkillsXAI',
    description: 'Build AI-powered automation in 8 weeks. n8n, LangChain, OpenAI. 100% placement assistance. Expected salary: ₹4L–₹15L/year.',
    url: 'https://skillsxai.com/professionals/courses/workflow-automation',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI Agents Course - SkillsXAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agents & Workflow Automation Course | SkillsXAI',
    description: 'Build AI-powered automation in 8 weeks. 100% placement assistance.',
  },
  alternates: {
    canonical: 'https://skillsxai.com/professionals/courses/workflow-automation',
  },
}

export default function WorkflowAutomationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
