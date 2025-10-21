CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  username VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    from_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    to_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (username)
VALUES ('Johnny B. Goode'), ('Clint Eastwood');

INSERT INTO messages (content, from_user_id, to_user_id)
VALUES 
  ('Hello World !', 1, 2),
  ('This is a second message.', 1, 2),
  ('What are you blabbering about ?', 2, 1),
  ('Lorem ipsum was initially extracted from Cicero''s original text, ''The Extremes of Good and Evil''. Interestingly, ''lorem'' is not an actual latin word but the ''dolorem'' word cut in half on original test print by Aldus Manutius during the 16th century.', 1, 2),
  ('I''m calling the police.', 2, 1);
