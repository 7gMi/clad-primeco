import React, { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Phone } from 'lucide-react'

type FormData = { name: string; email: string; phone: string; message: string }

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' })
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!token) {
      setError('Veuillez compléter le hCaptcha.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ ...form, hcaptchaToken: token }),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(body?.message || 'Erreur serveur')
      }

      setSuccess('Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.')
      setForm({ name: '', email: '', phone: '', message: '' })
      captchaRef.current?.resetCaptcha()
      setToken(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Échec de l\'envoi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="h-px bg-gradient-to-r from-blue-600 to-transparent w-24"></div>
            <p className="ml-4 text-sm font-semibold text-blue-600 tracking-wider uppercase">Contactez-nous</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Envoyez-nous un <span className="text-blue-600">message</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Téléphone <span className="text-slate-400 font-normal">(optionnel)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+353 xx xxx xxxx"
                  type="tel"
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Message
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                  <MessageSquare className="w-5 h-5 text-slate-400" />
                </div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet ou votre demande..."
                  required
                  rows={5}
                  className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white resize-none"
                />
              </div>
            </div>

            <div className="flex justify-start">
              <HCaptcha
                sitekey={HCAPTCHA_SITEKEY}
                onVerify={setToken}
                onExpire={() => setToken(null)}
                ref={captchaRef}
                languageOverride="en"
              />
            </div>

            {success && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 text-sm font-medium">{success}</p>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 disabled:shadow-none disabled:translate-y-0"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Envoyer</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
