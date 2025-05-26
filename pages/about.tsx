import Head from 'next/head'

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How it Works – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-black px-4 flex flex-col items-center justify-center text-white font-sans py-10">
        {/* Logo */}
        <div className="mb-12">
          <a href="/">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-32 h-auto hover:opacity-80 transition"
            />
          </a>
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-5xl font-bold text-[#e0b44a] mb-6">How it Works</h1>
        <p className="text-2xl text-gray-300 text-center max-w-2xl mb-16">
          Safe and secure digital ownership of physical gold.
        </p>

        {/* Process Diagram */}
        <div className="w-72 h-72 relative mb-16">
          {/* Dollar Icon */}
          <div className="absolute left-0 bottom-0 w-20 h-20 border-2 border-[#e0b44a] rounded-lg flex items-center justify-center">
            <span className="text-[#e0b44a] text-3xl">$</span>
          </div>

          {/* Shield Icon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 border-2 border-[#e0b44a] rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[#e0b44a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          {/* Gold Bars Icon */}
          <div className="absolute right-0 bottom-0 w-20 h-20 border-2 border-[#e0b44a] flex items-center justify-center">
            <svg className="w-10 h-10 text-[#e0b44a]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 8h16v3H4zm0 5h16v3H4z" />
            </svg>
          </div>

          {/* Arrows */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 300 300">
              <path
                d="M60 200 L150 50 L240 200"
                fill="none"
                stroke="#e0b44a"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M240 200 L60 200"
                fill="none"
                stroke="#e0b44a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Process Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#e0b44a] mb-4">Funds are held securely</h2>
            <p className="text-gray-300">
              Solace Gold's account holds outside funds. Accounts are kept separate from company finances.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#e0b44a] mb-4">Allocated gold</h2>
            <p className="text-gray-300">
              Purchase's funds are used to acquire physical gold, stored in a secure vault. Title passes to the customer.
            </p>
          </div>
        </div>

        {/* Fully Insured Section */}
        <div className="text-center mt-12 max-w-2xl">
          <h2 className="text-2xl font-bold text-[#e0b44a] mb-4">Fully insured</h2>
          <p className="text-gray-300">
            All gold holdings are insured for added protection against loss, theft, or damage.
          </p>
        </div>

        {/* Footer */}
        <p className="text-gray-500 mt-16 text-lg">solacegold.com</p>
      </div>
    </>
  )
}
