-- Add KYC status and update timestamp to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT NULL CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
ADD COLUMN IF NOT EXISTS kyc_updated_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster KYC status lookups
CREATE INDEX IF NOT EXISTS idx_profiles_kyc_status ON profiles(kyc_status);

-- Update RLS policies to allow service role to update KYC status
CREATE POLICY "Service role can update KYC status"
ON profiles
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Grant necessary permissions
GRANT UPDATE(kyc_status, kyc_updated_at) ON profiles TO service_role; 