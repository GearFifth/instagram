SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'instagram_database' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS instagram_database;



SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.usename = 'instagram_user' AND pid <> pg_backend_pid();

DROP USER IF EXISTS instagram_user;