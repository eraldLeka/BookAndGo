CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE appointments ADD COLUMN time_range tstzrange GENERATED ALWAYS AS (tstzrange("startAt", "endAt")) STORED;
ALTER TABLE appointments ADD CONSTRAINT no_overlap EXCLUDE USING GIST ("businessId" WITH =, time_range WITH &&) WHERE (status = 'CONFIRMED');