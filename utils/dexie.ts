import type { IHistory } from "~/types";
import Dexie from "dexie";

class HistoryDB extends Dexie {
  history!: Dexie.Table<IHistory, string>;
  trash!: Dexie.Table<IHistory, string>;

  constructor() {
    super("mockTail");

    this.version(1).stores({
      history: "id, title, timestamp, starred",
      trash: "id, title, timestamp, starred",
    });
    this.history = this.table("history");
    this.trash = this.table("trash");
  }
}

const db = new HistoryDB();
export default db;
