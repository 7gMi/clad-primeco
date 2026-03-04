import { LogOut, Bell } from 'lucide-react'
import { Session } from '@supabase/supabase-js'

interface Props {
  session: Session
  newCount: number
  onLogout: () => void
}

export default function AdminHeader({ session, newCount, onLogout }: Props) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">CP</span>
        </div>
        <div>
          <h1 className="font-bold text-slate-900 leading-none">Clad-Primeco</h1>
          <p className="text-xs text-slate-400 mt-0.5">Admin Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {newCount > 0 && (
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold">
            <Bell className="w-4 h-4" />
            {newCount} new
          </div>
        )}
        <span className="text-sm text-slate-500 hidden sm:block">{session.user.email}</span>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  )
}
