CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE posts(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    content VARCHAR(1000),
    fk_user INT REFERENCES users(id)
);

INSERT INTO users(username, password) VALUES('test', '1234qwer');