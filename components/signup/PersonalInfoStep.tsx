import { useState } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Flag from 'react-world-flags'

interface PersonalInfoStepProps {
  onNext: (data: {
    firstName: string;
    lastName: string;
    dob: Date;
    nationality: string;
    residence: string;
  }) => void;
}

const countries = [
  { name: "Afghanistan", code: "AF" }, { name: "Albania", code: "AL" }, { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" }, { name: "Angola", code: "AO" }, { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" }, { name: "Australia", code: "AU" }, { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" }, { name: "Bahamas", code: "BS" }, { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" }, { name: "Belgium", code: "BE" }, { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" }, { name: "China", code: "CN" }, { name: "Denmark", code: "DK" },
  { name: "Egypt", code: "EG" }, { name: "Finland", code: "FI" }, { name: "France", code: "FR" },
  { name: "Germany", code: "DE" }, { name: "Greece", code: "GR" }, { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" }, { name: "Indonesia", code: "ID" }, { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" }, { name: "Italy", code: "IT" }, { name: "Japan", code: "JP" },
  { name: "Malaysia", code: "MY" }, { name: "Mexico", code: "MX" }, { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" }, { name: "Norway", code: "NO" }, { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" }, { name: "Qatar", code: "QA" }, { name: "Russia", code: "RU" },
  { name: "Saudi Arabia", code: "SA" }, { name: "Singapore", code: "SG" }, { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" }, { name: "Spain", code: "ES" }, { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" }, { name: "Thailand", code: "TH" }, { name: "Turkey", code: "TR" },
  { name: "Ukraine", code: "UA" }, { name: "United Arab Emirates", code: "AE" }, { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" }, { name: "Vietnam", code: "VN" }
].sort((a, b) => a.name.localeCompare(b.name));

export default function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState<Date | null>(null)
  const [nationality, setNationality] = useState('Ireland')
  const [residence, setResidence] = useState('Ireland')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (dob) {
      onNext({
        firstName,
        lastName,
        dob,
        nationality,
        residence
      })
    }
  }

  function getMaxDob() {
    const today = new Date()
    today.setFullYear(today.getFullYear() - 18)
    return today
  }

  function getMinDob() {
    const today = new Date()
    today.setFullYear(today.getFullYear() - 90)
    return today
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Let's Get You Verified</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="residence" className="block text-sm font-medium text-gray-400 mb-2">
              Residence
            </label>
            <select
              id="residence"
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.name} className="flex items-center gap-2">
                  <Flag code={country.code} className="w-5 h-4 inline-block mr-2" />
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-400 mb-2">
              Nationality
            </label>
            <select
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.name} className="flex items-center gap-2">
                  <Flag code={country.code} className="w-5 h-4 inline-block mr-2" />
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-2">
              Given / First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-2">
              Surname / Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date of Birth (Year/Month/Day)
            </label>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              maxDate={getMaxDob()}
              minDate={getMinDob()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="yyyy/MM/dd"
              placeholderText="YYYY/MM/DD"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <p className="text-sm text-gray-400 mb-4">
            By continuing, you agree that the above captured personal data is accurate and in line with your KYC documentation.
          </p>
          <button
            type="submit"
            disabled={!firstName || !lastName || !dob}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              firstName && lastName && dob
                ? 'bg-[#e0b44a] text-black hover:bg-yellow-400'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  )
} 