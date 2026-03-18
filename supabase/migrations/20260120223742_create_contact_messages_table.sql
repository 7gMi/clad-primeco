/*
  # Create Contact Messages Table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Sender's full name
      - `email` (text) - Sender's email address
      - `phone` (text) - Sender's phone number
      - `message` (text) - Message content
      - `created_at` (timestamp) - When the message was sent
      - `status` (text) - Message status (new, read, responded)
      - `ip_address` (text) - Sender's IP (for security)
      
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for anyone to insert messages
    - Add policy for authenticated users to read all messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  ip_address text
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow read access to authenticated users"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX contact_messages_created_at_idx ON contact_messages(created_at DESC);
CREATE INDEX contact_messages_email_idx ON contact_messages(email);
