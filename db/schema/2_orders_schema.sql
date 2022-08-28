DROP TABLE IF EXISTS orders CASCADE;

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
