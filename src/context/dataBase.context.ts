import { CreateNote, Note, UpdateNoteById } from "db";
import { createContext } from "react";

interface IDefaultState {
  note: Note;
  isEditNote: boolean;
  changeEditStatus: (status: boolean) => void;
  notesList: Array<Note>;
  addNote: (payload: CreateNote) => Promise<number>;

  selectNote: (id: number) => void;
  updateNote: (payload: UpdateNoteById) => void;
  deleteNote: (id: number) => void;
}

const DataBaseContext = createContext<Partial<IDefaultState>>({});

export default DataBaseContext;
