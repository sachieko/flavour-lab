DROP TABLE IF EXISTS discounts CASCADE;
-- this table is only for stretch goals but comes before order details
CREATE TABLE discounts (
  id SERIAL PRIMARY KEY,
  code VARCHAR(6) UNIQUE NOT NULL,
  percentage NUMERIC(3, 2),
  is_active BOOLEAN DEFAULT TRUE
);
