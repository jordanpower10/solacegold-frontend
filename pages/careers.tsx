import Head from 'next/head'
import Link from 'next/link'

export default function Careers() {
  return (
    <>
      <Head>
        <title>Careers - SolaceGold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Career opportunities at SolaceGold" />
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
            <span className="text-[#e0b44a]">Careers</span> at SolaceGold
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Join us in revolutionizing gold ownership for the digital age
          </p>
          
          {/* No Positions Message */}
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-8 mb-12">
            <p className="text-xl text-gray-400">
              No positions currently available at Solacegold
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Interested in future opportunities? Feel free to reach out.
            </p>
            <Link 
              href="/contact"
              className="px-8 py-4 bg-[#e0b44a] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 inline-block"
            >
              Contact Us
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