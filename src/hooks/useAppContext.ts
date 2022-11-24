import { DataBaseContext } from "context";
import { useContext } from "react";

export const useAppContext = () => useContext(DataBaseContext);
