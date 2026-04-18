import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/', '/addingblognawabkhan/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/api/', '/addingblognawabkhan/'],
      },
    ],
    sitemap: 'https://skillsxai.com/sitemap.xml',
  }
}
