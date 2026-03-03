import React, { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

type FormData = { name: string; email: string; message: string }

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha | null>(null)

  const sitekey = import.meta.env.VITE_HCAPTCHA_SITEKEY as string

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hcaptchaToken: token }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Erreur serveur')
      }
      setSuccess('Message envoyé avec succès.')
      setForm({ name: '', email: '', message: '' })
      captchaRef.current?.resetCaptcha()
      setToken(null)
    } catch (err: any) {
      setError(err.message || 'Échec envoi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" required />
        <HCaptcha sitekey={sitekey} onVerify={setToken} onExpire={() => set