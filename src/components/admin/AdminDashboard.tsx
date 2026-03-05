import { useEffect, useState, useCallback, useRef } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'
import AdminHeader from './AdminHeader'
import AdminStats from './AdminStats'
import AdminFilters, { StatusFilter, PeriodFilter } from './AdminFilters'
import AdminTable, { Message } from './AdminTable'

interface Props {
  session: Session
  onLogout: () => void
}

const PAGE_SIZE = 10

function getPeriodStart(period: PeriodFilter): string | null {
  const now = new Date()
  if (period === 'today') {
    const d = new Date(now); d.setHours(0, 0, 0, 0); return d.toISOString()
  }
  if (period === 'week') {
    const d = new Date(now); d.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1)); d.setHours(0, 0, 0, 0); return d.toISOString()
  }
  if (period === 'month') {
    const d = new Date(now.getFullYear(), now.getMonth(), 1); return d.toISOString()
  }
  return null
}

export default function AdminDashboard({ session, onLogout }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [total, setTotal] = useState(0)
  const [statsTotal, setStatsTotal] = useState(0)
  const [newCount, setNewCount] = useState(0)
  const [thisWeek, setThisWeek] = useState(0)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [period, setPeriod] = useState<PeriodFilter>('all')
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  function handleSearch(v: string) {
    setSearch(v)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => setDebouncedSearch(v), 300)
  }

  function handleStatus(v: StatusFilter) { setStatus(v); setPage(1) }
  function handlePeriod(v: PeriodFilter) { setPeriod(v); setPage(1) }

  const fetchStats = useCallback(async () => {
    setStatsLoading(true)
    try {
      const weekStart = getPeriodStart('week')!

      const [{ count: t }, { count: n }, { count: w }] = await Promise.all([
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).gte('created_at', weekStart),
      ])

      setStatsTotal(t ?? 0)
      setNewCount(n ?? 0)
      setThisWeek(w ?? 0)
    } catch (err) {
      console.error('[AdminDashboard] fetchStats error:', err)
    } finally {
      setStatsLoading(false)
    }
  }, [])

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase.from('contact_messages').select('*', { count: 'exact' })

      if (debouncedSearch) {
        query = query.or(`name.ilike.%${debouncedSearch}%,email.ilike.%${debouncedSearch}%`)
      }
      if (status !== 'all') query = query.eq('status', status)
      const periodStart = getPeriodStart(period)
      if (periodStart) query = query.gte('created_at', periodStart)

      const from = (page - 1) * PAGE_SIZE
      const { data, count } = await query
        .order('created_at', { ascending: false })
        .range(from, from + PAGE_SIZE - 1)

      setMessages((data as Message[]) ?? [])
      setTotal(count ?? 0)
    } catch (err) {
      console.error('[AdminDashboard] fetchMessages error:', err)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, status, period, page])

  useEffect(() => { fetchStats() }, [fetchStats])
  useEffect(() => { fetchMessages() }, [fetchMessages])

  function refresh() { fetchStats(); fetchMessages() }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminHeader session={session} newCount={newCount} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Contact Messages</h2>
          <p className="text-slate-500 text-sm mt-1">Manage incoming enquiries from the website</p>
        </div>
        <AdminStats total={statsTotal} newCount={newCount} thisWeek={thisWeek} loading={statsLoading} />
        <AdminFilters
          search={search} status={status} period={period}
          onSearch={handleSearch} onStatus={handleStatus} onPeriod={handlePeriod}
        />
        <AdminTable
          messages={messages} loading={loading} total={total}
          page={page} pageSize={PAGE_SIZE}
          onPageChange={setPage} onRefresh={refresh}
        />
      </main>
    </div>
  )
}
