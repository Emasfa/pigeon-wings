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
    user_id INTEGER REFERENCES users(id)
);

INSERT INTO users (username)
VALUES ('Johnny B. Goode');

INSERT INTO messages (content, user_id)
VALUES 
  ('Hello World !', 1),
  ('This is a second message.', 1);
