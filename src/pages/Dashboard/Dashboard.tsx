import { Col, Row } from "antd";
import { Header, Sidebar, Workspace } from "components";
import { MainLayout } from "layouts";

import styles from "./styles.module.css";

const Dashboard = () => {
  return (
    <MainLayout>
      <Row>
        <Col className={`site-layout-background ${styles.header}`} span={24}>
          <Header />
        </Col>
      </Row>
      <Row className={styles["full-space-row"]}>
        <Col span={4} className={`site-layout-background ${styles.sidebar}`}>
          <Sidebar />
        </Col>
        <Col flex="1 0 auto" span={20} className="site-layout-background">
          <Workspace />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Dashboard;
