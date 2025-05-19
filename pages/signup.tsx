import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import ReCAPTCHA from 'react-google-recaptcha'

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
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recaptchaToken) {
      alert('❌ Please complete the CAPTCHA')
      return
    }
    if (password !== confirmPassword) {
      alert('❌ Passwords do not match')
      return
    }
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18 || age > 90) {
        alert('❌ You must be between 18 and 90 years old to sign up.');
        setLoading(false);
        return;
      }
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
          nationality
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

  // Helper functions for DOB min/max
  function getMaxDob() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }
  function getMinDob() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 90);
    return today.toISOString().split('T')[0];
  }

  return (
    <>
      <Head>
        <title>Sign Up – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-black px-4 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-2xl border border-[#2a2a2a]">
          <div className="flex justify-center mb-8">
            <a href="/">
              <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-32 h-auto" />
            </a>
          </div>
          <h2 className="text-2xl font-bold text-center mb-8 text-[#e0b44a]">
            Create your account
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                className="input-style" 
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-gray-400 text-sm mb-1">Date of Birth</label>
              <input 
                id="dob"
                type="date" 
                value={dob} 
                onChange={e => setDob(e.target.value)} 
                required 
                min={getMinDob()} 
                max={getMaxDob()} 
                className="input-style text-gray-400" 
              />
            </div>
            <div>
              <select 
                value={nationality} 
                onChange={e => setNationality(e.target.value)} 
                required 
                className="input-style bg-[#1a1a1a] text-gray-400"
              >
                <option value="" className="text-gray-400">Select Nationality</option>
                {countries.map((country) => (
                  <option key={country} value={country} className="text-gray-400">{country}</option>
                ))}
              </select>
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Address" 
                value={address} 
                onChange={e => setAddress(e.target.value)} 
                required 
                className="input-style" 
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={countryCode} 
                onChange={e => setCountryCode(e.target.value)} 
                required 
                className="w-14 input-style bg-[#1a1a1a] text-gray-400 text-sm flex-shrink-0"
              >
                {countryCodes.map((entry) => (
                  <option key={entry.code} value={entry.code}>{entry.code}</option>
                ))}
              </select>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                required 
                className="input-style flex-1 min-w-0" 
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="input-style" 
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Create Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="input-style" 
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                required 
                className="input-style" 
              />
            </div>
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="mt-1.5 h-4 w-4 rounded border-gray-600 bg-[#1a1a1a]" 
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the <a href="/terms.pdf" target="_blank" className="text-[#e0b44a] hover:text-[#f0c45a] underline">terms and conditions</a>
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="kyc" 
                  required 
                  className="mt-1.5 h-4 w-4 rounded border-gray-600 bg-[#1a1a1a]" 
                />
                <label htmlFor="kyc" className="text-sm text-gray-400">
                  I agree to the <a href="/kyc.pdf" target="_blank" className="text-[#e0b44a] hover:text-[#f0c45a] underline">KYC checks</a>
                </label>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                onChange={(token: string | null) => setRecaptchaToken(token || '')}
                theme="dark"
              />
            </div>
            <button 
              type="submit" 
              className="w-full mt-6 bg-[#e0b44a] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#f0c45a] transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{' '}
              <a href="/login" className="text-[#e0b44a] hover:text-[#f0c45a] underline">Log in</a>
            </p>
          </form>
        </div>
      </div>
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          background-color: #1a1a1a;
          border: 1px solid #2a2a2a;
          color: #666;
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          border-color: #e0b44a;
          box-shadow: 0 0 0 1px #e0b44a;
          color: white;
        }
        .input-style::placeholder {
          color: #666;
        }
        .input-style option {
          color: #666;
          background-color: #1a1a1a;
        }
      `}</style>
    </>
  )
}