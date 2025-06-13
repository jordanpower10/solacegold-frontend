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
  { name: "Andorra", code: "ad" }, { name: "Angola", code: "ao" }, { name: "Antigua and Barbuda", code: "ag" },
  { name: "Argentina", code: "ar" }, { name: "Armenia", code: "am" }, { name: "Australia", code: "au" },
  { name: "Austria", code: "at" }, { name: "Azerbaijan", code: "az" }, { name: "Bahamas", code: "bs" },
  { name: "Bahrain", code: "bh" }, { name: "Bangladesh", code: "bd" }, { name: "Barbados", code: "bb" },
  { name: "Belarus", code: "by" }, { name: "Belgium", code: "be" }, { name: "Belize", code: "bz" },
  { name: "Benin", code: "bj" }, { name: "Bhutan", code: "bt" }, { name: "Bolivia", code: "bo" },
  { name: "Bosnia and Herzegovina", code: "ba" }, { name: "Botswana", code: "bw" }, { name: "Brazil", code: "br" },
  { name: "Brunei", code: "bn" }, { name: "Bulgaria", code: "bg" }, { name: "Burkina Faso", code: "bf" },
  { name: "Burundi", code: "bi" }, { name: "Cambodia", code: "kh" }, { name: "Cameroon", code: "cm" },
  { name: "Canada", code: "ca" }, { name: "Cape Verde", code: "cv" }, { name: "Central African Republic", code: "cf" },
  { name: "Chad", code: "td" }, { name: "Chile", code: "cl" }, { name: "China", code: "cn" },
  { name: "Colombia", code: "co" }, { name: "Comoros", code: "km" }, { name: "Congo", code: "cg" },
  { name: "Costa Rica", code: "cr" }, { name: "Croatia", code: "hr" }, { name: "Cuba", code: "cu" },
  { name: "Cyprus", code: "cy" }, { name: "Czech Republic", code: "cz" }, { name: "Denmark", code: "dk" },
  { name: "Djibouti", code: "dj" }, { name: "Dominica", code: "dm" }, { name: "Dominican Republic", code: "do" },
  { name: "Ecuador", code: "ec" }, { name: "Egypt", code: "eg" }, { name: "El Salvador", code: "sv" },
  { name: "Equatorial Guinea", code: "gq" }, { name: "Eritrea", code: "er" }, { name: "Estonia", code: "ee" },
  { name: "Ethiopia", code: "et" }, { name: "Fiji", code: "fj" }, { name: "Finland", code: "fi" },
  { name: "France", code: "fr" }, { name: "Gabon", code: "ga" }, { name: "Gambia", code: "gm" },
  { name: "Georgia", code: "ge" }, { name: "Germany", code: "de" }, { name: "Ghana", code: "gh" },
  { name: "Greece", code: "gr" }, { name: "Grenada", code: "gd" }, { name: "Guatemala", code: "gt" },
  { name: "Guinea", code: "gn" }, { name: "Guinea-Bissau", code: "gw" }, { name: "Guyana", code: "gy" },
  { name: "Haiti", code: "ht" }, { name: "Honduras", code: "hn" }, { name: "Hungary", code: "hu" },
  { name: "Iceland", code: "is" }, { name: "India", code: "in" }, { name: "Indonesia", code: "id" },
  { name: "Iran", code: "ir" }, { name: "Iraq", code: "iq" }, { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" }, { name: "Italy", code: "it" }, { name: "Jamaica", code: "jm" },
  { name: "Japan", code: "jp" }, { name: "Jordan", code: "jo" }, { name: "Kazakhstan", code: "kz" },
  { name: "Kenya", code: "ke" }, { name: "Kiribati", code: "ki" }, { name: "Kuwait", code: "kw" },
  { name: "Kyrgyzstan", code: "kg" }, { name: "Laos", code: "la" }, { name: "Latvia", code: "lv" },
  { name: "Lebanon", code: "lb" }, { name: "Lesotho", code: "ls" }, { name: "Liberia", code: "lr" },
  { name: "Libya", code: "ly" }, { name: "Liechtenstein", code: "li" }, { name: "Lithuania", code: "lt" },
  { name: "Luxembourg", code: "lu" }, { name: "Madagascar", code: "mg" }, { name: "Malawi", code: "mw" },
  { name: "Malaysia", code: "my" }, { name: "Maldives", code: "mv" }, { name: "Mali", code: "ml" },
  { name: "Malta", code: "mt" }, { name: "Marshall Islands", code: "mh" }, { name: "Mauritania", code: "mr" },
  { name: "Mauritius", code: "mu" }, { name: "Mexico", code: "mx" }, { name: "Moldova", code: "md" },
  { name: "Monaco", code: "mc" }, { name: "Mongolia", code: "mn" }, { name: "Montenegro", code: "me" },
  { name: "Morocco", code: "ma" }, { name: "Mozambique", code: "mz" }, { name: "Myanmar", code: "mm" },
  { name: "Namibia", code: "na" }, { name: "Nauru", code: "nr" }, { name: "Nepal", code: "np" },
  { name: "Netherlands", code: "nl" }, { name: "New Zealand", code: "nz" }, { name: "Nicaragua", code: "ni" },
  { name: "Niger", code: "ne" }, { name: "Nigeria", code: "ng" }, { name: "North Korea", code: "kp" },
  { name: "Norway", code: "no" }, { name: "Oman", code: "om" }, { name: "Pakistan", code: "pk" },
  { name: "Palau", code: "pw" }, { name: "Panama", code: "pa" }, { name: "Papua New Guinea", code: "pg" },
  { name: "Paraguay", code: "py" }, { name: "Peru", code: "pe" }, { name: "Philippines", code: "ph" },
  { name: "Poland", code: "pl" }, { name: "Portugal", code: "pt" }, { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" }, { name: "Russia", code: "ru" }, { name: "Rwanda", code: "rw" },
  { name: "Saint Kitts and Nevis", code: "kn" }, { name: "Saint Lucia", code: "lc" }, { name: "Saint Vincent", code: "vc" },
  { name: "Samoa", code: "ws" }, { name: "San Marino", code: "sm" }, { name: "Saudi Arabia", code: "sa" },
  { name: "Senegal", code: "sn" }, { name: "Serbia", code: "rs" }, { name: "Seychelles", code: "sc" },
  { name: "Sierra Leone", code: "sl" }, { name: "Singapore", code: "sg" }, { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" }, { name: "Solomon Islands", code: "sb" }, { name: "Somalia", code: "so" },
  { name: "South Africa", code: "za" }, { name: "South Korea", code: "kr" }, { name: "South Sudan", code: "ss" },
  { name: "Spain", code: "es" }, { name: "Sri Lanka", code: "lk" }, { name: "Sudan", code: "sd" },
  { name: "Suriname", code: "sr" }, { name: "Sweden", code: "se" }, { name: "Switzerland", code: "ch" },
  { name: "Syria", code: "sy" }, { name: "Taiwan", code: "tw" }, { name: "Tajikistan", code: "tj" },
  { name: "Tanzania", code: "tz" }, { name: "Thailand", code: "th" }, { name: "Togo", code: "tg" },
  { name: "Tonga", code: "to" }, { name: "Trinidad and Tobago", code: "tt" }, { name: "Tunisia", code: "tn" },
  { name: "Turkey", code: "tr" }, { name: "Turkmenistan", code: "tm" }, { name: "Tuvalu", code: "tv" },
  { name: "Uganda", code: "ug" }, { name: "Ukraine", code: "ua" }, { name: "United Arab Emirates", code: "ae" },
  { name: "United Kingdom", code: "gb" }, { name: "United States", code: "us" }, { name: "Uruguay", code: "uy" },
  { name: "Uzbekistan", code: "uz" }, { name: "Vanuatu", code: "vu" }, { name: "Vatican City", code: "va" },
  { name: "Venezuela", code: "ve" }, { name: "Vietnam", code: "vn" }, { name: "Yemen", code: "ye" },
  { name: "Zambia", code: "zm" }, { name: "Zimbabwe", code: "zw" }
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

  const CountryOption = ({ country }: { country: { name: string; code: string } }) => (
    <div className="flex items-center gap-2 px-2 py-1">
      <span className={`fi fi-${country.code}`} style={{ width: '1.5em', height: '1em' }} />
      <span>{country.name}</span>
    </div>
  );

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
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors appearance-none"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name} className="flex items-center gap-2 py-2">
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <span 
                  className={`fi fi-${countries.find(c => c.name === residence)?.code || 'ie'}`}
                  style={{ width: '1.5em', height: '1em' }}
                />
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors appearance-none"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name} className="flex items-center gap-2 py-2">
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <span 
                  className={`fi fi-${countries.find(c => c.name === nationality)?.code || 'ie'}`}
                  style={{ width: '1.5em', height: '1em' }}
                />
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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