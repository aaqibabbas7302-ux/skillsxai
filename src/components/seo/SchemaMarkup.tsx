export default function SchemaMarkup() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SkillsXAI',
    url: 'https://skillsxai.com',
    logo: 'https://skillsxai.com/logo.svg',
    description: 'Learn Workflow Automation & AI Agents. A practical learning program helping students understand how Artificial Intelligence can perform tasks.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9876543210',
      contactType: 'customer service',
      email: 'info@skillxai.com',
      areaServed: 'IN',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://twitter.com/skillsxai',
      'https://linkedin.com/company/skillsxai'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
