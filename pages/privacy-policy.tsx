import Head from 'next/head'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy – Solace Gold</title>
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
              Privacy Policy
            </h1>

            <div className="space-y-8 text-gray-300">
              <section>
                <p className="text-sm text-gray-400 mb-4">Effective Date: 10.06.2025</p>
                <p className="leading-relaxed">
                  This Privacy Policy outlines how Solacegold uses your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">1. Information We Collect</h2>
                <p className="leading-relaxed mb-2">We may collect:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Personal identification information (Name, email, address, phone number, etc.)</li>
                  <li>Technical data (IP address, browser type, device info)</li>
                  <li>Usage data (pages visited, interaction with content)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">2. How We Use Your Information</h2>
                <p className="leading-relaxed mb-2">We use your data to:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Provide and maintain our services</li>
                  <li>Communicate with you</li>
                  <li>Improve our Website and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">3. Sharing Your Information</h2>
                <p className="leading-relaxed mb-2">We may share your information with:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Service providers who assist us</li>
                  <li>Legal authorities if required</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">4. Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate security measures to protect your data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">5. Your Rights</h2>
                <p className="leading-relaxed">
                  You may request access to, correction of, or deletion of your personal data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">6. Contact</h2>
                <p className="leading-relaxed">
                  If you have questions about this policy, contact: <a href="mailto:support@solacegold.com" className="text-[#e0b44a] hover:underline">support@solacegold.com</a>
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