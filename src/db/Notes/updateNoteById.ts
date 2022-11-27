import { db, Note } from "db";
import ErrorHandler from "utils/ErrorHandler";

export interface UpdateNoteById extends Partial<Note> {
  id?: number;
}

const updateNoteById = async (payload: UpdateNoteById) => {
  const { id, title, text, created } = payload;

  console.log(id);

  if (!id) return;

  const data = Object.assign(
    {},
    title === undefined ? null : { title },
    text === undefined ? null : { text },
    created === undefined ? null : { created },
  );

  try {
    const note = await db.notes.update(id, data);
    return note;
  } catch (error) {
    throw new ErrorHandler(error, "Update note error");
  }
};

export default updateNoteById;
