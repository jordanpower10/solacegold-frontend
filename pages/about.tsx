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

        {/* Process Diagram Image */}
        <div className="mb-16">
          <img
            src="https://i.postimg.cc/Sx9vZqdj/transparent-about.png"
            alt="How it Works Process"
            className="w-96 h-auto"
          />
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
