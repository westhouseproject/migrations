# Migrations

Create the database tables, make changes to their schemas, and have them versioned for easy fallback.

## Description

On the surface, the code herein is nothing secial. **It just creates the necessary tables onto the database**. It's perfect if you are running the West House Project on your machine for the first time.

But, lurk deeper, and you will realize that this does more than just create database tables. Take a look at the `migrations` folder, and you'll see a bunch of `.js` files. And if you've written code long enough, you'll notice that the gibberish prepending each `.js` files actually represent something significant: revisions.

Yes, you can version the changes to your database.

The `users` table needs a `gender` column? Create a new migration using `db-migrate create users` and specify it in the generated `.js` file.

You find the `first_name` and `last_name` columns redundant, and you would like to merge them into a `full_name` column? Same deal; `db-migrate create users` and you get yourself a new migration file.

