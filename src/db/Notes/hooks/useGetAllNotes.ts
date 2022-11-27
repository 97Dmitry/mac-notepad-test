import { db } from "db";
import { useLiveQuery } from "dexie-react-hooks";

const useGetNoteById = () => {
  // const notes = useLiveQuery(() => db.notes.toArray(), []);
  const notes = useLiveQuery(() => db.notes.orderBy("created").reverse().toArray(), []);

  // const notes = data?.sort((a, b) => {
  //   if (a.created > b.created) {
  //     return -1;
  //   } else if (a.created < b.created) {
  //     return 1;
  //   } else return 0;
  // });

  return { notes };
};

export default useGetNoteById;
