import Head from 'next/head'

export default function Signup() {
  return (
    <>
      <Head>
        <title>Sign Up – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <a href="/">
              <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-32 h-auto" />
            </a>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-[#e0b44a]">
            Create your account
          </h2>

          <form className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="name">Full Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="address">Address</label>
              <input type="text" id="address" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="phone">Phone Number</label>
              <div className="flex gap-2">
                <select id="countryCode" className="w-24 px-2 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]">
                  <option value="+353">+353 (IE)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+61">+61 (AU)</option>
                  <option value="+49">+49 (DE)</option>
                  <option value="+34">+34 (ES)</option>
                  <option value="+39">+39 (IT)</option>
                  {/* Add more if you want later */}
                </select>
                <input type="tel" id="phone" className="flex-1 px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="nationality">Nationality</label>
              <select id="nationality" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]">
                <option value="">Select Nationality</option>
                <option value="Irish">Irish</option>
                <option value="British">British</option>
                <option value="American">American</option>
                <option value="Australian">Australian</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
                <option value="Italian">Italian</option>
                {/* Add more countries here */}
              </select>
            </div>

            {/* Country of Residence */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="residence">Country of Residence</label>
              <select id="residence" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]">
                <option value="">Select Country</option>
                <option value="Ireland">Ireland</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                {/* Add more countries here */}
              </select>
            </div>

            {/* Create Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="password">Create Password</label>
              <input type="password" id="password" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" id="terms" required className="mt-1" />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the <a href="/terms.pdf" target="_blank" className="text-blue-400 underline">terms and conditions</a>
              </label>
            </div>

            {/* KYC Checkbox */}
            <div className="flex items-start gap-2">
              <input type="checkbox" id="kyc" required className="mt-1" />
              <label htmlFor="kyc" className="text-sm text-gray-400">
                I agree to the <a href="/kyc.pdf" target="_blank" className="text-blue-400 underline">KYC checks</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#e0b44a] text-black font-bold py-2 rounded shadow-gold hover:bg-yellow-400 transition"
            >
              Create Account
            </button>

            {/* Already have an account link */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-[#e0b44a] underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
