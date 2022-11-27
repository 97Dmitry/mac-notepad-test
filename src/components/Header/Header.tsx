import { DeleteOutlined, EditOutlined, EditTwoTone, FormOutlined } from "@ant-design/icons";
import { Input, notification, Space } from "antd";
import { Modal } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useDatabaseContext } from "hooks/useDataBaseContext";
import { ChangeEvent, useCallback, useState } from "react";
import debounce from "utils/debounce";

import styles from "./styles.module.css";

const Header = () => {
  const [api, contextHolder] = notification.useNotification();
  const [searchValue, setSearchValue] = useState<string>("");

  const {
    note,
    addNote,
    selectNote,
    isEditNote,
    changeEditStatus,
    deleteNote,
    searchNotesByTitle,
  } = useDatabaseContext();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const debounceSearch = debounce(searchNotesByTitle!, 1000);

  const openNotification = (placement: NotificationPlacement, message: string) => {
    api.info({
      message,
      placement,
    });
  };

  const showDeleteModal = () => {
    setIsModalDeleteOpen(true);
  };

  const handleDeleteOk = () => {
    setIsModalDeleteOpen(false);
    if (note?.id && deleteNote) {
      deleteNote!(note.id);
      openNotification("bottom", "Note was deleted");
    }
  };

  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const handleAddNote = async () => {
    addNote &&
      addNote({ title: "", text: "" }).then((data) => {
        selectNote && selectNote(data);
        changeEditStatus && changeEditStatus(true);
      });
  };

  const onChangeSearchValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debounceSearch!(event.target.value);
  }, []);

  return (
    <>
      {contextHolder}
      <div className={styles.header}>
        <Space size="large" align="center">
          <FormOutlined className={styles["header__icon"]} onClick={handleAddNote} />

          {note?.id && (
            <>
              {isEditNote ? (
                <EditTwoTone
                  className={styles["header__icon"]}
                  onClick={() => changeEditStatus!(!isEditNote)}
                />
              ) : (
                <EditOutlined
                  className={styles["header__icon"]}
                  onClick={() => changeEditStatus!(!isEditNote)}
                />
              )}
              <DeleteOutlined className={styles["header__icon"]} onClick={showDeleteModal} />
            </>
          )}
          <Input
            placeholder="Search by title"
            value={searchValue}
            onChange={onChangeSearchValue}
            allowClear
          />
        </Space>
      </div>
      <Modal
        title={`Aro you really want to delete note ${note?.title}`}
        open={isModalDeleteOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okType="danger"
        okText="Delete">
        <p>Cannot be canceled after</p>
      </Modal>
    </>
  );
};

export default Header;
