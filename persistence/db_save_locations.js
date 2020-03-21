// import { SQLite } from "expo-sqlite";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("locations.db");

export const save_coordinates = (lat, lng, timestamp) => {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO coordinates (lat, lng, timestamp) VALUES (?, ?, ?);",
      [lat, lng, timestamp],
      (tx, res) => console.log(res),
      (_, err) => console.log(err) 
    );
  });
};

export const get_saved_coordinates = () => {
  const promise = new Promise((resolve, reject) => {
  console.log("get saved coordinates");
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM coordinates;",
          [],
          (_, result) => {
            // console.log(result);
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    })
  return promise;
};
