// Supabase client exports
export { supabase, createSupabaseClient } from './client'
export { supabaseAdmin, createServerSupabaseClient } from './server'

// Database types (you can generate these from Supabase CLI)
export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          organization: string | null
          inquiry_type: string
          message: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          organization?: string | null
          inquiry_type: string
          message: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          organization?: string | null
          inquiry_type?: string
          message?: string
          status?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          created_at: string
          school_name: string
          contact_person: string
          email: string
          phone: string
          student_count: number
          preferred_dates: string | null
          notes: string | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          school_name: string
          contact_person: string
          email: string
          phone: string
          student_count: number
          preferred_dates?: string | null
          notes?: string | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          school_name?: string
          contact_person?: string
          email?: string
          phone?: string
          student_count?: number
          preferred_dates?: string | null
          notes?: string | null
          status?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          created_at: string
          email: string
          subscribed: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          subscribed?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          subscribed?: boolean
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
