CREATE DATABASE instagram_database;

\c instagram_database;

CREATE USER instagram_user WITH PASSWORD 'inst4gr4m';

GRANT ALL PRIVILEGES ON DATABASE instagram_database TO instagram_user;

ALTER DATABASE instagram_database OWNER TO instagram_user;