import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f5f5f5] font-sans">

        {/* Header Section */}
        <section className="text-center px-6 pt-20 pb-12 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-40 sm:w-48 md:w-56 lg:w-64 mix-blend-lighten"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#e0b44a]">About</span> Solace Gold
          </h1>
          <p className="text-gray-400 text-lg">
            We believe gold should be easy to own. That’s why we’ve stripped away the vaults, the wait, and the friction — and built a platform focused on pure value.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-[#2a2a2a] my-8" />

        {/* What We Do and Why Solace */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#e0b44a]">What We Do</h2>
            <p className="text-gray-300 leading-relaxed">
              Solace Gold offers a modern way to own fully-backed gold — without the burden of physical storage. In just a few clicks, customers can secure real gold at full value, verified and insured at the source, and instantly reflected in their account.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#e0b44a]">Why Solace?</h2>
            <p className="text-gray-300 leading-relaxed">
              Simplicity, speed, and trust. Our platform is designed to feel effortless, but behind the scenes, we partner with top-tier providers to ensure every ounce is traceable, secure, and backed 1:1. Whether you’re buying your first gram or building long-term value, Solace is built for you.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-[#2a2a2a] my-8" />

        {/* Final Statement */}
        <section className="text-center px-6 pb-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-medium text-gray-400">
            Real gold. Modern access. <span className="text-[#e0b44a]">No compromises.</span>
          </h3>
        </section>

        <footer className="text-center text-sm text-gray-600 py-6 border-t border-gray-800">
          &copy; 2025 Solace Gold. All rights reserved.
        </footer>
      </div>
    </>
  )
}
