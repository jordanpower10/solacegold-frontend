import Head from 'next/head'
import Link from 'next/link'

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy – Solace Gold</title>
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
              Cookie Policy
            </h1>

            <div className="space-y-8 text-gray-300">
              <section>
                <p className="text-sm text-gray-400 mb-4">Effective Date: 10.06.25</p>
                <p className="leading-relaxed">
                  This Cookie Policy explains how Solacegold uses cookies and similar tracking technologies on our website www.solacegold.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">What are cookies?</h2>
                <p className="leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website. They help us improve your experience by remembering your preferences and visits.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">Types of cookies we use:</h2>
                <ul className="space-y-4 list-disc pl-6">
                  <li>
                    <span className="font-semibold">Essential Cookies</span> – Necessary for website functionality.
                  </li>
                  <li>
                    <span className="font-semibold">Performance Cookies</span> – Collect anonymous usage data to improve performance.
                  </li>
                  <li>
                    <span className="font-semibold">Functional Cookies</span> – Remember user preferences.
                  </li>
                  <li>
                    <span className="font-semibold">Targeting Cookies</span> – Deliver relevant advertisements based on your interests.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">Managing Cookies</h2>
                <p className="leading-relaxed">
                  You can manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of the Website.
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