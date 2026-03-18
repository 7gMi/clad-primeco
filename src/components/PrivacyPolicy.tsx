import { usePageMeta } from '../hooks/usePageMeta';

export default function PrivacyPolicy() {
  usePageMeta({
    title: 'Privacy Policy | Clad-Primeco',
    description: 'How Clad Primeco collects, uses, and protects your personal data.',
  });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Privacy <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-slate-500 mb-12">Last updated: 5 March 2026</p>

          <div className="prose prose-slate prose-lg max-w-none space-y-10">
            <section aria-labelledby="who-we-are">
              <h2 id="who-we-are" className="text-2xl font-bold text-slate-900 mb-3">
                1. Who We Are
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Clad Primeco is a cladding and roofing contractor based in Dublin, Ireland. We are
                the data controller responsible for your personal data collected through this
                website.
              </p>
              <p className="text-slate-700 leading-relaxed mt-2">
                <strong>Contact:</strong>{' '}
                <a href="mailto:cladprimeco@outlook.com" className="text-blue-600 hover:underline">
                  cladprimeco@outlook.com
                </a>
              </p>
            </section>

            <section aria-labelledby="data-we-collect">
              <h2 id="data-we-collect" className="text-2xl font-bold text-slate-900 mb-3">
                2. Data We Collect
              </h2>
              <p className="text-slate-700 leading-relaxed">
                When you use our contact form, we collect the following information:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1 mt-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (optional)</li>
                <li>Service of interest (optional)</li>
                <li>Message content</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-2">
                We do not use tracking cookies, third-party analytics, or advertising pixels on this
                website.
              </p>
            </section>

            <section aria-labelledby="how-we-use">
              <h2 id="how-we-use" className="text-2xl font-bold text-slate-900 mb-3">
                3. How We Use Your Data
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Your data is used solely to respond to your enquiry — whether that is providing a
                quote, answering a technical question, or discussing an upcoming project. We do not
                use your data for marketing purposes unless you explicitly opt in.
              </p>
            </section>

            <section aria-labelledby="legal-basis">
              <h2 id="legal-basis" className="text-2xl font-bold text-slate-900 mb-3">
                4. Legal Basis
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We process your personal data on the following legal bases under the GDPR:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1 mt-2">
                <li>
                  <strong>Consent</strong> — you voluntarily submit your data through our contact
                  form.
                </li>
                <li>
                  <strong>Legitimate interest</strong> — to respond to business enquiries and
                  provide our services.
                </li>
              </ul>
            </section>

            <section aria-labelledby="data-sharing">
              <h2 id="data-sharing" className="text-2xl font-bold text-slate-900 mb-3">
                5. Data Sharing
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We do not sell, rent, or share your personal data with third parties. Your data is
                stored securely using our hosting and database infrastructure providers (Vercel and
                Supabase), which act as data processors on our behalf.
              </p>
            </section>

            <section aria-labelledby="data-retention">
              <h2 id="data-retention" className="text-2xl font-bold text-slate-900 mb-3">
                6. Data Retention
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We retain contact form submissions for up to 24 months from the date of submission.
                After this period, data is securely deleted unless there is an ongoing business
                relationship that requires us to keep it.
              </p>
            </section>

            <section aria-labelledby="your-rights">
              <h2 id="your-rights" className="text-2xl font-bold text-slate-900 mb-3">
                7. Your Rights
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Under the GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1 mt-2">
                <li>
                  <strong>Access</strong> — request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong>Rectification</strong> — ask us to correct inaccurate data.
                </li>
                <li>
                  <strong>Erasure</strong> — ask us to delete your data ("right to be forgotten").
                </li>
                <li>
                  <strong>Restriction</strong> — ask us to limit how we process your data.
                </li>
                <li>
                  <strong>Portability</strong> — receive your data in a structured, machine-readable
                  format.
                </li>
                <li>
                  <strong>Objection</strong> — object to processing based on legitimate interest.
                </li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-2">
                To exercise any of these rights, email us at{' '}
                <a href="mailto:cladprimeco@outlook.com" className="text-blue-600 hover:underline">
                  cladprimeco@outlook.com
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            <section aria-labelledby="security">
              <h2 id="security" className="text-2xl font-bold text-slate-900 mb-3">
                8. Security
              </h2>
              <p className="text-slate-700 leading-relaxed">
                We implement appropriate technical and organisational measures to protect your
                personal data, including encrypted data transmission (HTTPS), secure database
                storage with row-level security, and restricted access to authorised personnel only.
              </p>
            </section>

            <section aria-labelledby="contact-info">
              <h2 id="contact-info" className="text-2xl font-bold text-slate-900 mb-3">
                9. Contact
              </h2>
              <p className="text-slate-700 leading-relaxed">
                If you have any questions about this privacy policy or wish to exercise your data
                rights, contact us at:
              </p>
              <p className="text-slate-700 leading-relaxed mt-2">
                <strong>Clad Primeco</strong>
                <br />
                Dublin, Ireland
                <br />
                Email:{' '}
                <a href="mailto:cladprimeco@outlook.com" className="text-blue-600 hover:underline">
                  cladprimeco@outlook.com
                </a>
                <br />
                Phone:{' '}
                <a href="tel:+353833468913" className="text-blue-600 hover:underline">
                  083 346 8913
                </a>
              </p>
              <p className="text-slate-700 leading-relaxed mt-4">
                You also have the right to lodge a complaint with the Irish Data Protection
                Commission (DPC) at{' '}
                <a
                  href="https://www.dataprotection.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  www.dataprotection.ie
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
