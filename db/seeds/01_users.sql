-- Users table seeds
INSERT INTO users (name, phone, email, password, is_admin)
VALUES ('Guy Fieri', '1234567890', 'flavortown@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO', TRUE); -- This will later be the root user the restaurant uses
INSERT INTO users (name, phone, email, password)
VALUES
('Anthony', '1234567890', 'flavourtown@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('Sylvie', '1234567890', 'email1@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('Chelsea', '1234567890', 'email2@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('Andy', '1234567890', 'email3@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('Gary', '1234567890', 'email4@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('David', '1234567890', 'email5@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('Nally', '1234567890', 'email6@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('Cat', '1234567890', 'email7@gmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO'),
('Dominic', '1234567890', 'email8@hotmail.com', '$2a$10$Pub6BSEb9DKvmlrF0d5nMeNJ7VfA5UYS5CthOLi.WVcIJ6ntORHfO');
