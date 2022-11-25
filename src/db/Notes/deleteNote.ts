import { db } from "db";
import ErrorHandler from "utils/ErrorHandler";

const deleteNote = async (id: number) => {
  try {
    await db.notes.delete(id);
  } catch (error) {
    throw new ErrorHandler(error, "Add note error");
  }
};

export default deleteNote;
