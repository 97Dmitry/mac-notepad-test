import { CreateNote, Note, UpdateNoteById } from "db";
import { createContext } from "react";

interface IDefaultState {
  note: Note;
  noteList: Array<Note>;
  addNote: (payload: CreateNote) => void;

  selectNote: (id: number) => void;
  updateNote: (payload: UpdateNoteById) => Promise<number | undefined>;
  deleteNote: (id: number) => void;
}

const DataBaseContext = createContext<Partial<IDefaultState>>({});

export default DataBaseContext;
