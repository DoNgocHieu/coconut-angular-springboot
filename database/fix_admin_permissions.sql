-- Fix admin user permissions
-- Update existing admin user to have admin privileges
UPDATE users SET is_admin = true WHERE username = 'admin';

-- If admin user doesn't exist, create one
INSERT INTO users (username, email, password, is_verified, is_admin, created_at, updated_at)
SELECT 'admin', 'admin@coconutmusic.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

-- Show admin users
SELECT id, username, email, is_admin, is_verified FROM users WHERE is_admin = true;
