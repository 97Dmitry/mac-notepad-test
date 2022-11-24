import "antd/dist/reset.css";

import { DataBaseProvider } from "providers";

function App() {
  return (
    <DataBaseProvider>
      <main></main>
    </DataBaseProvider>
  );
}

export default App;
