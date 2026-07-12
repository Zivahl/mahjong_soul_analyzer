import { useAppStore } from "@/store/appStore";
import "./StartPage.css";

export const StartPage = () => {

  const setCurrentPage = useAppStore(
      (state) => state.setCurrentPage,
  );

  return (
    <div className="start-page">
        <button
            className="start-button"
            onClick={() =>
                setCurrentPage(
                    "initialSetting",
                )
            }
        >
            開始
        </button>
    </div>
  );
};
