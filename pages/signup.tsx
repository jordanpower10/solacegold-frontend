import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import { AnimatePresence } from 'framer-motion'
import EmailStep from '../components/signup/EmailStep'
import VerificationStep from '../components/signup/VerificationStep'
import PasswordStep from '../components/signup/PasswordStep'
import PersonalInfoStep from '../components/signup/PersonalInfoStep'
import AddressStep from '../components/signup/AddressStep'

type Step = 'email' | 'verify' | 'password' | 'personal' | 'address'

export default function Signup() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('email')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: null as Date | null,
    nationality: '',
    residence: '',
    address: '',
    city: '',
    postalCode: ''
  })

  const handleEmailSubmit = async (email: string) => {
    try {
      // Here you would typically send a verification email
      // For now, we'll just move to the next step
      setFormData(prev => ({ ...prev, email }))
      setCurrentStep('verify')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleVerificationSubmit = async (code: string) => {
    try {
      // Here you would verify the code
      // For now, we'll just move to the next step
      setCurrentStep('password')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handlePasswordSubmit = (password: string) => {
    setFormData(prev => ({ ...prev, password }))
    setCurrentStep('personal')
  }

  const handlePersonalInfoSubmit = (data: {
    firstName: string
    lastName: string
    dob: Date
    nationality: string
    residence: string
  }) => {
    setFormData(prev => ({ ...prev, ...data }))
    setCurrentStep('address')
  }

  const handleAddressSubmit = async (data: {
    address: string
    city: string
    postalCode: string
  }) => {
    try {
      const finalData = {
        ...formData,
        ...data
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: finalData.email,
        password: finalData.password,
        options: {
          data: {
            first_name: finalData.firstName,
            last_name: finalData.lastName,
            dob: finalData.dob ? finalData.dob.toISOString().split('T')[0] : '',
            nationality: finalData.nationality,
            residence: finalData.residence,
            address: finalData.address,
            city: finalData.city,
            postal_code: finalData.postalCode
          }
        }
      })

      if (signUpError) throw signUpError

      alert('✅ Account created! Please check your email.')
      router.push('/login')
    } catch (error: any) {
      console.error('Signup error:', error)
      alert(`❌ ${error.message || 'Error during signup process'}`)
    }
  }

  const handleResendCode = () => {
    // Implement resend verification code logic
    alert('Verification code resent!')
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
              <img src="https://i.postimg.cc/wBT6H1j9/Gold-solace-logo.png" alt="Solace Gold Logo" className="w-32 h-auto" />
            </a>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 'email' && (
              <EmailStep key="email" onNext={handleEmailSubmit} />
            )}
            {currentStep === 'verify' && (
              <VerificationStep
                key="verify"
                email={formData.email}
                onNext={handleVerificationSubmit}
                onResend={handleResendCode}
              />
            )}
            {currentStep === 'password' && (
              <PasswordStep key="password" onNext={handlePasswordSubmit} />
            )}
            {currentStep === 'personal' && (
              <PersonalInfoStep key="personal" onNext={handlePersonalInfoSubmit} />
            )}
            {currentStep === 'address' && (
              <AddressStep
                key="address"
                residence={formData.residence}
                onNext={handleAddressSubmit}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}