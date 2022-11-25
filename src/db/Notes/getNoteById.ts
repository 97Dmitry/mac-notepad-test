import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";

const getNoteById = (id: number) => {
  const note = useLiveQuery(() => db.notes.get(id));

  return note;
};

export default getNoteById;
