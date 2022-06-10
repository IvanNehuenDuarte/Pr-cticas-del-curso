const knex = require('knex')({
    client: "sqlite3",
    connection: { filename: "./sqlite3_database/messages.db" },
    useNullAsDefault: true
});

module.exports = knex;