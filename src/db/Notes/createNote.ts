import { db } from "db";
import ErrorHandler from "utils/ErrorHandler";

export interface CreateNote {
  title: string;
  text: string;
}

const createNote = async (payload: CreateNote) => {
  const { title, text } = payload;

  try {
    const note = await db.notes.add({
      title,
      text,
      created: new Date(),
    });

    return note;
  } catch (error) {
    throw new ErrorHandler(error, "Add note error");
  }
};

export default createNote;
