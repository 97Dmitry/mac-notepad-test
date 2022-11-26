import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";

const useGetNoteById = () => {
  const notes = useLiveQuery(() => db.notes.toArray(), []);

  return { notes };
};

export default useGetNoteById;
