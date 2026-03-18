/*
  # Admin RLS policies for contact_messages

  Adds UPDATE and DELETE policies restricted to authenticated users (admin).
*/

-- Allow authenticated users to update message status
CREATE POLICY "authenticated can update contact_messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete messages
CREATE POLICY "authenticated can delete contact_messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);
