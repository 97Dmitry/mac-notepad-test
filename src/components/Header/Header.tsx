import { DeleteOutlined, EditOutlined, EditTwoTone, FormOutlined } from "@ant-design/icons";
import { notification, Space, Typography } from "antd";
import { Modal } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useState } from "react";

import { useDatabaseContext } from "../../hooks/useDataBaseContext";
import styles from "./styles.module.css";

const Header = () => {
  const [api, contextHolder] = notification.useNotification();

  const { note, addNote, selectNote, isEditNote, changeEditStatus, deleteNote } =
    useDatabaseContext();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

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

  return (
    <>
      {contextHolder}
      <div className={styles.header}>
        <Space size="large" align="center">
          <Typography.Title level={3}>
            <FormOutlined onClick={handleAddNote} />
          </Typography.Title>

          {note?.id && (
            <>
              <Typography.Title level={3}>
                {isEditNote ? (
                  <EditTwoTone onClick={() => changeEditStatus!(!isEditNote)} />
                ) : (
                  <EditOutlined onClick={() => changeEditStatus!(!isEditNote)} />
                )}
              </Typography.Title>

              <Typography.Title level={3}>
                <DeleteOutlined onClick={showDeleteModal} />
              </Typography.Title>
            </>
          )}
        </Space>
      </div>
      <Modal
        title={`Aro you really want to delete note ${note?.title}`}
        open={isModalDeleteOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okType="danger"
        okText="Delete">
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Header;
