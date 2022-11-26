import { FC, PropsWithChildren } from "react";

import styles from "./styles.module.css";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default MainLayout;
