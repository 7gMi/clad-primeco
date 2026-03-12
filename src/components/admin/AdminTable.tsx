import { useState, Fragment } from 'react'
import { Mail, Trash2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export interface Message {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: 'new' | 'read' | 'responded'
  created_at: string
  ip_address: string | null
}

interface Props {
  messages: Message[]
  loading: boolean
  total: number
  page: number
  pageSize: number
  onPageChange: (p: number) => void
  onRefresh: () => void
}

const STATUS_STYLES = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-yellow-100 text-yellow-700',
  responded: 'bg-green-100 text-green-700',
}

const STATUS_NEXT: Record<Message['status'], Message['status']> = {
  new: 'read',
  read: 'responded',
  responded: 'new',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IE', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Dublin',
  })
}

export default function AdminTable({ messages, loading, total, page, pageSize, onPageChange, onRefresh }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const totalPages = Math.ceil(total / pageSize)

  async function handleStatusChange(msg: Message) {
    setUpdating(msg.id)
    try {
      const { error } = await supabase.from('contact_messages').update({ status: STATUS_NEXT[msg.status] }).eq('id', msg.id)
      if (error) { console.error('[AdminTable] status update error:', error.message); return }
      onRefresh()
    } catch (err) {
      console.error('[AdminTable] status update exception:', err)
    } finally {
      setUpdating(null)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', deleteId)
      if (error) { console.error('[AdminTable] delete error:', error.message); return }
      onRefresh()
    } catch (err) {
      console.error('[AdminTable] delete exception:', err)
    } finally {
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
        Loading messages...
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
        No messages found.
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Message</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.map(msg => (
                <Fragment key={msg.id}>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap text-xs">{formatDate(msg.created_at)}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{msg.name}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{msg.email}</td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell max-w-xs">
                      <button
                        onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                        className="flex items-center gap-1 text-left hover:text-slate-900"
                      >
                        <span className="truncate max-w-48">
                          {expanded === msg.id ? msg.message : msg.message.slice(0, 80) + (msg.message.length > 80 ? '…' : '')}
                        </span>
                        {msg.message.length > 80 && (
                          expanded === msg.id ? <ChevronUp className="w-3 h-3 flex-shrink-0" /> : <ChevronDown className="w-3 h-3 flex-shrink-0" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleStatusChange(msg)}
                        disabled={updating === msg.id}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[msg.status]} hover:opacity-80 transition-opacity disabled:opacity-50`}
                      >
                        {msg.status}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${msg.email}?subject=Re: Your enquiry to Clad-Primeco`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Reply"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setDeleteId(msg.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expanded === msg.id && (
                    <tr key={`${msg.id}-expanded`} className="bg-slate-50 md:hidden">
                      <td colSpan={6} className="px-4 py-3 text-slate-600 text-sm">{msg.message}</td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages} — {total} messages
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteId(null) }}
          onKeyDown={(e) => { if (e.key === 'Escape') setDeleteId(null) }}
          tabIndex={-1}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 id="delete-modal-title" className="font-bold text-slate-900 text-lg mb-2">Delete message?</h3>
            <p className="text-slate-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
