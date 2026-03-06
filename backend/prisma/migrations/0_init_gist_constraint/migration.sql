CREATE EXTENSION IF NOT EXISTS "btree_gist";

ALTER TABLE appointments
ADD COLUMN time_range tsrange 
GENERATED ALWAYS AS (tstzrange(start_at, end_at)) STORED;

ALTER TABLE appointments 
ADD CONSTRAINT no_overlap 
EXCLUDE USING GIST (
  business_id WITH =, 
  time_range WITH &&
) WHERE (status = 'CONFIRMED');