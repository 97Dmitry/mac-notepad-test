import { DataBaseContext } from "context";
import {
  CreateNote,
  createNote,
  UpdateNoteById,
  updateNoteById,
  useGetAllNotes,
  useGetNoteById,
} from "db";
import { FC, PropsWithChildren } from "react";

const DataBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const { notes } = useGetAllNotes();
  const { note, setCurrentNoteId } = useGetNoteById();
  const addNote = (payload: CreateNote) => {
    createNote(payload);
  };

  const updateNote = async (payload: UpdateNoteById) => {
    return await updateNoteById(payload);
  };

  const deleteNote = async (id: number) => {
    await deleteNote(id);
  };

  const selectNote = (id: number) => {
    if (id !== note?.id) setCurrentNoteId(id);
  };

  return (
    <DataBaseContext.Provider
      value={{
        note,
        noteList: notes,
        addNote,
        selectNote,
        updateNote,
        deleteNote,
      }}>
      {children}
    </DataBaseContext.Provider>
  );
};

export default DataBaseProvider;
