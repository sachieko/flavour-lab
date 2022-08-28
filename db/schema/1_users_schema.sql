DROP TABLE IF EXISTS users CASCADE;
-- Stretch goal (but high priority)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,

  is_admin BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE -- if a user deactivates set TRUE
);


