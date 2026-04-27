import nodemailer from 'nodemailer'

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

function getTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  })
}

interface Attachment {
  filename: string
  content: Buffer
  contentType: string
}

interface SendMailOptions {
  to: string
  subject: string
  html: string
  attachments?: Attachment[]
}

export async function sendMail({ to, subject, html, attachments }: SendMailOptions) {
  const transporter = getTransporter()
  if (!transporter) {
    throw new Error('Gmail credentials not configured (GMAIL_USER / GMAIL_APP_PASSWORD)')
  }

  const mailAttachments = attachments?.map((a) => ({
    filename: a.filename,
    content: a.content,
    contentType: a.contentType,
  }))

  const result = await transporter.sendMail({
    from: `SkillsXAI <${GMAIL_USER}>`,
    to,
    subject,
    html,
    attachments: mailAttachments,
  })

  return result
}
