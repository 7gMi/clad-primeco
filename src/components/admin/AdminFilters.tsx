import { Search, X } from 'lucide-react'

export type StatusFilter = 'all' | 'new' | 'read' | 'responded'
export type PeriodFilter = 'all' | 'today' | 'week' | 'month'

interface Props {
  search: string
  status: StatusFilter
  period: PeriodFilter
  onSearch: (v: string) => void
  onStatus: (v: StatusFilter) => void
  onPeriod: (v: PeriodFilter) => void
}

export default function AdminFilters({ search, status, period, onSearch, onStatus, onPeriod }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
        />
        {search && (
          <button onClick={() => onSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <select
        value={status}
        onChange={e => onStatus(e.target.value as StatusFilter)}
        className="py-2 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
      >
        <option value="all">All statuses</option>
        <option value="new">New</option>
        <option value="read">Read</option>
        <option value="responded">Responded</option>
      </select>

      <select
        value={period}
        onChange={e => onPeriod(e.target.value as PeriodFilter)}
        className="py-2 px-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
      >
        <option value="all">All time</option>
        <option value="today">Today</option>
        <option value="week">This week</option>
        <option value="month">This month</option>
      </select>
    </div>
  )
}
