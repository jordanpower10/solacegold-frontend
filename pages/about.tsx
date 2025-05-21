import Head from 'next/head'

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How it Works – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] px-4 flex flex-col items-center justify-center text-white font-sans py-10">
        {/* Logo */}
        <div className="mb-6">
          <a href="/">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-32 h-auto hover:opacity-80 transition"
            />
          </a>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#e0b44a] mb-2 text-center">How it Works</h1>
        <p className="text-gray-300 text-center max-w-lg mb-10">
          Safe and secure digital ownership of physical gold.
        </p>

        {/* Process Graphic */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-center text-[#e0b44a]">

          <div className="max-w-xs">
            <img src="/secure-icon.png" alt="Secure Funds Icon" className="mx-auto w-14 mb-4" />
            <h2 className="font-bold text-xl mb-1">Funds are held securely</h2>
            <p className="text-sm text-gray-300">
              Solace Gold’s account holds outside funds. Accounts are kept separate from company finances.
            </p>
          </div>

          <div className="max-w-xs">
            <img src="/gold-bars-icon.png" alt="Gold Bars Icon" className="mx-auto w-14 mb-4" />
            <h2 className="font-bold text-xl mb-1">Allocated gold</h2>
            <p className="text-sm text-gray-300">
              Purchase’s funds are used to acquire physical gold, stored in a secure vault. Title passes to the customer.
            </p>
          </div>

          <div className="max-w-xs">
            <img src="/insurance-icon.png" alt="Insurance Icon" className="mx-auto w-14 mb-4" />
            <h2 className="font-bold text-xl mb-1">Fully insured</h2>
            <p className="text-sm text-gray-300">
              All gold holdings are insured for added protection against loss, theft, or damage.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-500 mt-12 text-sm">solacegold.com</p>
      </div>
    </>
  )
}
