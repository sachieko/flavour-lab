DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS discounts CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;
DROP TABLE IF EXISTS options CASCADE;
DROP TABLE IF EXISTS option_details CASCADE;

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
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  submit_time TIMESTAMP DEFAULT NOW(),
  started_time TIMESTAMP,
  estimated_time TIMESTAMP,
  completed_time TIMESTAMP,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  note TEXT,
  tax NUMERIC(5, 2),
  tip NUMERIC(5, 2),
  discount NUMERIC(5, 2)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  removed BOOLEAN DEFAULT FALSE
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,

  name VARCHAR(100) NOT NULL,
  price NUMERIC(5, 2) NOT NULL,
  description TEXT,
  picture_url VARCHAR(255) DEFAULT 'https://i.imgur.com/luWEgOJ.jpg',
  is_available BOOLEAN DEFAULT TRUE,
  removed BOOLEAN DEFAULT FALSE
);

CREATE TABLE discounts ( -- this table is only for stretch goals but comes before order details
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
  note TEXT,
  discount_id INTEGER REFERENCES discounts(id) ON DELETE CASCADE
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
