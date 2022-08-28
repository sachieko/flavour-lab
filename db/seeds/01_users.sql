-- Users table seeds
INSERT INTO users (name, phone, email, password, is_admin)
VALUES ('Guy Fieri', '1234567890', 'flavortown@gmail.com', 'potato', TRUE); -- This will later be the root user the restaurant uses
INSERT INTO users (name, phone, email, password)
VALUES
('Anthony', '1234567890', 'flavourtown@gmail.com', 'potato'),
('Sylvie', '1234567890', 'email1@gmail.com', 'potato'),
('Chelsea', '1234567890', 'email2@gmail.com', 'potato'),
('Andy', '1234567890', 'email3@gmail.com', 'potato'),
('Gary', '1234567890', 'email4@gmail.com', 'potato'),
('David', '1234567890', 'email5@gmail.com', 'potato'),
('Nally', '1234567890', 'email6@gmail.com', 'potato'),
('Cat', '1234567890', 'email7@gmail.com', 'potato'),
('Dominic', '1234567890', 'email8@hotmail.com', 'potato');
