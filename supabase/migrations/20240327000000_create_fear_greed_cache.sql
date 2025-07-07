-- Create fear_greed_cache table
CREATE TABLE IF NOT EXISTS fear_greed_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    value INTEGER NOT NULL,
    classification TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE fear_greed_cache ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the cache
CREATE POLICY "Allow anyone to read fear_greed_cache"
    ON fear_greed_cache
    FOR SELECT
    TO authenticated
    USING (true);

-- Only allow the service role to insert/update
CREATE POLICY "Only service role can insert fear_greed_cache"
    ON fear_greed_cache
    FOR INSERT
    TO authenticated
    USING (auth.uid() IN (SELECT id FROM auth.users WHERE is_service_role = true));

-- Create index on created_at for efficient queries
CREATE INDEX IF NOT EXISTS fear_greed_cache_created_at_idx ON fear_greed_cache(created_at DESC);

-- Add function to clean old cache entries (keep last 24 hours)
CREATE OR REPLACE FUNCTION clean_fear_greed_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    DELETE FROM fear_greed_cache
    WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$; 