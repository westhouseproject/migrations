# Migrations

Create the database tables, make changes to their schemas, and have them versioned for easy fallback.

## Quick Start

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

## Creating new Migrations

This project use's @visionmedia's [node-migrate](https://github.com/visionmedia/node-migrate).

So to create a new migration you could run

```shell
$ ./node_migrate/migrate/bin/migrate create my-new-migrate
```

And a new file in the `migrations` folder will be created, with only two exports:

```javascript
exports.up = function(next){
  next();
};

exports.down = function(next){
  next();
};
```

You can read more about the `migrate` at the project's [README file](https://github.com/visionmedia/node-migrate/blob/master/Readme.md).

## Warning

**This project is not for versioning data.** It's only for **creating/updating schemas, and having them versioned for easy downgrades**.
