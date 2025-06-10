import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ReCAPTCHA from 'react-google-recaptcha'
import Link from 'next/link'

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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA verification')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Verify reCAPTCHA first
      const verifyResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyData.success) {
        throw new Error('reCAPTCHA verification failed');
      }

      // Proceed with signup if reCAPTCHA verification succeeded
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
            role: 'user'
          }
        }
      })

      if (signUpError) {
        console.error('Signup error:', signUpError)
        throw signUpError
      }
      
      alert('✅ Account created! Please check your email.')
      router.push('/login')
    } catch (error: any) {
      console.error('Signup error:', error)
      alert(`❌ ${error.message || 'Error during signup process'}`)
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
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                placeholder="First Name" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                required 
                className="input-style flex-1" 
              />
              <input 
                type="text" 
                placeholder="Surname" 
                value={surname} 
                onChange={e => setSurname(e.target.value)} 
                required 
                className="input-style flex-1" 
              />
            </div>

            <div className="w-full">
              <DatePicker
                selected={dob}
                onChange={date => setDob(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Date Of Birth"
                maxDate={getMaxDob()}
                minDate={getMinDob()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="input-style w-full"
                popperClassName="date-picker-popper"
                required
                id="dob"
                wrapperClassName="w-full"
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
                className="input-style w-28 max-w-[90px] bg-[#1a1a1a] text-gray-400 text-sm flex-shrink-0"
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
                style={{ minWidth: 0 }}
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
                  I agree to the <Link href="/terms" className="text-[#e0b44a] hover:text-[#f0c45a] underline">terms and conditions</Link>
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
                  I agree to the <Link href="/kyc-terms" className="text-[#e0b44a] hover:text-[#f0c45a] underline">KYC checks</Link>
                </label>
              </div>
            </div>

            <div className="flex justify-center my-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={setRecaptchaToken}
                theme="dark"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e0b44a] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#c4a043] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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
          font-size: 1rem;
          height: 48px;
          box-sizing: border-box;
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
      <style jsx global>{`
        .input-style::placeholder {
          color: #666;
        }
        .react-datepicker__input-container input.input-style {
          background-color: #1a1a1a;
          border: 1px solid #2a2a2a;
          color: #666;
          border-radius: 0.5rem;
          font-size: 1rem;
          height: 48px;
          padding: 0.75rem 1rem;
          box-sizing: border-box;
        }
        .react-datepicker__input-container input.input-style:focus {
          border-color: #e0b44a;
          box-shadow: 0 0 0 1px #e0b44a;
          color: white;
        }
        .date-picker-popper {
          z-index: 50;
        }
      `}</style>
    </>
  )
}