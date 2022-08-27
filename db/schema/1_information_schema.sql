CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,

  is_admin BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE -- if a user deactivates set TRUE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),

  submit_time TIMESTAMP DEFAULT NOW(),
  started_time TIMESTAMP,
  estimated_time TIMESTAMP,
  completed_time TIMESTAMP,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR NOT NULL,
  note TEXT,
  tax NUMERIC(5, 2),
  tip NUMERIC(5, 2),

  discount_id INTEGER REFERENCES discounts(id)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(5, 2) NOT NULL,
  description TEXT,
  picture_url VARCHAR(255),
  is_available BOOLEAN DEFAULT TRUE,
  removed BOOLEAN DEFAULT FALSE
);

CREATE TABLE discounts ( -- this table is only for stretch goals
  id SERIAL PRIMARY KEY,
  code VARCHAR(6) UNIQUE NOT NULL,
  percentage NUMERIC(3, 2),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  quantity SMALLINT NOT NULL DEFAULT 1,
  price NUMERIC(5, 2) NOT NULL,
  note TEXT
);
-- The following tables are stretch goals and may not be used in the current implementation.
CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  removed BOOLEAN DEFAULT FALSE
);

CREATE TABLE option_details (
  id SERIAL PRIMARY KEY,
  order_details_id INTEGER REFERENCES order_details(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  description TEXT,
  choice VARCHAR(255),
  quantity SMALLINT
);
