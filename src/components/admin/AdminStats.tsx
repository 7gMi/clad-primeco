import { MessageSquare, AlertCircle, Calendar } from 'lucide-react'

interface Props {
  total: number
  newCount: number
  thisWeek: number
  loading: boolean
}

export default function AdminStats({ total, newCount, thisWeek, loading }: Props) {
  const cards = [
    { label: 'Total Messages', value: total, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New', value: newCount, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'This Week', value: thisWeek, icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
          <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
            {loading ? (
              <div className="h-7 w-10 bg-slate-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
