import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import AppLayout from '../components/AppLayout';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface SubscriptionPlanResponse {
  id: string;
  name: string;
  price: number;
  features: {
    features: string[];
  };
}

export default function Subscribe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const { data: planData, error } = await supabase
          .from('subscription_plans')
          .select('*')
          .single();

        if (error) throw error;
        
        // Type cast the plan data
        if (planData) {
          const typedPlanData = planData as SubscriptionPlanResponse;
          const typedPlan: SubscriptionPlan = {
            id: typedPlanData.id,
            name: typedPlanData.name,
            price: typedPlanData.price,
            features: typedPlanData.features.features || []
          };
          setPlan(typedPlan);
        }
      } catch (err) {
        console.error('Error fetching subscription plan:', err);
        setError('Failed to load subscription details');
      }
    };

    fetchPlan();
  }, []);

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan?.id,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      setError(err.message || 'Failed to process subscription');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <AppLayout>
      <Head>
        <title>Subscribe - Solace Gold</title>
        <meta name="description" content="Subscribe to SolaceGold's premium features" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] to-black text-white font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#e0b44a] mb-4">
              Premium Membership
            </h1>
            <p className="text-xl text-gray-300">
              Get access to exclusive features and investment insights
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-[#2a2a2a] p-8 mb-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">${plan?.price || '5.99'}/month</h2>
              <p className="text-gray-400">Cancel anytime</p>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold text-[#e0b44a] mb-4">
                Premium Features Include:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#e0b44a] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Fear & Greed Index Access
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#e0b44a] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Investment Recommendations
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#e0b44a] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  AI Investment Assistant
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#e0b44a] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time Market Insights
                </li>
              </ul>
            </div>

            {error && (
              <div className="text-red-500 text-center mb-6">
                {error}
              </div>
            )}

            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-[#e0b44a] text-black rounded-lg font-medium hover:bg-[#f0c45a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Subscribe Now'}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="text-center text-sm text-gray-400"
          >
            <p>By subscribing, you agree to our terms of service and privacy policy.</p>
            <p className="mt-2">Need help? Contact our support team.</p>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
} 