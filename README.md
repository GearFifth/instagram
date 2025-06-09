# instagram
A social media application inspired by Instagram



### Database Setup

This project uses PostgreSQL as its database. You can handle the database setup with the following commands:

- **Create the database**:
    ```bash
    psql -U postgres -d postgres -a -f init_database.sql
    ```
- **Delete the database**:
    ```bash
    psql -U postgres -d postgres -a -f delete_database.sql
    ```
