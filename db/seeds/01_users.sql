-- Users table seeds
INSERT INTO users (name, phone, email, password, is_admin)
VALUES ('Guy Fieri', '1234567890', 'flavortown@gmail.com', 'nachos', TRUE); -- This will later be the root user the restaurant uses
INSERT INTO users (name, phone, email, password)
VALUES
('Anthony', '1234567890', 'flavourtown@gmail.com', 'nachos'),
('Sylvie', '1234567890', 'email1@gmail.com', 'nachos'),
('Chelsea', '1234567890', 'email2@gmail.com', 'nachos'),
('Andy', '1234567890', 'email3@gmail.com', 'nachos'),
('Gary', '1234567890', 'email4@gmail.com', 'nachos'),
('David', '1234567890', 'email5@gmail.com', 'nachos'),
('Nally', '1234567890', 'email6@gmail.com', 'nachos'),
('Cat', '1234567890', 'email7@gmail.com', 'nachos'),
('Dominic', '1234567890', 'email8@hotmail.com', 'nachos');
