import { useState } from 'react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
  "Ireland",
  "United Kingdom",
  "France",
  "Germany",
  "Spain",
  "Italy",
  // Add more countries as needed
]

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

  // Helper functions for DOB min/max
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
      <h2 className="text-2xl font-bold mb-6">Let's Get You Verified</h2>
      
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
                <option key={country} value={country}>{country}</option>
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
                <option key={country} value={country}>{country}</option>
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