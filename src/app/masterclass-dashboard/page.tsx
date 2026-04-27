'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Users,
  CreditCard,
  Award,
  Search,
  Lock,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Filter,
  Send,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

type Tab = 'registrations' | 'payments' | 'certificates'

interface Registration {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  quiz_score: number | null
  overall_rating: number | null
  content_rating: number | null
  instructor_rating: number | null
  recommend_rating: number | null
  payment_status: string
}

interface Payment {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  utr: string
  amount: number
  order_id: string
  plan?: string
  paytm_status: string
  verified: boolean
  verified_at: string | null
}

interface Certificate {
  id: string
  name: string
  email: string
  issued_at: string
  skills: string[]
  course: string
  cert_url: string | null
}

interface SortConfig {
  key: string
  dir: 'asc' | 'desc'
}

function SortHeader({ label, sortKey, current, onSort }: { label: string; sortKey: string; current: SortConfig; onSort: (key: string) => void }) {
  const active = current.key === sortKey
  return (
    <button onClick={() => onSort(sortKey)} className="flex items-center gap-1 group text-left">
      <span>{label}</span>
      {active ? (
        current.dir === 'asc' ? <ArrowUp className="w-3 h-3 text-purple-400" /> : <ArrowDown className="w-3 h-3 text-purple-400" />
      ) : (
        <ArrowUpDown className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
      )}
    </button>
  )
}

function Stars({ count }: { count: number | null }) {
  if (!count) return <span className="text-gray-600">—</span>
  return (
    <span className="text-yellow-400 text-xs tracking-tight">
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </span>
  )
}

function StatusBadge({ status, verified }: { status: string; verified?: boolean }) {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-[11px] font-semibold">
        <CheckCircle2 className="w-3 h-3" /> Verified
      </span>
    )
  }
  if (status === 'PENDING_MANUAL' || status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 text-[11px] font-semibold">
        <Clock className="w-3 h-3" /> Pending
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[11px] font-semibold">
      <XCircle className="w-3 h-3" /> {status}
    </span>
  )
}

function formatDate(d: string | null) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return d
  }
}

export default function MasterclassDashboard() {
  const [authed, setAuthed] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const [tab, setTab] = useState<Tab>('registrations')
  const [search, setSearch] = useState('')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<{ id: string; text: string } | null>(null)
  const [planFilter, setPlanFilter] = useState<'all' | 'pro' | 'ultimate'>('all')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [newPaymentIds, setNewPaymentIds] = useState<Set<string>>(new Set())
  const seenPaymentIds = useRef<Set<string>>(new Set())
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkLoading, setBulkLoading] = useState(false)
  const [sort, setSort] = useState<SortConfig>({ key: 'created_at', dir: 'desc' })
  const [regStatusFilter, setRegStatusFilter] = useState<'all' | 'verified' | 'pending' | 'none'>('all')
  const [payStatusFilter, setPayStatusFilter] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all')
  const [certCourseFilter, setCertCourseFilter] = useState<string>('all')

  const fetchDashboardData = useCallback(async (silent = false) => {
    if (!keyInput.trim()) return
    if (!silent) setRefreshing(true)
    try {
      const res = await fetch('/api/masterclass/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyInput.trim() }),
      })
      if (res.status === 401) return
      const data = await res.json()
      const freshPayments: Payment[] = data.payments || []

      if (seenPaymentIds.current.size > 0) {
        const incoming = new Set<string>()
        for (const p of freshPayments) {
          if (!seenPaymentIds.current.has(p.id)) incoming.add(p.id)
        }
        if (incoming.size > 0) setNewPaymentIds(incoming)
      }
      for (const p of freshPayments) seenPaymentIds.current.add(p.id)

      setRegistrations(data.registrations || [])
      setPayments(freshPayments)
      setCertificates(data.certificates || [])
      setLastUpdated(new Date())
    } catch {
      /* silent */
    } finally {
      setRefreshing(false)
    }
  }, [keyInput])

  useEffect(() => {
    if (!authed) return
    const interval = setInterval(() => fetchDashboardData(true), 10_000)
    return () => clearInterval(interval)
  }, [authed, fetchDashboardData])

  const handleVerifyPayment = async (paymentId: string, action: 'verify' | 'reject') => {
    setActionLoading(`${paymentId}-${action}`)
    try {
      const res = await fetch('/api/masterclass/dashboard', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyInput, paymentId, action }),
      })
      const data = await res.json()
      if (data.success) {
        setPayments((prev) =>
          prev.map((p) =>
            p.id === paymentId
              ? {
                  ...p,
                  verified: action === 'verify',
                  verified_at: action === 'verify' ? new Date().toISOString() : null,
                  paytm_status: action === 'verify' ? 'VERIFIED' : 'REJECTED',
                }
              : p
          )
        )
        setRegistrations((prev) => {
          if (action !== 'verify') return prev
          const payment = payments.find((p) => p.id === paymentId)
          if (!payment) return prev
          return prev.map((r) =>
            r.email === payment.email ? { ...r, payment_status: 'verified' } : r
          )
        })
        if (action === 'verify') {
          setActionMessage({ id: paymentId, text: 'Verified — certificate & resources emailed to user' })
          setTimeout(() => setActionMessage(null), 5000)
        }
      }
    } catch {
      /* silent */
    } finally {
      setActionLoading(null)
    }
  }

  const handleSendEmail = async (paymentId: string, name: string, email: string, plan: string) => {
    setActionLoading(`${paymentId}-email`)
    try {
      const res = await fetch('/api/masterclass/dashboard', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyInput, paymentId, name, email, plan: plan || 'pro' }),
      })
      const data = await res.json()
      if (data.success) {
        setActionMessage({ id: paymentId, text: `Certificate & resources emailed to ${email}` })
        setTimeout(() => setActionMessage(null), 5000)
      } else {
        setActionMessage({ id: paymentId, text: data.error || 'Failed to send email' })
        setTimeout(() => setActionMessage(null), 5000)
      }
    } catch {
      setActionMessage({ id: paymentId, text: 'Failed to send email' })
      setTimeout(() => setActionMessage(null), 5000)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (table: 'registrations' | 'payments' | 'certificates', id: string) => {
    if (!confirm(`Are you sure you want to delete this ${table.slice(0, -1)}? This cannot be undone.`)) return
    setActionLoading(`${id}-delete`)
    try {
      const res = await fetch('/api/masterclass/dashboard', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyInput, table, id }),
      })
      const data = await res.json()
      if (data.success) {
        if (table === 'registrations') setRegistrations((prev) => prev.filter((r) => r.id !== id))
        if (table === 'payments') setPayments((prev) => prev.filter((p) => p.id !== id))
        if (table === 'certificates') setCertificates((prev) => prev.filter((c) => c.id !== id))
      }
    } catch {
      /* silent */
    } finally {
      setActionLoading(null)
    }
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }

  const toggleSelectAll = (ids: string[]) => {
    const allSelected = ids.every((id) => selected.has(id))
    setSelected((prev) => {
      const next = new Set(prev)
      if (allSelected) { ids.forEach((id) => next.delete(id)) } else { ids.forEach((id) => next.add(id)) }
      return next
    })
  }

  const handleBulkDelete = async (table: 'registrations' | 'payments' | 'certificates') => {
    const ids = Array.from(selected)
    if (ids.length === 0) return
    if (!confirm(`Delete ${ids.length} ${table}? This cannot be undone.`)) return
    setBulkLoading(true)
    try {
      const res = await fetch('/api/masterclass/dashboard', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyInput, table, ids }),
      })
      const data = await res.json()
      if (data.success) {
        const deletedSet = new Set(ids)
        if (table === 'registrations') setRegistrations((prev) => prev.filter((r) => !deletedSet.has(r.id)))
        if (table === 'payments') setPayments((prev) => prev.filter((p) => !deletedSet.has(p.id)))
        if (table === 'certificates') setCertificates((prev) => prev.filter((c) => !deletedSet.has(c.id)))
        setSelected(new Set())
      }
    } catch {
      /* silent */
    } finally {
      setBulkLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!keyInput.trim()) {
      setAuthError('Enter the admin key')
      return
    }
    setLoading(true)
    setAuthError('')
    try {
      const res = await fetch('/api/masterclass/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: keyInput.trim() }),
      })
      const data = await res.json()
      if (res.status === 401) {
        setAuthError('Invalid admin key')
        return
      }
      const initialPayments: Payment[] = data.payments || []
      for (const p of initialPayments) seenPaymentIds.current.add(p.id)
      setRegistrations(data.registrations || [])
      setPayments(initialPayments)
      setCertificates(data.certificates || [])
      setLastUpdated(new Date())
      setAuthed(true)
    } catch {
      setAuthError('Failed to connect')
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (key: string) => {
    setSort((prev) => prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })
  }

  function sortRows<T>(rows: T[]): T[] {
    const { key, dir } = sort
    return [...rows].sort((a, b) => {
      const av = (a as Record<string, unknown>)[key]
      const bv = (b as Record<string, unknown>)[key]
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (typeof av === 'number' && typeof bv === 'number') return dir === 'asc' ? av - bv : bv - av
      const as = String(av).toLowerCase()
      const bs = String(bv).toLowerCase()
      return dir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
    })
  }

  const q = search.toLowerCase()
  const filteredRegistrations = sortRows(registrations.filter((r) => {
    if (regStatusFilter === 'verified' && r.payment_status !== 'verified') return false
    if (regStatusFilter === 'pending' && !['PENDING_MANUAL', 'pending'].includes(r.payment_status)) return false
    if (regStatusFilter === 'none' && r.payment_status && ['verified', 'PENDING_MANUAL', 'pending'].includes(r.payment_status)) return false
    return r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.phone?.includes(q)
  }))
  const filteredPayments = sortRows(payments.filter((r) => {
    if (planFilter !== 'all' && r.plan && r.plan !== planFilter) return false
    if (payStatusFilter === 'verified' && !r.verified) return false
    if (payStatusFilter === 'pending' && (r.verified || r.paytm_status === 'REJECTED')) return false
    if (payStatusFilter === 'rejected' && r.paytm_status !== 'REJECTED') return false
    return r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.utr?.includes(q) || r.order_id?.includes(q)
  }))
  const uniqueCourses = Array.from(new Set(certificates.map((c) => c.course).filter(Boolean)))
  const filteredCertificates = sortRows(certificates.filter((r) => {
    if (certCourseFilter !== 'all' && r.course !== certCourseFilter) return false
    return r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.id?.includes(q)
  }))

  const tabs: { id: Tab; label: string; icon: typeof Users; count: number }[] = [
    { id: 'registrations', label: 'Registrations', icon: Users, count: registrations.length },
    { id: 'payments', label: 'Payments', icon: CreditCard, count: payments.length },
    { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
  ]

  const verifiedPayments = payments.filter((p) => p.verified).length
  const pendingPayments = payments.filter((p) => !p.verified && p.paytm_status !== 'REJECTED').length
  const totalRevenue = payments.filter((p) => p.verified).reduce((sum, p) => sum + (p.amount || 0), 0)
  const proCount = payments.filter((p) => (p.plan || 'pro') === 'pro').length
  const ultimateCount = payments.filter((p) => p.plan === 'ultimate').length

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Masterclass Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Enter admin key to access</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => { setKeyInput(e.target.value); setAuthError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Admin key"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/40"
            />
            {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {loading ? 'Loading...' : 'Access Dashboard'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Masterclass Dashboard</h1>
            <p className="text-gray-500 text-xs">SkillsXAI Admin</p>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-[10px] text-gray-600 hidden sm:inline">
                Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
            <button
              onClick={() => fetchDashboardData(false)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs font-medium hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
            <a href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
              ← Back to site
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-gray-500 mb-1">Registrations</p>
            <p className="text-2xl font-bold text-white">{registrations.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-gray-500 mb-1">Verified Revenue</p>
            <p className="text-2xl font-bold text-green-400">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-gray-500 mb-1">Verified / Pending</p>
            <p className="text-2xl font-bold">
              <span className="text-green-400">{verifiedPayments}</span>
              <span className="text-gray-600 mx-1">/</span>
              <span className="text-yellow-400">{pendingPayments}</span>
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs text-gray-500 mb-1">Pro / Ultimate</p>
            <p className="text-2xl font-bold">
              <span className="text-yellow-300">{proCount}</span>
              <span className="text-gray-600 mx-1">/</span>
              <span className="text-purple-400">{ultimateCount}</span>
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-gray-500">Certificates</p>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" title="Live — auto-refreshing every 10s" />
            </div>
            <p className="text-2xl font-bold text-purple-400">{certificates.length}</p>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-1 rounded-xl bg-white/[0.03] border border-white/10 p-1">
            {tabs.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setSelected(new Set()); setSort({ key: 'created_at', dir: 'desc' }) }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === t.id
                      ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    tab === t.id ? 'bg-white/20' : 'bg-white/10 text-gray-500'
                  }`}>
                    {t.count}
                  </span>
                  {t.id === 'payments' && newPaymentIds.size > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-green-500 text-white text-[9px] font-bold animate-pulse">
                      {newPaymentIds.size} NEW
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
            {tab === 'registrations' && (
              <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] border border-white/10 p-0.5">
                <Filter className="w-3 h-3 text-gray-500 ml-2 mr-1" />
                {(['all', 'verified', 'pending', 'none'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setRegStatusFilter(f)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      regStatusFilter === f
                        ? f === 'verified' ? 'bg-green-600/80 text-white'
                          : f === 'pending' ? 'bg-yellow-600/80 text-white'
                          : f === 'none' ? 'bg-gray-600/80 text-white'
                          : 'bg-white/15 text-white'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'verified' ? 'Verified' : f === 'pending' ? 'Pending' : 'No Payment'}
                  </button>
                ))}
              </div>
            )}

            {tab === 'payments' && (
              <>
                <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] border border-white/10 p-0.5">
                  <Filter className="w-3 h-3 text-gray-500 ml-2 mr-1" />
                  {(['all', 'pro', 'ultimate'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setPlanFilter(f)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        planFilter === f
                          ? f === 'ultimate' ? 'bg-purple-600/80 text-white'
                            : f === 'pro' ? 'bg-yellow-600/80 text-white'
                            : 'bg-white/15 text-white'
                          : 'text-gray-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {f === 'all' ? 'All Plans' : f === 'pro' ? 'Pro' : 'Ultimate'}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] border border-white/10 p-0.5">
                  {(['all', 'verified', 'pending', 'rejected'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setPayStatusFilter(f)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        payStatusFilter === f
                          ? f === 'verified' ? 'bg-green-600/80 text-white'
                            : f === 'pending' ? 'bg-yellow-600/80 text-white'
                            : f === 'rejected' ? 'bg-red-600/80 text-white'
                            : 'bg-white/15 text-white'
                          : 'text-gray-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {f === 'all' ? 'All Status' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {tab === 'certificates' && uniqueCourses.length > 1 && (
              <div className="flex items-center gap-1 rounded-lg bg-white/[0.03] border border-white/10 p-0.5">
                <Filter className="w-3 h-3 text-gray-500 ml-2 mr-1" />
                <button
                  onClick={() => setCertCourseFilter('all')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    certCourseFilter === 'all' ? 'bg-white/15 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  All
                </button>
                {uniqueCourses.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCertCourseFilter(c)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      certCourseFilter === c ? 'bg-purple-600/80 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, UTR..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30"
              />
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/5 border border-red-500/20">
            <span className="text-sm text-white font-semibold">{selected.size} selected</span>
            <button
              onClick={() => handleBulkDelete(tab)}
              disabled={bulkLoading}
              className="px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-600/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              {bulkLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
              Delete Selected
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="px-3 py-2 rounded-lg text-gray-400 text-xs font-medium hover:text-white hover:bg-white/5 transition-all"
            >
              Clear
            </button>
          </div>
        )}

        {/* Registrations Tab */}
        {tab === 'registrations' && (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-600 bg-transparent accent-purple-500 cursor-pointer"
                        checked={filteredRegistrations.length > 0 && filteredRegistrations.every((r) => selected.has(r.id))}
                        onChange={() => toggleSelectAll(filteredRegistrations.map((r) => r.id))} />
                    </th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Name" sortKey="name" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Email" sortKey="email" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Phone" sortKey="phone" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Ratings" sortKey="overall_rating" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Payment" sortKey="payment_status" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Date" sortKey="created_at" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRegistrations.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-12 text-gray-500">No registrations found</td></tr>
                  ) : filteredRegistrations.map((r) => (
                    <tr key={r.id} className={`hover:bg-white/[0.02] transition-colors ${selected.has(r.id) ? 'bg-purple-500/[0.06]' : ''}`}>
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded border-gray-600 bg-transparent accent-purple-500 cursor-pointer"
                          checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)} />
                      </td>
                      <td className="px-4 py-3 font-medium text-white">{r.name}</td>
                      <td className="px-4 py-3 text-gray-300">{r.email}</td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{r.phone}</td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 text-[11px] text-gray-500">
                            Overall <Stars count={r.overall_rating} />
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-gray-500">
                            Content <Stars count={r.content_rating} />
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-gray-500">
                            Instructor <Stars count={r.instructor_rating} />
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-gray-500">
                            Recommend <Stars count={r.recommend_rating} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.payment_status} verified={r.payment_status === 'verified'} />
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(r.created_at)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete('registrations', r.id)}
                          disabled={actionLoading === `${r.id}-delete`}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                          title="Delete registration"
                        >
                          {actionLoading === `${r.id}-delete` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {tab === 'payments' && (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-600 bg-transparent accent-purple-500 cursor-pointer"
                        checked={filteredPayments.length > 0 && filteredPayments.every((p) => selected.has(p.id))}
                        onChange={() => toggleSelectAll(filteredPayments.map((p) => p.id))} />
                    </th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Name" sortKey="name" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Email" sortKey="email" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Phone" sortKey="phone" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="UPI Ref ID" sortKey="utr" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Amount" sortKey="amount" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Plan" sortKey="plan" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Status" sortKey="paytm_status" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Date" sortKey="created_at" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPayments.length === 0 ? (
                    <tr><td colSpan={10} className="text-center py-12 text-gray-500">No payments found</td></tr>
                  ) : filteredPayments.map((p) => (
                    <>
                      <tr
                        key={p.id}
                        className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${
                          selected.has(p.id) ? 'bg-purple-500/[0.06]' : newPaymentIds.has(p.id) ? 'bg-green-500/[0.06] animate-pulse' : ''
                        }`}
                        onClick={() => {
                          setExpandedRow(expandedRow === p.id ? null : p.id)
                          if (newPaymentIds.has(p.id)) {
                            setNewPaymentIds((prev) => { const next = new Set(prev); next.delete(p.id); return next })
                          }
                        }}
                      >
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded border-gray-600 bg-transparent accent-purple-500 cursor-pointer"
                            checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} />
                        </td>
                        <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                        <td className="px-4 py-3 text-gray-300">{p.email}</td>
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">{p.phone}</td>
                        <td className="px-4 py-3 font-mono text-xs text-blue-300">{p.utr}</td>
                        <td className="px-4 py-3 font-semibold text-green-400">₹{p.amount}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.plan === 'ultimate'
                              ? 'bg-purple-500/15 text-purple-300'
                              : 'bg-yellow-500/15 text-yellow-300'
                          }`}>
                            {p.plan === 'ultimate' ? 'ULTIMATE' : 'PRO'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={p.paytm_status} verified={p.verified} />
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(p.created_at)}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {expandedRow === p.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                      </tr>
                      {expandedRow === p.id && (
                        <tr key={`${p.id}-detail`} className="bg-white/[0.01]">
                          <td colSpan={10} className="px-6 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mb-4">
                              <div>
                                <p className="text-gray-500 mb-1">Order ID</p>
                                <p className="text-gray-300 font-mono">{p.order_id}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Payment Status</p>
                                <p className="text-gray-300">{p.paytm_status}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Verified At</p>
                                <p className="text-gray-300">{p.verified_at ? formatDate(p.verified_at) : 'Not verified'}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">Plan</p>
                                <p className="text-gray-300">{p.plan || 'pro'}</p>
                              </div>
                            </div>

                            {/* Admin Actions */}
                            <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                              {p.verified ? (
                                <>
                                  <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2 text-green-400 text-xs font-medium">
                                      <CheckCircle2 className="w-4 h-4" />
                                      Payment verified {p.verified_at ? `on ${formatDate(p.verified_at)}` : ''}
                                    </div>
                                    {actionMessage?.id === p.id && (
                                      <p className="text-[11px] text-emerald-400/80 pl-6">{actionMessage.text}</p>
                                    )}
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleSendEmail(p.id, p.name, p.email, p.plan || 'pro') }}
                                    disabled={actionLoading === `${p.id}-email`}
                                    className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-600/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                                  >
                                    {actionLoading === `${p.id}-email` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                                    Send Email
                                  </button>
                                </>
                              ) : p.paytm_status === 'REJECTED' ? (
                                <>
                                  <div className="flex items-center gap-2 text-red-400 text-xs font-medium">
                                    <XCircle className="w-4 h-4" />
                                    Payment rejected
                                  </div>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleVerifyPayment(p.id, 'verify') }}
                                    disabled={actionLoading === `${p.id}-verify`}
                                    className="px-4 py-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 text-xs font-semibold hover:bg-green-600/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                                  >
                                    {actionLoading === `${p.id}-verify` ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                    Verify Instead
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleSendEmail(p.id, p.name, p.email, p.plan || 'pro') }}
                                    disabled={actionLoading === `${p.id}-email`}
                                    className="ml-auto px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-600/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                                  >
                                    {actionLoading === `${p.id}-email` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                                    Send Email
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleVerifyPayment(p.id, 'verify') }}
                                    disabled={actionLoading === `${p.id}-verify`}
                                    className="px-4 py-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 text-xs font-semibold hover:bg-green-600/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                                  >
                                    {actionLoading === `${p.id}-verify` ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                    Verify Payment
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleVerifyPayment(p.id, 'reject') }}
                                    disabled={actionLoading === `${p.id}-reject`}
                                    className="px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-600/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                                  >
                                    {actionLoading === `${p.id}-reject` ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                                    Reject
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleSendEmail(p.id, p.name, p.email, p.plan || 'pro') }}
                                    disabled={actionLoading === `${p.id}-email`}
                                    className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-600/30 transition-all disabled:opacity-50 flex items-center gap-1.5"
                                  >
                                    {actionLoading === `${p.id}-email` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                                    Send Email
                                  </button>
                                  <span className="ml-auto text-[10px] text-gray-600">UPI Ref: {p.utr} · ₹{p.amount}</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center justify-end pt-3 mt-3 border-t border-white/5">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDelete('payments', p.id) }}
                                disabled={actionLoading === `${p.id}-delete`}
                                className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50 flex items-center gap-1.5 text-[11px]"
                              >
                                {actionLoading === `${p.id}-delete` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                Delete Payment
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {tab === 'certificates' && (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] text-gray-400 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 w-10">
                      <input type="checkbox" className="rounded border-gray-600 bg-transparent accent-purple-500 cursor-pointer"
                        checked={filteredCertificates.length > 0 && filteredCertificates.every((c) => selected.has(c.id))}
                        onChange={() => toggleSelectAll(filteredCertificates.map((c) => c.id))} />
                    </th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Cert ID" sortKey="id" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Name" sortKey="name" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Email" sortKey="email" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Course" sortKey="course" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium">Skills</th>
                    <th className="text-left px-4 py-3 font-medium"><SortHeader label="Issued" sortKey="issued_at" current={sort} onSort={handleSort} /></th>
                    <th className="text-left px-4 py-3 font-medium">Link</th>
                    <th className="text-left px-4 py-3 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCertificates.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-12 text-gray-500">No certificates found</td></tr>
                  ) : filteredCertificates.map((c) => (
                    <tr key={c.id} className={`hover:bg-white/[0.02] transition-colors ${selected.has(c.id) ? 'bg-purple-500/[0.06]' : ''}`}>
                      <td className="px-4 py-3">
                        <input type="checkbox" className="rounded border-gray-600 bg-transparent accent-purple-500 cursor-pointer"
                          checked={selected.has(c.id)} onChange={() => toggleSelect(c.id)} />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-purple-300 max-w-[120px] truncate">{c.id}</td>
                      <td className="px-4 py-3 font-medium text-white">{c.name}</td>
                      <td className="px-4 py-3 text-gray-300">{c.email}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{c.course}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(c.skills || []).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px] font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{c.issued_at}</td>
                      <td className="px-4 py-3">
                        {c.cert_url && (
                          <a
                            href={c.cert_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs transition-colors"
                          >
                            View <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete('certificates', c.id)}
                          disabled={actionLoading === `${c.id}-delete`}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                          title="Delete certificate"
                        >
                          {actionLoading === `${c.id}-delete` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
