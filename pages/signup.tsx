import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [dob, setDob] = useState<Date | null>(null)
  const [address, setAddress] = useState('')
  const [countryCode, setCountryCode] = useState('+353')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [nationality, setNationality] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      // SIMPLIFIED APPROACH: Just create the auth user and let triggers handle the rest
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: surname,
            dob: dob ? dob.toISOString().split('T')[0] : '',
            address,
            phone_number: `${countryCode}${phone}`,
            nationality,
            role: 'user' // Add role directly to auth metadata
          }
        }
      })

      if (signUpError) {
        console.error('Signup error:', signUpError)
        throw signUpError
      }
      
      // Success - don't try to create profiles or wallets manually
      alert('✅ Account created! Please check your email.')
      router.push('/login')
    } catch (error: any) {
      console.error('Signup error:', error)
      alert(`❌ ${error.message || 'Database error saving new user'}`)
    } finally {
      setLoading(false)
    }
  }

  // Helper functions for DOB min/max
  function getMaxDob() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today;
  }
  function getMinDob() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 90);
    return today;
  }

  return (
    <>
      <Head>
        <title>Sign Up – Solace Gold</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-[#0d0d0d] px-4 py-8 flex items-center justify-center font-sans">
        <div className="w-full max-w-md bg-[#121212] p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <a href="/">
              <img src="https://i.postimg.cc/zBgSppPL/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-32 h-auto" />
            </a>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-[#e0b44a]">
            Create your account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="First Name" 
                  value={firstName} 
                  onChange={e => setFirstName(e.target.value)} 
                  required 
                  className="input-style" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Surname" 
                  value={surname} 
                  onChange={e => setSurname(e.target.value)} 
                  required 
                  className="input-style" 
                />
              </div>
            </div>

            <div>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="dd/MM/yyyy"
                maxDate={getMaxDob()}
                minDate={getMinDob()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={72}
                placeholderText="Date of Birth"
                className="input-style w-full"
                required
              />
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

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <select 
                  value={countryCode} 
                  onChange={e => setCountryCode(e.target.value)}
                  className="input-style"
                  required
                >
                  {countryCodes.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  required 
                  className="input-style" 
                />
              </div>
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
              <select 
                value={nationality} 
                onChange={e => setNationality(e.target.value)}
                className="input-style"
                required
              >
                <option value="">Select Nationality</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input 
                type="password" 
                placeholder="Password" 
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#e0b44a] text-black font-bold py-2 rounded shadow-gold hover:bg-yellow-400 transition"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="text-sm text-center text-gray-500">
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