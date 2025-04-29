// PART 1 of signup.tsx with full country codes + dropdowns

import Head from 'next/head'

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
  "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali"
]

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+353", name: "Ireland" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+34", name: "Spain" },
  { code: "+39", name: "Italy" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  { code: "+86", name: "China" },
  { code: "+91", name: "India" },
  { code: "+7", name: "Russia" },
  { code: "+90", name: "Turkey" },
  { code: "+880", name: "Bangladesh" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+971", name: "UAE" }
  // Extend this list as needed
]

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
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="name">Full Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="address">Address</label>
              <input type="text" id="address" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="phone">Phone Number</label>
              <div className="flex gap-2">
                <select id="countryCode" className="w-28 px-2 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]">
                  {countryCodes.map((entry) => (
                    <option key={entry.code} value={entry.code}>{entry.code} ({entry.name})</option>
                  ))}
                </select>
                <input type="tel" id="phone" className="flex-1 px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="nationality">Nationality</label>
              <select id="nationality" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]">
                <option value="">Select Nationality</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="residence">Country of Residence</label>
              <select id="residence" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]">
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="password">Create Password</label>
              <input type="password" id="password" className="w-full px-4 py-2 rounded bg-[#121212] border border-[#2a2a2a] text-white focus:outline-none focus:ring-2 focus:ring-[#e0b44a]" />
            </div>

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

            <button
              type="submit"
              className="w-full mt-4 bg-[#e0b44a] text-black font-bold py-2 rounded shadow-gold hover:bg-yellow-400 transition"
            >
              Create Account
            </button>

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
