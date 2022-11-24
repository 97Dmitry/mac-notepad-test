import { DataBaseContext } from "context";
import { FC, PropsWithChildren } from "react";

const DataBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  return <DataBaseContext.Provider value={{}}>{children}</DataBaseContext.Provider>;
};

export default DataBaseProvider;
