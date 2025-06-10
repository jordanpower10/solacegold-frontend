import Head from 'next/head'
import Link from 'next/link'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions – Solace Gold</title>
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
              SolaceGold Terms & Conditions
            </h1>

            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">1. Introduction</h2>
                <p className="leading-relaxed">
                  These Terms and Conditions ("Terms") govern the use of the SolaceGold platform, website, and services. By
                  accessing or using SolaceGold, users agree to be bound by these Terms in full. If you do not accept these
                  Terms, you must discontinue use of the platform immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">2. No Financial Advice or Guarantees</h2>
                <p className="leading-relaxed">
                  SolaceGold is not a financial advisor, investment firm, or fiduciary. All content, data, and services provided
                  are for informational purposes only. SolaceGold does not guarantee returns, performance, or financial
                  outcomes of any nature. Any investment or purchase decision made through the platform is at the sole
                  discretion and risk of the user.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">3. Risk Disclosure</h2>
                <p className="leading-relaxed">
                  Investing in commodities such as gold involves risks, including market volatility and potential loss of principal.
                  Users should conduct their own independent research and consult with a licensed financial advisor before
                  making any investment decisions. SolaceGold accepts no responsibility for losses or missed gains arising
                  from the use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">4. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  To the fullest extent permitted by law, SolaceGold and its directors, officers, affiliates, and employees shall
                  not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from: (i) the use
                  or inability to use the platform, (ii) any delays, interruptions, or site errors, (iii) the conduct or actions of any
                  third-party services including payment or KYC providers, or (iv) loss of data, funds, or investment value.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">5. System Availability and Errors</h2>
                <p className="leading-relaxed">
                  SolaceGold strives to maintain continuous and secure access to its platform, but makes no guarantees
                  regarding uptime, bug-free performance, or freedom from interruptions. We are not responsible for any
                  technical failures, server issues, data inaccuracies, or errors affecting user experience or trading decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">6. Third-Party Services</h2>
                <p className="leading-relaxed">
                  The platform may use third-party providers for services such as KYC verification, payment processing, and
                  market data. SolaceGold is not liable for the actions, decisions, or service performance of these third parties.
                  Users agree that they may be subject to the terms and policies of those third-party services as a condition of
                  using SolaceGold.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">7. Indemnity</h2>
                <p className="leading-relaxed">
                  Users agree to indemnify, defend, and hold harmless SolaceGold and its affiliates from any claims, liabilities,
                  damages, losses, and expenses, including legal fees, arising from their use of the platform or violation of
                  these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">8. Changes to Terms</h2>
                <p className="leading-relaxed">
                  SolaceGold reserves the right to update or revise these Terms at any time. Changes will be effective
                  immediately upon posting. Continued use of the platform after any updates constitutes acceptance of the
                  revised Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">9. Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms are governed by the laws of the jurisdiction in which SolaceGold is incorporated. Any disputes
                  shall be subject to the exclusive jurisdiction of the courts in that location.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">10. Acceptance</h2>
                <p className="leading-relaxed">
                  By using SolaceGold, you confirm that you have read, understood, and agreed to these Terms and
                  Conditions in full.
                </p>
              </section>
            </div>

            <div className="mt-8 flex justify-center">
              <Link 
                href="/signup"
                className="text-sm text-gray-400 hover:text-[#e0b44a] transition-colors"
              >
                Return to Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 