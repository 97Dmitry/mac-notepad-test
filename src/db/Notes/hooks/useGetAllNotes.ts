import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";

interface UseGetNoteByIdProps {
  searchValue: string;
}

const useGetNoteById = ({ searchValue }: UseGetNoteByIdProps) => {
  const notes = useLiveQuery(
    () =>
      db.notes
        .orderBy("created")
        .reverse()
        .filter((note) =>
          searchValue ? new RegExp(searchValue.toLowerCase()).test(note.title.toLowerCase()) : true,
        )
        .toArray(),
    [searchValue],
  );

  return { notes };
};

export default useGetNoteById;
