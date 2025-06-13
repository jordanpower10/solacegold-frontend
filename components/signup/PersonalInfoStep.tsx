import { useState } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'flag-icons/css/flag-icons.min.css'

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
  { name: "Afghanistan", code: "af" }, { name: "Albania", code: "al" }, { name: "Algeria", code: "dz" },
  { name: "Andorra", code: "ad" }, { name: "Angola", code: "ao" }, { name: "Argentina", code: "ar" },
  { name: "Armenia", code: "am" }, { name: "Australia", code: "au" }, { name: "Austria", code: "at" },
  { name: "Azerbaijan", code: "az" }, { name: "Bahamas", code: "bs" }, { name: "Bahrain", code: "bh" },
  { name: "Bangladesh", code: "bd" }, { name: "Belgium", code: "be" }, { name: "Brazil", code: "br" },
  { name: "Canada", code: "ca" }, { name: "China", code: "cn" }, { name: "Denmark", code: "dk" },
  { name: "Egypt", code: "eg" }, { name: "Finland", code: "fi" }, { name: "France", code: "fr" },
  { name: "Germany", code: "de" }, { name: "Greece", code: "gr" }, { name: "Iceland", code: "is" },
  { name: "India", code: "in" }, { name: "Indonesia", code: "id" }, { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" }, { name: "Italy", code: "it" }, { name: "Japan", code: "jp" },
  { name: "Malaysia", code: "my" }, { name: "Mexico", code: "mx" }, { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" }, { name: "Norway", code: "no" }, { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" }, { name: "Qatar", code: "qa" }, { name: "Russia", code: "ru" },
  { name: "Saudi Arabia", code: "sa" }, { name: "Singapore", code: "sg" }, { name: "South Africa", code: "za" },
  { name: "South Korea", code: "kr" }, { name: "Spain", code: "es" }, { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" }, { name: "Thailand", code: "th" }, { name: "Turkey", code: "tr" },
  { name: "Ukraine", code: "ua" }, { name: "United Arab Emirates", code: "ae" }, { name: "United Kingdom", code: "gb" },
  { name: "United States", code: "us" }, { name: "Vietnam", code: "vn" }
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
            <div className="relative">
              <select
                id="residence"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors appearance-none"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <span className={`fi fi-${countries.find(c => c.name === residence)?.code || 'ie'} mr-2`}></span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-400 mb-2">
              Nationality
            </label>
            <div className="relative">
              <select
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors appearance-none"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <span className={`fi fi-${countries.find(c => c.name === nationality)?.code || 'ie'} mr-2`}></span>
              </div>
            </div>
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