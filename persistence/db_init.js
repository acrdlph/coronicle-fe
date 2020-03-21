import { SQLite } from 'expo-sqlite';
// import * as SQLite  from 'expo-sqlite';

const locationsDb = SQLite.openDatabase('locations.db')

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    locationsDb.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS coordinates (id INTEGER PRIMARY KEY NOT NULL, lat REAL NULL, lng REAL NULL, timestamp INTEGER NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
