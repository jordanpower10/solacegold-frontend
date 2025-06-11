-- Create the page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  view_count INTEGER DEFAULT 1,
  view_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add a unique constraint on path and date combination
ALTER TABLE page_views ADD CONSTRAINT unique_path_date UNIQUE (path, view_date);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(view_date);
CREATE INDEX IF NOT EXISTS idx_page_views_path_date ON page_views(path, view_date);

-- Function to update page views
CREATE OR REPLACE FUNCTION update_page_view(view_path TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO page_views (path, view_date)
  VALUES (view_path, CURRENT_DATE)
  ON CONFLICT (path, view_date) 
  DO UPDATE SET 
    view_count = page_views.view_count + 1,
    updated_at = TIMEZONE('utc', NOW());
END;
$$ LANGUAGE plpgsql;

-- Create a secure policy for the page_views table
CREATE POLICY "Enable read access for authenticated users" ON page_views
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable insert/update for service role only" ON page_views
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT SELECT ON page_views TO authenticated;
GRANT ALL ON page_views TO service_role;
GRANT EXECUTE ON FUNCTION update_page_view TO service_role;
GRANT EXECUTE ON FUNCTION update_page_view TO anon; 