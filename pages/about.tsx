import Head from 'next/head'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  }

  return (
    <>
      <Head>
        <title>How it Works – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-black px-4 flex flex-col items-center justify-center text-white font-sans py-10">
        {/* Logo */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/">
            <img
              src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png"
              alt="Solace Gold Logo"
              className="w-32 h-auto hover:opacity-80 transition"
            />
          </a>
        </motion.div>

        {/* Title and Subtitle */}
        <motion.h1 
          className="text-5xl font-bold text-[#e0b44a] mb-6"
          {...fadeInUp}
        >
          How it Works
        </motion.h1>
        <motion.p 
          className="text-2xl text-gray-300 text-center max-w-2xl mb-16"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Safe and secure digital ownership of physical gold.
        </motion.p>

        {/* Process Diagram Image */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.postimg.cc/Sx9vZqdj/transparent-about.png"
            alt="How it Works Process"
            className="w-96 h-auto"
          />
        </motion.div>

        {/* Process Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <motion.div 
            className="text-center"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-[#e0b44a] mb-4">Funds are held securely</h2>
            <p className="text-gray-300">
              Solace Gold's account holds outside funds. Accounts are kept separate from company finances.
            </p>
          </motion.div>

          <motion.div 
            className="text-center"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#e0b44a] mb-4">Allocated gold</h2>
            <p className="text-gray-300">
              Purchase's funds are used to acquire physical gold, stored in a secure vault. Title passes to the customer.
            </p>
          </motion.div>
        </div>

        {/* Fully Insured Section */}
        <motion.div 
          className="text-center mt-12 max-w-2xl"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#e0b44a] mb-4">Fully insured</h2>
          <p className="text-gray-300">
            All gold holdings are insured for added protection against loss, theft, or damage.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-gray-500 mt-16 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          solacegold.com
        </motion.p>
      </div>
    </>
  )
}
