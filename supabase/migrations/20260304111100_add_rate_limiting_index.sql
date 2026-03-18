/*
  # Add rate limiting index on contact_messages

  Adds a composite index on (ip_address, created_at DESC) to optimise
  the rate-limiting query that counts recent submissions per IP address.
*/

CREATE INDEX IF NOT EXISTS contact_messages_ip_created_at_idx
  ON contact_messages(ip_address, created_at DESC);
