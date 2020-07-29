CREATE DATABASE authtodo;
--\c into authtodo
--add extension if not exists "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
        user_id UUID DEFAULT uuid_generate_v4(),
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        PRIMARY KEY(user_id)
);
CREATE TABLE todo(
        todo_id SERIAL,
        user_id UUID,
        description VARCHAR(255) NOT NULL,
        PRIMARY KEY(todo_id),
        FOREIGN KEY(user_id) REFERENCES users(user_id)
);
--insert fake users
INSERT INTO users(user_name, user_email, user_password)
VALUES (
                'world',
                'world@gmail.com',
                'world'
        );
--insert fake todo
INSERT INTO todo(user_id, description)
VALUES (
                'bb4ac70c-0b3b-43f8-b773-2812c9e2335a',
                'fullstack react project '
        );