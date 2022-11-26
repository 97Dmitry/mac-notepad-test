import "easymde/dist/easymde.min.css";

import { notification, Typography } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { format } from "date-fns";
import { useDatabaseContext } from "hooks/useDataBaseContext";
import { marked } from "marked";
import { useCallback, useEffect, useState } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import debounce from "utils/debounce";

import styles from "./styled.module.css";

const Workspace = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: "Editor notification",
      description: "Note was saved",
      placement,
    });
  };

  const { note, updateNote, isEditNote } = useDatabaseContext();
  const [noteText, setNoteText] = useState<string>(note?.text || "");

  const debounceSaveText = debounce(updateNote!, 1000);
  const debounceNotification = debounce(openNotification, 1000);

  const html = marked.parse(noteText);

  useEffect(() => {
    setNoteText(note?.text || "");
  }, [note?.id]);

  const onChangeText = useCallback((value: string) => {
    console.log(value);
    setNoteText(value);
    debounceSaveText({ id: note?.id, text: value, created: new Date() });
    debounceNotification("bottom");
  }, []);

  if (!note) {
    return (
      <div className={styles["empty-workspace"]}>
        <Typography.Title>Select note</Typography.Title>
      </div>
    );
  }

  if (!isEditNote) {
    return (
      <>
        {contextHolder}
        <div className={styles["workspace"]}>
          <SimpleMdeReact value={noteText} onChange={onChangeText} />
        </div>
      </>
    );
  }

  return (
    <div className={styles["workspace"]}>
      <div className={styles["workspace__date"]}>
        <Typography.Title level={5}>{format(note.created, "dd MMMM yyyy, H:m")}</Typography.Title>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Workspace;
