import React, { useState, useRef, useCallback } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Phone, Instagram, MapPin, ChevronDown } from 'lucide-react'
import Header from './Header'
import BackToTop from './BackToTop'
import Footer from './Footer'
import { Page } from '../App'

type FormData = { name: string; email: string; phone: string; service: string; message: string }

interface ContactProps {
  onNavigate: (page: Page) => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export default function Contact({ onNavigate }: ContactProps) {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', service: '', message: '' })
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha | null>(null)
  // M8: synchronous in-flight lock — prevents double-submit regardless of render cycle
  const submittingRef = useRef(false)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submittingRef.current || loading) return
    submittingRef.current = true
    setError(null)
    setSuccess(null)

    if (!token) {
      setError('Please complete the hCaptcha.')
      submittingRef.current = false
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.')
      submittingRef.current = false
      return
    }

    // M7: phone validation (optional field — only validate if non-empty)
    if (form.phone.trim() !== '') {
      const phoneRegex = /^(\+353|0)[0-9\s]{7,14}$/
      if (!phoneRegex.test(form.phone.trim())) {
        setError('Please enter a valid Irish phone number (e.g. 083 346 8913).')
        submittingRef.current = false
        return
      }
    }

    // M9: runtime guard for missing env vars
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setError('Service configuration error. Please contact us directly at cladprimeco@outlook.com.')
      submittingRef.current = false
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

      setSuccess('Message received. A member of our team will come back to you within 24 hours — usually sooner.')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
      captchaRef.current?.resetCaptcha()
      setToken(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
      captchaRef.current?.resetCaptcha()
      setToken(null)
    } finally {
      setLoading(false)
      submittingRef.current = false
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header onNavigate={onNavigate} currentPage="contact" />

      {/* Hero */}
      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/projects/sandyford-warehouse/1_Sandyford_Warehouse_Depot.JPG)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-blue-500/50"></div>
              <p className="text-white text-base md:text-lg font-light">Request a Quote or Ask a Question</p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
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
                Talk to the <span className="text-blue-600">team</span>
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-10">
                Got a project coming up? Send us your brief or drawings and we will come back with a detailed, competitive quote. No sales process — just straight answers from the people who do the work.
              </p>
              <div className="space-y-5">
                <a href="tel:+353833468913" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Phone</p>
                    <p className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">083 346 8913</p>
                  </div>
                </a>
                <a href="mailto:cladprimeco@outlook.com" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Email</p>
                    <p className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors break-all">cladprimeco@outlook.com</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/projects/dub01-vantage/10_Dub01_Vantage_Power_Station.jpg"
                alt="Clad Primeco team at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section id="contact-form" className="bg-slate-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                    <p className="font-semibold text-slate-900 mb-1">Precise quotes, fast turnaround</p>
                    <p className="text-slate-500 text-sm leading-relaxed">We review your requirements and respond with accurate, itemised pricing — no ballpark figures, no back-and-forth.</p>
                  </div>
                </div>
                <div className="flex gap-5 py-5 border-b border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">02</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Direct line to the decision-makers</p>
                    <p className="text-slate-500 text-sm leading-relaxed">No intermediaries. You deal directly with the team responsible for delivering your project — from quote to completion.</p>
                  </div>
                </div>
                <div className="flex gap-5 py-5 border-b border-slate-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">03</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Ireland-wide delivery capacity</p>
                    <p className="text-slate-500 text-sm leading-relaxed">Dublin-based, nationwide reach. We have completed projects from Cork to Wexford to Limerick — and everywhere in between.</p>
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
                  <p className="text-sm font-bold text-slate-900">Dublin, Ireland</p>
                </div>
              </div>
            </div>

            {/* Right column — form card */}
            <div className="bg-white rounded-2xl shadow-md sm:shadow-xl border border-slate-100 p-4 sm:p-8 md:p-10 w-full min-w-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      id="contact-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      id="contact-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+353 xx xxx xxxx"
                      type="tel"
                      autoComplete="tel"
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-sm font-semibold text-slate-700 mb-2">
                    Service <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white appearance-none"
                    >
                      <option value="">Select a service...</option>
                      <option value="Kingspan Cladding">Kingspan Cladding</option>
                      <option value="Architectural Panels">Architectural Panels</option>
                      <option value="Aluminium Copings & Roof Deck">Aluminium Copings &amp; Roof Deck</option>
                      <option value="Other">Other / Not sure</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-slate-400" />
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project — location, scope, timeline, or any specific requirements. The more detail, the faster we can respond with an accurate quote."
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white focus:bg-white resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {HCAPTCHA_SITEKEY ? (
                    <div className="overflow-x-auto">
                      <HCaptcha
                        sitekey={HCAPTCHA_SITEKEY}
                        onVerify={setToken}
                        onExpire={() => setToken(null)}
                        ref={captchaRef}
                        languageOverride="en"
                      />
                    </div>
                  ) : (
                    <p className="text-red-500 text-sm">Captcha configuration error. Please contact us directly at cladprimeco@outlook.com.</p>
                  )}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    By submitting this form, you agree to our Privacy Policy. Your data is used solely to respond to your enquiry and is never shared with third parties.
                  </p>
                </div>

                {success && (
                  <div role="status" aria-live="polite" aria-atomic="true" className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-green-700 text-sm font-medium">{success}</p>
                  </div>
                )}

                {error && (
                  <div role="alert" aria-live="assertive" aria-atomic="true" className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 border border-white/30 rounded-lg p-4 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Phone</div>
                <a
                  href="tel:+353833468913"
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
                  href="mailto:cladprimeco@outlook.com"
                  className="text-sm md:text-lg text-white hover:text-blue-500 transition-colors duration-300 break-all"
                >
                  cladprimeco@outlook.com
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

      <Footer />
      <BackToTop />
    </div>
  )
}
