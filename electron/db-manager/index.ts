import knex from 'knex';
import { existsSync } from 'fs';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'database/main.db',
  },
  useNullAsDefault: true,
});

export const getDatabases = async () => {
  return new Promise((resolve, reject) => {
    db.select()
      .from('databases')
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const addDatabase = async (name: string, path: string) => {
  return new Promise((resolve, reject) => {
    // Check if name and path are provided
    if (!name || !path) {
      reject(new Error('Name and path are required'));
      return;
    }
    // Check if path exist on the system
    if (!existsSync(path)) {
      reject(new Error('Path does not exist'));
      return;
    }
    db('databases')
      .insert({ name, path })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

export const deleteDatabase = async (id: number) => {
  return new Promise((resolve, reject) => {
    db('databases')
      .where({ id })
      .del()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
