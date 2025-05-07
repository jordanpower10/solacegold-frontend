import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

const countries = [
  "Austria", "Belgium", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany",
  "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
  "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "United Kingdom",
  "Algeria", "Bahrain", "Egypt", "Iraq", "Jordan", "Kuwait", "Lebanon", "Morocco", "Oman", "Qatar",
  "Saudi Arabia", "Tunisia", "United Arab Emirates", "China", "Japan", "United States of America"
]

const countryCodes = [
  { code: "+43", name: "Austria" }, { code: "+32", name: "Belgium" }, { code: "+385", name: "Croatia" },
  { code: "+357", name: "Cyprus" }, { code: "+420", name: "Czech Republic" }, { code: "+45", name: "Denmark" },
  { code: "+372", name: "Estonia" }, { code: "+358", name: "Finland" }, { code: "+33", name: "France" },
  { code: "+49", name: "Germany" }, { code: "+30", name: "Greece" }, { code: "+36", name: "Hungary" },
  { code: "+354", name: "Iceland" }, { code: "+353", name: "Ireland" }, { code: "+39", name: "Italy" },
  { code: "+371", name: "Latvia" }, { code: "+370", name: "Lithuania" }, { code: "+352", name: "Luxembourg" },
  { code: "+356", name: "Malta" }, { code: "+31", name: "Netherlands" }, { code: "+47", name: "Norway" },
  { code: "+48", name: "Poland" }, { code: "+351", name: "Portugal" }, { code: "+40", name: "Romania" },
  { code: "+421", name: "Slovakia" }, { code: "+386", name: "Slovenia" }, { code: "+34", name: "Spain" },
  { code: "+46", name: "Sweden" }, { code: "+41", name: "Switzerland" }, { code: "+44", name: "United Kingdom" },
  { code: "+213", name: "Algeria" }, { code: "+973", name: "Bahrain" }, { code: "+20", name: "Egypt" },
  { code: "+964", name: "Iraq" }, { code: "+962", name: "Jordan" }, { code: "+965", name: "Kuwait" },
  { code: "+961", name: "Lebanon" }, { code: "+212", name: "Morocco" }, { code: "+968", name: "Oman" },
  { code: "+974", name: "Qatar" }, { code: "+966", name: "Saudi Arabia" }, { code: "+216", name: "Tunisia" },
  { code: "+971", name: "United Arab Emirates" }, { code: "+86", name: "China" }, { code: "+81", name: "Japan" },
  { code: "+1", name: "United States of America" }
]

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [address, setAddress] = useState('')
  const [countryCode, setCountryCode] = useState('+353')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [nationality, setNationality] = useState('')
  const [residence, setResidence] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('❌ Passwords do not match')
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          dob,
          address,
          phone: `${countryCode}${phone}`,
          nationality,
          residence
        }
      }
    })
    setLoading(false)
    if (error) {
      alert(`❌ ${error.message}`)
    } else {
      alert('✅ Account created! Please check your email.')
      router.push('/login')
    }
  }

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="input-style" />
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} required className="input-style" />
            <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required className="input-style" />
            <div className="flex gap-2">
              <select value={countryCode} onChange={e => setCountryCode(e.target.value)} required className="w-28 input-style">
                {countryCodes.map((entry) => (
                  <option key={entry.code} value={entry.code}>{entry.code} ({entry.name})</option>
                ))}
              </select>
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required className="flex-1 input-style" />
            </div>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="input-style" />
            <select value={nationality} onChange={e => setNationality(e.target.value)} required className="input-style">
              <option value="">Select Nationality</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select value={residence} onChange={e => setResidence(e.target.value)} required className="input-style">
              <option value="">Select Country of Residence</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <input type="password" placeholder="Create Password" value={password} onChange={e => setPassword(e.target.value)} required className="input-style" />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="input-style" />
            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" id="terms" required className="mt-1" />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the <a href="/terms.pdf" target="_blank" className="text-blue-400 underline">terms and conditions</a>
              </label>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="kyc" required className="mt-1" />
              <label htmlFor="kyc" className="text-sm text-gray-400">
                I agree to the <a href="/kyc.pdf" target="_blank" className="text-blue-400 underline">KYC checks</a>
              </label>
            </div>
            <button type="submit" className="w-full mt-4 bg-[#e0b44a] text-black font-bold py-2 rounded shadow-gold hover:bg-yellow-400 transition">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-[#e0b44a] underline">Log in</a>
            </p>
          </form>
        </div>
      </div>
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          background-color: #121212;
          border: 1px solid #2a2a2a;
          color: white;
          outline: none;
        }
        .input-style:focus {
          border-color: #e0b44a;
          box-shadow: 0 0 0 2px #e0b44a;
        }
      `}</style>
    </>
  )
}
