import { Note } from "db";
import { createContext } from "react";

interface IDefaultState {
  noteList: Note;
}

const DataBaseContext = createContext<Partial<IDefaultState>>({});

export default DataBaseContext;
