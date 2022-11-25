import { DataBaseContext } from "context";
import { getAllNotes, UpdateNoteById, updateNoteById } from "db";
import { FC, PropsWithChildren } from "react";

const DataBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const notes = getAllNotes();

  const updateNote = (payload: UpdateNoteById) => {
    return updateNoteById(payload);
  };

  return (
    <DataBaseContext.Provider value={{ noteList: notes, updateNote }}>
      {children}
    </DataBaseContext.Provider>
  );
};

export default DataBaseProvider;
