-- Create user_sessions table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  session_token TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on session_token for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);

-- Create index on expires_at for cleanup operations
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);
