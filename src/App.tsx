import "antd/dist/reset.css";
import "assets/styles/core.css";

import { ConfigProvider } from "antd";
import { Dashboard } from "pages";
import { DataBaseProvider } from "providers";

const App = () => {
  return (
    <DataBaseProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f5f5f5",
          },
        }}>
        <Dashboard />
      </ConfigProvider>
    </DataBaseProvider>
  );
};

export default App;
