import { db } from "db";
import ErrorHandler from "utils/ErrorHandler";

interface AddNoteProps {
  title: string;
  text: string;
}

const addNote = async (payload: AddNoteProps) => {
  const { title, text } = payload;

  try {
    const note = await db.notes.add({
      title,
      text,
    });

    return note;
  } catch (error) {
    throw new ErrorHandler(error, "Add note error");
  }
};

export default addNote;
