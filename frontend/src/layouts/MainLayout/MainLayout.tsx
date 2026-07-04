import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header/Header";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <div className="layout">
      <Header />

      <main className="layout-main">
        <section className="viewer-area">
          T.B.D.
        </section>

        <section className="app-area">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
