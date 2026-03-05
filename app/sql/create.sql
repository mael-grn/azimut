create table users(
                      id serial primary key,
                      email varchar unique not null,
                      first_name varchar not null,
                      last_name varchar not null,
                      password varchar not null
);