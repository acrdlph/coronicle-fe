import { SQLite } from "expo-sqlite";
// import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("locations.db");

export const save_coordinates = (lat, lng, timestamp) => {
  const promise = new Promise(() => {
    (resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO coordinates (lat, lng) VALUES (?, ?);",
          [lat, lng],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    }
  });
  return promise;
};

export const get_saved_coordinates = () => {
  console.log("get saved coordinates");
  const promise = new Promise(() => {
    (resolve, reject) => {
      console.log("executing select");
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM coordinates;",
          [lat, lng],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    }
  });
  return promise;
};
