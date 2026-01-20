import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import Header from './Header';
import { Page } from '../App';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ContactProps {
  onNavigate: (page: Page) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24">
      <Header onNavigate={onNavigate} currentPage="contact" />

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm md:text-base lg:text-lg mb-4 font-medium tracking-wider uppercase">
            Get in touch
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            If you have questions we encourage you to send them to us through email or call us.
            We would love to present and discuss with you all the details of the services offered by us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-300 font-semibold">Message sent successfully!</p>
                    <p className="text-green-200 text-sm">We'll get back to you shortly.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-300 font-semibold">Error sending message</p>
                    <p className="text-red-200 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white px-8 py-4 rounded-3xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-2xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+353 (83) 346 9813</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-2xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">info@cladprimeco.ie</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-2xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Address</h3>
                    <p className="text-gray-300">Dublin, Ireland</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h3 className="text-white text-xl font-bold mb-4">Our Solutions</h3>
              <p className="text-gray-300 leading-relaxed">
                At Clad Primeco, we specialize in Kingspan panels, architectural panels, and aluminium copings. Our project ideas offer perfect solutions to transform your industrial facilities into modern geometric structures.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h3 className="text-white text-xl font-bold mb-6">Follow us on</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/cladprimeco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
