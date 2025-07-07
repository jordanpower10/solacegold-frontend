-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired')),
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    stripe_subscription_id TEXT,
    stripe_customer_id TEXT
);

-- Add RLS policies
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read subscription plans
CREATE POLICY "Allow anyone to read subscription_plans"
    ON subscription_plans
    FOR SELECT
    USING (true);

-- Allow users to read their own subscriptions
CREATE POLICY "Allow users to read own subscriptions"
    ON subscriptions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Create function to check if a user has an active subscription
CREATE OR REPLACE FUNCTION is_subscribed(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM subscriptions
        WHERE user_id = user_uuid
        AND status = 'active'
        AND current_period_end > NOW()
    );
END;
$$;

-- Insert the initial subscription plan
INSERT INTO subscription_plans (name, price, features)
VALUES (
    'Premium',
    5.99,
    '{"features": ["Fear & Greed Index Access", "Investment Recommendations", "AI Investment Assistant"]}'
)
ON CONFLICT DO NOTHING; 