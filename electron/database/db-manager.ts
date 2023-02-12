import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'main.db',
  },
  useNullAsDefault: true,
});

export const getDatabases = async () => {
  return new Promise((resolve, reject) => {
    db.select('name', 'path')
      .from('databases')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const addDatabase = async (name: string, path: string) => {
  return new Promise((resolve, reject) => {
    db('databases')
      .insert({ name, path })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
