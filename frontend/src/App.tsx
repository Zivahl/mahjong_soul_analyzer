import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { InitialSettingPage } from "./pages/InitialSettingPage/InitialSettingPage";
import { StartPage } from "./pages/StartPage/StartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate replace to="/start" />} />
          <Route path="/start" element={<StartPage />} />
          <Route
            path="/initial-setting"
            element={<InitialSettingPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
