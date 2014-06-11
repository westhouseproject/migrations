# Migrations for West House Project

This uses [Flyway](http://flywaydb.org/).

**Important**: to create a new migration, be sure that you run:

```shell
node new.js $MIGRATION_NAME
```

Or, at least, the migration name should be prefixed by a timestamp. It should be in the form:

```
<YYYY><MM><DD><HH><MM><SS><mmm>__<migration name>.sql
```

e.g. `20140611225803774__add_tables.sql`.

The above date must be in UTC.

## Usage

To migrate, run:

```shell
./flyway -driver=com.mysql.jdbc.Driver -user=$USER -password=$PASSWORD -url=jdbc:mysql://$HOSTNAME/$DATABASE migrate
```