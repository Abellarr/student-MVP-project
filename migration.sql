DROP TABLE IF EXISTS character;

CREATE TABLE  character (
    id SERIAL PRIMARY KEY,
    name TEXT,
    race VARCHAR(30),
    job VARCHAR(50),
    hp INTEGER,
    background TEXT,
    npc_type VARCHAR(25)
);