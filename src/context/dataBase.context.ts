import { Note, UpdateNoteById } from "db";
import { createContext } from "react";

interface IDefaultState {
  noteList: Array<Note>;
  updateNote: (payload: UpdateNoteById) => Promise<number | undefined>;
}

const DataBaseContext = createContext<Partial<IDefaultState>>({});

export default DataBaseContext;
