import Head from 'next/head'
import Link from 'next/link'

export default function AcceptableUse() {
  return (
    <>
      <Head>
        <title>Acceptable Use Policy – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] px-4 py-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="flex justify-center mb-12">
            <Link href="/dashboard">
              <img 
                src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" 
                alt="Solace Gold Logo" 
                className="w-32 h-auto hover:opacity-90 transition-opacity" 
              />
            </Link>
          </div>

          {/* Content Section */}
          <div className="bg-[#121212] p-8 rounded-2xl shadow-xl border border-[#2a2a2a]">
            <h1 className="text-3xl font-bold text-center text-[#e0b44a] mb-8">
              Acceptable Use Policy
            </h1>

            <div className="space-y-8 text-gray-300">
              <section>
                <p className="text-sm text-gray-400 mb-4">Effective Date: 10.06.2025</p>
                <p className="leading-relaxed">
                  This Acceptable Use Policy governs your use of the Website and services provided by Solacegold.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">1. Prohibited Activities</h2>
                <p className="leading-relaxed mb-2">You may not:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Use the Website for unlawful purposes</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Introduce viruses or harmful code</li>
                  <li>Use the Website to harass or harm others</li>
                  <li>Violate intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">2. Enforcement</h2>
                <p className="leading-relaxed">
                  Violations may result in termination of access or legal action.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">3. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this policy from time to time. Continued use of the Website constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <p className="leading-relaxed">
                  For questions, contact: <a href="mailto:support@solacegold.com" className="text-[#e0b44a] hover:underline">support@solacegold.com</a>
                </p>
              </section>
            </div>

            <div className="mt-8 flex justify-center">
              <Link 
                href="/"
                className="text-sm text-gray-400 hover:text-[#e0b44a] transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 