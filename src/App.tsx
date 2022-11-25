import "antd/dist/reset.css";

import { useDatabaseContext } from "hooks/useDataBaseContext";

const App = () => {
  const { noteList, updateNote } = useDatabaseContext();

  return (
    <main>
      {noteList?.map((note) => {
        return (
          <div
            key={note.id}
            onClick={() => {
              updateNote && updateNote({ id: note.id!, title: "Updated" });
            }}>
            {note.id} {note.title} {note.text}
          </div>
        );
      })}
    </main>
  );
};

export default App;
