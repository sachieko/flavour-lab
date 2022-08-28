DROP TABLE IF EXISTS items CASCADE;

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
