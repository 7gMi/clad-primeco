-- Fix: phone field is optional on the contact form but was NOT NULL
ALTER TABLE contact_messages ALTER COLUMN phone DROP NOT NULL;
