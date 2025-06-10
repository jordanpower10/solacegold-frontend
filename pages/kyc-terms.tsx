import Head from 'next/head'
import Link from 'next/link'

export default function KYCTerms() {
  return (
    <>
      <Head>
        <title>KYC Terms & Conditions – Solace Gold</title>
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
              SolaceGold KYC Terms & Conditions
            </h1>

            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">1. Overview</h2>
                <p className="leading-relaxed">
                  At SolaceGold, Know Your Customer (KYC) procedures are conducted by an independent, regulated
                  third-party verification provider. This provider handles all aspects of identity verification, document review,
                  and approval or rejection decisions related to customer verification. SolaceGold does not collect, store, view,
                  or make decisions on any user-submitted documents. We act solely as an intermediary facilitating the
                  onboarding process through secure, automated integrations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">2. External KYC Provider</h2>
                <p className="leading-relaxed">
                  All KYC processes are carried out by a designated external provider. By using SolaceGold's services, users
                  agree that all KYC-related decisions, processing timelines, and documentation evaluations are the sole
                  responsibility of the external provider. SolaceGold bears no liability for any issues arising from such
                  processes, including but not limited to delayed verifications, denied access, or documentation disputes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">3. No Access to Documents</h2>
                <p className="leading-relaxed">
                  SolaceGold does not access, view, or store any documents submitted during the KYC process. All personal
                  data is handled exclusively by the third-party provider in accordance with their privacy policy and applicable
                  data protection laws. SolaceGold cannot and will not intervene in the document review process.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">4. User Responsibility</h2>
                <p className="leading-relaxed">
                  Users are solely responsible for providing accurate, complete, and up-to-date information during the
                  verification process. Failure to do so may result in rejection or delays, for which SolaceGold bears no
                  responsibility. Users must contact the third-party KYC provider directly in the event of disputes or
                  clarifications.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">5. Indemnity and Limitation of Liability</h2>
                <p className="leading-relaxed">
                  SolaceGold, its directors, employees, and affiliates shall not be held liable for any losses, damages, delays,
                  or disputes resulting from the KYC process. By using SolaceGold's platform, users agree to indemnify and
                  hold harmless SolaceGold against any legal claims or financial damages arising from their KYC outcome or
                  interaction with the external provider.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">6. Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                  SolaceGold is incorporated. Any disputes arising under these Terms shall be resolved through binding
                  arbitration or the appropriate courts of competent jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#e0b44a] mb-3">7. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By proceeding with KYC verification through SolaceGold's platform, the user acknowledges and accepts
                  these terms and conditions in full.
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