import Head from 'next/head'
import Link from 'next/link'

export default function HelpCenter() {
  return (
    <>
      <Head>
        <title>Help Center - SolaceGold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="SolaceGold Help Center - Get support for your gold trading needs" />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
        {/* Header */}
        <div className="py-8">
          <Link href="/">
            <img
              src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png"
              alt="SolaceGold Logo"
              className="w-32 h-32 mx-auto hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-[#e0b44a]">Help</span> Center
          </h1>
          
          {/* Support Message */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 mb-12">
            <p className="text-xl text-gray-400">
              For urgent queries and account issues please contact us at{' '}
              <a href="mailto:support@solacegold.com" className="text-[#e0b44a] hover:underline">
                support@solacegold.com
              </a>
              . One of our support agents will be in touch as soon as possible.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/faq"
              className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#e0b44a] transition-all"
            >
              <h3 className="text-xl font-bold mb-2">FAQ</h3>
              <p className="text-gray-400">Find answers to frequently asked questions</p>
            </Link>
            <Link 
              href="/contact"
              className="bg-[#121212] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#e0b44a] transition-all"
            >
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-gray-400">Get in touch with our support team</p>
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#121212] border-t border-[#2a2a2a] py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Solacegold Ltd. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 