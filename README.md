# Migrations

Create the database tables, make changes to their schemas, and have them versioned for easy fallback.

## Just Got Started

Be sure to have Node.js.

```shell
$ git clone https://github.com/westhouseproject/migrations
$ cd migrations
$ npm install

Below, we are downloading a sample JSON settings file. Update it to your
personal needs.
$ curl https://gist.github.com/shovon/6d8ee063b765c6f007c7/raw/69a3d1603b1d51695631022d0e04e6baf4c30115/gistfile1.json > database.json
$ ./node_modules/migrate/bin/migrate
```

After running the above set of commands, you should see a new set tables created in the datababse.

## Description

On the surface, the code herein is nothing secial. **It just creates the necessary tables onto the database**. It's perfect if you are running the West House Project on your machine for the first time.

But, lurk deeper, and you will realize that this does more than just create database tables. Take a look at the `migrations` folder, and you'll see a bunch of `.js` files. And if you've written code long enough, you'll notice that the gibberish prepending each `.js` files actually represent something significant: revisions.

Yes, you can version the changes to your database.

The `users` table needs a `gender` column? Create a new migration using `migrate create users` and specify it in the generated `.js` file.

You find the `first_name` and `last_name` columns redundant, and you would like to merge them into a `full_name` column? Same deal; `migrate create users` and you get yourself a new migration file.

## When to Create new Migrations?

Whenever there are changes to the schema. So, for instance, you have a first name and a list name field in a `persons` database table. However, you find those fields redundant, and want to merge them.

To satisfy your need of having only one field per user's name, you can write a migration to easily delete the two other columns, and create a new one.

your migration code would then look like:

```javascript
// This demonstrates the user of migrations to easily update databases.
module.exports.up = function (next) {
  // We want to ensure that we don't loose either of the fist name or the last
  // name. In this case, we go through each record, update their names, so that
  // the first name field has both the first name and last name.
  var users = db.select('first_name, last_name').from('users')
  // Note: the above db object is just for the sake of demonstration.

  users.forEach(function (user) {
    user.first_name += ' ' + user.last_name;
  });

  users.save();

  // So each user's first_name has both the first and last name.
  //
  // Now, time to delete the column, and add a new one.
  db.from('users').deleteColumn('last_name');
  db.from('users').editColumn('first_name').to('full_name');
  
  next();
};
```

## Creating your first migration

```shell
$ ./node_modules/migrate/bin/migrate create change-name-field
```

You should then see a `001-change-name-field.js`. And from there, you should be able to write your own migrations. If you're stuck, read the sample code above.

## Warning

**This project is not for versioning data.** It's only for **creating/updating schemas, and having them versioned for easy downgrades**.
