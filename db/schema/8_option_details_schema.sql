DROP TABLE IF EXISTS option_details CASCADE;
-- Stretch goal
CREATE TABLE option_details (
  id SERIAL PRIMARY KEY,
  order_details_id INTEGER REFERENCES order_details(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  description TEXT,
  choice VARCHAR(255),
  quantity SMALLINT
);
