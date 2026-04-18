'use client'

import { usePathname } from 'next/navigation'

const BASE_URL = 'https://skillsxai.com'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'SkillsXAI',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description: 'India\'s leading AI education platform offering job-ready courses in QA Automation, Data Analytics, and AI Agents with 100% placement assistance.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plot 28, Sheesham Courtyard, Sainik Farm',
    addressLocality: 'New Delhi',
    postalCode: '110030',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8285347868',
    contactType: 'customer service',
    email: 'info@skillsxai.com',
    areaServed: 'IN',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://twitter.com/skillsxai',
    'https://linkedin.com/company/skillsxai',
    'https://youtube.com/@skillsxai',
  ],
}

const courseSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'QA Automation with Playwright & Cypress',
    description: 'Master modern test automation with Playwright and Cypress. 8-week intensive course covering E2E testing, API testing, CI/CD integration, and visual regression testing. 100% placement assistance.',
    provider: { '@type': 'Organization', name: 'SkillsXAI', sameAs: BASE_URL },
    url: `${BASE_URL}/professionals/courses/qa-automation`,
    courseMode: 'online',
    educationalLevel: 'Beginner to Advanced',
    timeRequired: 'P8W',
    inLanguage: 'en',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT80H',
      instructor: { '@type': 'Organization', name: 'SkillsXAI' },
    },
    about: [
      { '@type': 'Thing', name: 'Playwright Testing' },
      { '@type': 'Thing', name: 'Cypress Testing' },
      { '@type': 'Thing', name: 'QA Automation' },
      { '@type': 'Thing', name: 'API Testing' },
    ],
    teaches: [
      'End-to-end testing with Playwright',
      'Browser automation with Cypress',
      'API testing with Postman and Newman',
      'CI/CD pipeline integration with GitHub Actions',
      'Page Object Model design pattern',
      'Visual regression testing',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Data Analyst with Python & Power BI',
    description: '10-week comprehensive data analytics course covering Python, SQL, Power BI, Tableau, and statistical analysis. Build real-world projects and get 100% placement assistance.',
    provider: { '@type': 'Organization', name: 'SkillsXAI', sameAs: BASE_URL },
    url: `${BASE_URL}/professionals/courses/data-analyst`,
    courseMode: 'online',
    educationalLevel: 'Beginner to Advanced',
    timeRequired: 'P10W',
    inLanguage: 'en',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT100H',
      instructor: { '@type': 'Organization', name: 'SkillsXAI' },
    },
    about: [
      { '@type': 'Thing', name: 'Data Analytics' },
      { '@type': 'Thing', name: 'Python' },
      { '@type': 'Thing', name: 'Power BI' },
      { '@type': 'Thing', name: 'SQL' },
    ],
    teaches: [
      'Python for data analysis with Pandas and NumPy',
      'SQL for analytics and reporting',
      'Power BI dashboard creation',
      'Tableau data visualization',
      'Statistical analysis and hypothesis testing',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Workflow Automation with AI Agents',
    description: '8-week course on building intelligent automation pipelines with AI. Learn n8n, Make.com, LangChain, and OpenAI API. 100% placement assistance.',
    provider: { '@type': 'Organization', name: 'SkillsXAI', sameAs: BASE_URL },
    url: `${BASE_URL}/professionals/courses/workflow-automation`,
    courseMode: 'online',
    educationalLevel: 'Beginner to Advanced',
    timeRequired: 'P8W',
    inLanguage: 'en',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT80H',
      instructor: { '@type': 'Organization', name: 'SkillsXAI' },
    },
    about: [
      { '@type': 'Thing', name: 'AI Agents' },
      { '@type': 'Thing', name: 'Workflow Automation' },
      { '@type': 'Thing', name: 'n8n' },
    ],
    teaches: [
      'Building automated workflows with AI',
      'Creating autonomous AI agents',
      'No-code automation with n8n and Make.com',
      'LangChain and OpenAI API integration',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Digital Marketing with AI',
    description: '8-week AI-powered digital marketing course. Master SEO, Google Ads, Meta Ads, content marketing, and marketing automation. 100% placement assistance.',
    provider: { '@type': 'Organization', name: 'SkillsXAI', sameAs: BASE_URL },
    url: `${BASE_URL}/professionals/courses/digital-marketing`,
    courseMode: 'online',
    educationalLevel: 'Beginner to Advanced',
    timeRequired: 'P8W',
    inLanguage: 'en',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT80H',
      instructor: { '@type': 'Organization', name: 'SkillsXAI' },
    },
    about: [
      { '@type': 'Thing', name: 'Digital Marketing' },
      { '@type': 'Thing', name: 'SEO' },
      { '@type': 'Thing', name: 'Google Ads' },
    ],
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the 100% placement assurance at SkillsXAI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Complete the course, pass our evaluations, and get placed — our dedicated team supports you until you land a confirmed offer. We have maintained a 100% placement record since inception. Our placement team provides resume building, mock interviews, and direct referrals to hiring partners.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need prior technical experience to join SkillsXAI courses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No prior technical experience is required. Our courses are designed for beginners and cover fundamentals from the ground up. Whether you are from a non-tech background or want to switch careers, our structured curriculum will guide you step by step.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the courses online or offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All our professional courses are conducted online with live interactive sessions. Weekend and weekday batches are available. All sessions are recorded and accessible for 6 months so you never miss a class.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tools will I learn in the QA Automation course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You will learn Playwright, Cypress, Jest, Postman, GitHub Actions, Selenium, Newman, and Allure reporting. The course covers E2E testing, API testing, CI/CD integration, visual regression testing, and accessibility testing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is covered in the Data Analyst course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 10-week Data Analyst course covers Python (Pandas, NumPy), SQL, Power BI, Tableau, Excel, statistical analysis, machine learning basics, and a capstone project with real datasets. You will build 3-5 portfolio projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long are the courses and what is the schedule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Courses range from 8 to 10 weeks. Live classes are held on weekdays or weekends based on your batch preference. You need to commit approximately 10-15 hours per week including live sessions and practice.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fee structure and are EMI options available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer competitive pricing with flexible EMI options available. Contact our admissions team for current batch fees and EMI plans. We believe quality education should be accessible to everyone.',
      },
    },
  ],
}

function getBreadcrumbSchema(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const items = [
    { '@type': 'ListItem' as const, position: 1, name: 'Home', item: BASE_URL },
  ]

  const nameMap: Record<string, string> = {
    'professionals': 'Professional Courses',
    'courses': 'Courses',
    'qa-automation': 'QA Automation with Playwright',
    'data-analyst': 'Data Analyst with Python & Power BI',
    'workflow-automation': 'Workflow Automation with AI Agents',
    'digital-marketing': 'Digital Marketing with AI',
    'schools': 'AI for Schools',
    'blog': 'Blog',
    'about': 'About Us',
    'contact': 'Contact',
    'activities': 'Curriculum',
    'terms': 'Terms & Conditions',
  }

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: nameMap[segment] || segment,
      item: `${BASE_URL}${currentPath}`,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

export default function SchemaMarkup() {
  const pathname = usePathname()

  const isCoursePage = pathname.startsWith('/professionals/courses/')
  const isProfessionals = pathname === '/professionals'
  const isHome = pathname === '/'

  const schemas: object[] = []

  if (isHome) {
    schemas.push(organizationSchema)
  }

  if (isProfessionals || isCoursePage) {
    schemas.push(faqSchema)
  }

  if (isCoursePage) {
    const courseSlug = pathname.split('/').pop()
    const matchedCourse = courseSchemas.find(
      (c) => c.url === `${BASE_URL}${pathname}`
    )
    if (matchedCourse) {
      schemas.push(matchedCourse)
    }
  }

  if (isProfessionals) {
    courseSchemas.forEach((c) => schemas.push(c))
  }

  if (pathname !== '/') {
    schemas.push(getBreadcrumbSchema(pathname))
  }

  if (schemas.length === 0) return null

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
