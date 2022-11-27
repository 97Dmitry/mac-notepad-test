import Dexie, { Table } from "dexie";

export interface Note {
  id?: number;
  title: string;
  text: string;
  created: Date;
}

export class MySubClassedDexie extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("notepad-db");
    this.version(1).stores({
      notes: "++id, title, text, created",
    });
  }
}

export const db = new MySubClassedDexie();
