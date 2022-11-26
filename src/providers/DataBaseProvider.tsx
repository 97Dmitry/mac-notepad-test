import { DataBaseContext } from "context";
import {
  CreateNote,
  createNote,
  UpdateNoteById,
  updateNoteById,
  useGetAllNotes,
  useGetNoteById,
} from "db";
import { FC, PropsWithChildren, useState } from "react";

const DataBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const { notes } = useGetAllNotes();
  const { note, setCurrentNoteId } = useGetNoteById();
  const [isEditNote, setIsEditNote] = useState<boolean>(false);
  const addNote = (payload: CreateNote) => {
    createNote(payload);
  };

  const updateNote = (payload: UpdateNoteById) => {
    updateNoteById(payload);
  };

  const deleteNote = async (id: number) => {
    await deleteNote(id);
  };

  const selectNote = (id: number) => {
    if (id !== note?.id) setCurrentNoteId(id);
  };

  const changeEditStatus = () => {
    setIsEditNote(!isEditNote);
  };

  return (
    <DataBaseContext.Provider
      value={{
        note,
        isEditNote,
        changeEditStatus,
        notesList: notes,
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
