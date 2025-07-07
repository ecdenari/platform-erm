-- Enable necessary PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create tenants table if it doesn't exist
CREATE TABLE IF NOT EXISTS tenants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    plan VARCHAR(50) NOT NULL DEFAULT 'basic',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    primary_color VARCHAR(7) NOT NULL DEFAULT '#3b82f6'
);

-- Create initial tenant for development
INSERT INTO tenants (id, name, subdomain, api_key, plan, is_active, created_at, settings, primary_color)
VALUES 
  ('demo', 'Demo Company', 'demo', 'demo-api-key-12345', 'enterprise', true, CURRENT_TIMESTAMP, '{}'::jsonb, '#3b82f6'),
  ('test1', 'Test Landscape Co', 'testlandscape', 'test-api-key-67890', 'professional', true, CURRENT_TIMESTAMP, '{}'::jsonb, '#10b981')
ON CONFLICT (id) DO NOTHING;