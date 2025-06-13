import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "What is SolaceGold?",
      answer: "SolaceGold is a digital platform that allows you to buy, store, and transfer gold instantly. We provide a secure and efficient way to invest in gold without the hassles of physical storage."
    },
    {
      question: "Is my gold investment secure?",
      answer: "Yes, all gold purchased through SolaceGold is 100% backed by physical gold stored in high-security vaults. We maintain full reserves and your investment is fully insured."
    },
    {
      question: "Are there any storage fees?",
      answer: "No, SolaceGold does not charge any storage or vault fees. Once you purchase gold, it's yours to keep without any additional costs."
    },
    {
      question: "How do I start investing in gold?",
      answer: "Getting started is easy. Simply create an account, complete the KYC verification process, deposit funds, and you can start buying gold instantly."
    },
    {
      question: "Can I sell my gold at any time?",
      answer: "Yes, you can sell your gold holdings at any time during market hours. The process is instant and the funds will be credited to your account immediately."
    },
    {
      question: "What are the minimum and maximum investment amounts?",
      answer: "You can start investing with as little as 0.01 oz of gold. There is no upper limit on how much you can invest, subject to our compliance requirements."
    },
    {
      question: "How is the gold price determined?",
      answer: "Our gold prices are based on real-time market rates and are updated continuously to reflect the current global gold market."
    }
  ]

  return (
    <>
      <Head>
        <title>FAQ - SolaceGold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Frequently Asked Questions about SolaceGold's digital gold trading platform" />
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
        <main className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="text-[#e0b44a]">Frequently Asked</span> Questions
          </h1>
          <p className="text-xl text-gray-400 mb-12 text-center">
            Find answers to common questions about SolaceGold
          </p>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1a1a1a] transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-[#2a2a2a] text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Still have questions? We're here to help.
            </p>
            <Link 
              href="/help"
              className="px-8 py-4 bg-[#e0b44a] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 inline-block"
            >
              Visit Help Center
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