import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'main.db',
  },
});

db.select('*')
  .from('users')
  .then((users) => console.log(users));
