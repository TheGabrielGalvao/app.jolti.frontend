import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./core/context/GlobalContext";
import "./core/styles/global.css";
import { AppProvider } from "./core/context/RouteContext";
import { AuthProvider } from "./core/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <AppProvider />
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
