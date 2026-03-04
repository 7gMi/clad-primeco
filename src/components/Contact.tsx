import React, { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Phone, Instagram, MapPin, Clock, ArrowRight } from 'lucide-react'
import Header from './Header'
import BackToTop from './BackToTop'
import { Page } from '../App'

type FormData = { name: string; email: string; phone: string; message: string }

interface ContactProps {
  onNavigate: (page: Page) => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export default function Contact({ onNavigate }: ContactProps) {
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
      setError('Please complete the hCaptcha.')
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
        throw new Error(body?.message || 'Server error')
      }

      setSuccess('Message sent successfully. We will get back to you as soon as possible.')
      setForm({ name: '', email: '', phone: '', message: '' })
      captchaRef.current?.resetCaptcha()
      setToken(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} currentPage="contact" />

      {/* Hero */}
      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/projects/carrigtwohil-college/1_Carrigtwohil_College_Cork.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-blue-500/50"></div>
              <p className="text-white text-base md:text-lg font-light">Get In Touch</p>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Contact <span className="text-blue-600">Us</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Contact Info + Project Photo */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px bg-blue-600 w-12"></div>
                <p className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Contact Information</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                We're here to <span className="text-blue-600">help</span>
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-10">
                Have a project in mind or need expert advice on cladding systems? Reach out to our team directly — we respond quickly and always provide clear, detailed answers.
              </p>
              <div className="space-y-5">
                <a href="tel:0833468913" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Phone</p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">083 346 8913</p>
                  </div>
                </a>
                <a href="mailto:cladprimeco@gmail.com" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Email</p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">cladprimeco@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/projects/dub104-amazon/1_Dub104_Amazon.jpg"
                alt="Clad-Primeco project"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left column — premium info block */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px bg-blue-600 w-12"></div>
                <p className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Send a Message</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Let's discuss your <span className="text-blue-600">project</span>
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-10">
                Whether you need a quote, have a technical question, or want to discuss an upcoming project — our team is ready to help. Fill in the form and we'll get back to you promptly.
              </p>

              {/* Why contact us — numbered feature block */}
              <div className="space-y-0 mb-10">
                <div className="flex gap-5 py-5 border-b border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">01</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Fast, detailed quotes</p>
                    <p className="text-slate-500 text-sm leading-relaxed">We assess your requirements and respond with precise pricing — no vague estimates.</p>
                  </div>
                </div>
                <div className="flex gap-5 py-5 border-b border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">02</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Direct access to our team</p>
                    <p className="text-slate-500 text-sm leading-relaxed">No call centres. You speak directly with the people who will deliver your project.</p>
                  </div>
                </div>
                <div className="flex gap-5 py-5 border-b border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">03</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Serving the Munster region</p>
                    <p className="text-slate-500 text-sm leading-relaxed">Based in Cork, we work across commercial and industrial sites throughout the south of Ireland.</p>
                  </div>
                </div>
              </div>

              {/* Location pill */}
              <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Based in</p>
                  <p className="text-sm font-bold text-slate-900">Cork, Ireland</p>
                </div>
              </div>
            </div>

            {/* Right column — form card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      type="email"
                      required
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone <span className="text-slate-400 font-normal">(optional)</span>
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
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-slate-400" />
                    </div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your project or request..."
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Black contact footer — matches Services.tsx and Projects.tsx exactly */}
      <section className="bg-black text-white min-h-[33vh] flex items-center justify-center py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 border border-white/30 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Phone</div>
                <a
                  href="tel:0833468913"
                  className="text-xl text-white hover:text-blue-500 transition-colors duration-300"
                >
                  083 346 8913
                </a>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-px h-1/2 bg-white/30 transform -translate-y-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Email</div>
                <a
                  href="mailto:cladprimeco@gmail.com"
                  className="text-base md:text-lg text-white hover:text-blue-500 transition-colors duration-300"
                >
                  cladprimeco@gmail.com
                </a>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-px h-1/2 bg-white/30 transform -translate-y-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center group">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Instagram className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Instagram</div>
                <a
                  href="https://www.instagram.com/cladprimeco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white hover:text-blue-500 transition-colors duration-300"
                >
                  @cladprimeco
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  )
}
