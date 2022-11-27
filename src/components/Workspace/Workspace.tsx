import "easymde/dist/easymde.min.css";

import { Input, notification, Typography } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { format } from "date-fns";
import { useDatabaseContext } from "hooks/useDataBaseContext";
import { marked } from "marked";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import debounce from "utils/debounce";

import styles from "./styled.module.css";

const Workspace = () => {
  const [api, contextHolder] = notification.useNotification();
  const { note, updateNote, isEditNote } = useDatabaseContext();
  const [noteTitle, setNoteTitle] = useState<string>(note?.title || "");
  const [noteText, setNoteText] = useState<string>(note?.text || "");
  const noteId = note?.id;

  const html = marked.parse(noteText);

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: "Editor notification",
      description: "Note was saved",
      placement,
    });
  };

  const debounceSaveNote = debounce(updateNote!, 1000);
  const debounceNotification = debounce(openNotification, 1000);

  useEffect(() => {
    setNoteTitle(note?.title || "");
    setNoteText(note?.text || "");
  }, [noteId]);

  const onChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNoteTitle(event.target.value);
      debounceSaveNote({ id: noteId, title: event.target.value, created: new Date() });
      debounceNotification("bottom");
    },
    [noteId],
  );

  const onChangeText = useCallback(
    (value: string) => {
      setNoteText(value);
      debounceSaveNote({ id: noteId, text: value, created: new Date() });
      debounceNotification("bottom");
    },
    [noteId],
  );

  if (!note) {
    return (
      <div className={styles["empty-workspace"]}>
        <Typography.Title>Select note</Typography.Title>
      </div>
    );
  }

  if (isEditNote) {
    return (
      <>
        {contextHolder}
        <div className={styles["workspace"]}>
          <div className={styles["workspace__content"]}>
            <Input
              placeholder="Title"
              className={styles["workspace__title-input"]}
              value={noteTitle}
              onChange={onChangeTitle}
            />
            <SimpleMdeReact value={noteText} onChange={onChangeText} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles["workspace"]}>
      <div className={styles["workspace__content"]}>
        <div className={styles["workspace__date"]}>
          <Typography.Title level={5}>{format(note.created, "dd MMMM yyyy, H:m")}</Typography.Title>
        </div>
        <Typography.Title level={3}>{note.title}</Typography.Title>
        <div className={styles["markdown-html"]} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export default Workspace;
