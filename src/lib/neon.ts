import { Pool } from 'pg'

let pool: Pool | null = null

export function getNeonPool(): Pool | null {
  const connStr = process.env.NEON_DATABASE_URL
  if (!connStr) return null
  if (!pool) {
    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      max: 5,
    })
  }
  return pool
}

function generateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const ts = Date.now().toString(36)
  let id = ts
  for (let i = 0; i < 40 - ts.length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

export interface SavedCert {
  certId: string
  issuedAt: string
  certUrl: string
}

export async function saveCertToNeon(
  name: string,
  email: string,
  course: string,
  skills: string[]
): Promise<SavedCert | null> {
  const pool = getNeonPool()
  if (!pool) return null

  const { rows: existing } = await pool.query(
    'SELECT id, issued_at FROM certificates WHERE email = $1 AND course = $2 LIMIT 1',
    [email, course]
  )

  if (existing.length > 0) {
    const certUrl = `https://skillsxai.com/certificatedownload/${existing[0].id}`
    return { certId: existing[0].id, issuedAt: existing[0].issued_at, certUrl }
  }

  const certId = generateId()
  const issuedAt = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const certUrl = `https://skillsxai.com/certificatedownload/${certId}`

  await pool.query(
    `INSERT INTO certificates (id, name, email, issued_at, skills, course, cert_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [certId, name, email, issuedAt, skills, course, certUrl]
  )

  return { certId, issuedAt, certUrl }
}

export async function getCertFromNeon(id: string) {
  const pool = getNeonPool()
  if (!pool) return null

  const { rows } = await pool.query(
    'SELECT id, name, email, issued_at, skills, course, cert_url FROM certificates WHERE id = $1 LIMIT 1',
    [id]
  )

  if (rows.length === 0) return null
  return rows[0] as {
    id: string
    name: string
    email: string
    issued_at: string
    skills: string[]
    course: string
    cert_url: string | null
  }
}
