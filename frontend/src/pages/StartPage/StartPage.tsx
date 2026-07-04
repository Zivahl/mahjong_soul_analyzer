import { useNavigate } from "react-router-dom";
import "./StartPage.css";

export const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <button
        onClick={() => navigate("/initial-setting")}
      >
        開始
      </button>
    </div>
  );
};
