import { SQLite } from "expo-sqlite";
// import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("locations.db");

export const save_coordinates = (lat, lng, timestamp) => {
  const promise = new Promise(() => {
    (resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO (lat, lng, timestamp) VALUES (?, ?, ?)",
          [lat, lng, timestamp],
          () => { resolve(); },
          (_, error) = {
            reject(error);
          }
        );
      });
    }
  });
}