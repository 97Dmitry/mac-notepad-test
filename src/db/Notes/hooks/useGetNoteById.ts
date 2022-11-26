import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

const useGetNoteById = () => {
  const [currentNoteId, setCurrentNoteId] = useState<number>(0);

  const note = useLiveQuery(() => db.notes.get(currentNoteId), [currentNoteId]);

  return { note, setCurrentNoteId };
};

export default useGetNoteById;
