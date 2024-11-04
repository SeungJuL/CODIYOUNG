CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE posts(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    content VARCHAR(1000),
    timestamp BIGINT NOT NULL,
    fk_user INT REFERENCES users(id)
);
