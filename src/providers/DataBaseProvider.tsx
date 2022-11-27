import { DataBaseContext } from "context";
import {
  CreateNote,
  createNote,
  deleteNoteById,
  UpdateNoteById,
  updateNoteById,
  useGetAllNotes,
  useGetNoteById,
} from "db";
import { FC, PropsWithChildren, useState } from "react";

const DataBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { notes } = useGetAllNotes({ searchValue });
  const { note, setCurrentNoteId } = useGetNoteById();
  const [isEditNote, setIsEditNote] = useState<boolean>(false);
  const addNote = (payload: CreateNote): Promise<number> => {
    return new Promise((resolve) => {
      createNote(payload).then((data) => resolve(data as number));
    });
  };

  const updateNote = (payload: UpdateNoteById) => {
    updateNoteById(payload);
  };

  const deleteNote = async (id: number) => {
    await deleteNoteById(id);
  };

  const selectNote = (id: number) => {
    if (id !== note?.id) setCurrentNoteId(id);
  };

  const changeEditStatus = (status: boolean) => {
    setIsEditNote(status);
  };

  const searchNotesByTitle = (value: string) => {
    setSearchValue(value);
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
        searchNotesByTitle,
      }}>
      {children}
    </DataBaseContext.Provider>
  );
};

export default DataBaseProvider;
