import { List, Space, Typography } from "antd";
import { format, isToday } from "date-fns";
import { useDatabaseContext } from "hooks/useDataBaseContext";

import styles from "./styles.module.css";

const ListItem = () => {
  const { notesList, note, selectNote, isEditNote, changeEditStatus } = useDatabaseContext();
  const handleSelectNote = (id: number) => {
    selectNote && selectNote(id);
    if (isEditNote && changeEditStatus) changeEditStatus(false);
  };

  return (
    <List
      dataSource={notesList}
      rowKey={(item) => item.id!}
      renderItem={(item) => (
        <List.Item
          onClick={() => handleSelectNote(item.id!)}
          className={`${styles.item} ${note?.id == item.id ? styles.selected : ""}`}>
          <div className={styles["item__text-wrapper"]}>
            <Typography.Text strong className={styles["item__title"]}>
              {item.title}
            </Typography.Text>
          </div>
          <Space>
            <div className={styles["item__text-wrapper"]}>
              <Typography.Text className={styles.item__date}>
                {isToday(item.created)
                  ? format(item.created, "H:mm")
                  : format(item.created, "dd.MM.yyyy")}
              </Typography.Text>
            </div>
            <div className={styles["item__text-wrapper"]}>
              <Typography.Text className={styles.item__text}>{item.text}</Typography.Text>
            </div>
          </Space>
        </List.Item>
      )}
    />
  );
};

export default ListItem;
