import type { ReactNode } from "react";
import "./Result.css";

interface ResultProps {
  onClick: () => void;
  children: ReactNode;
}

function Result({ onClick, children }: ResultProps) {
  return (
    <div className="result-overlay">
      <div className="result-modal">
        <h2>{children}🎉</h2>
        <button className="result-button" onClick={onClick}>
          Powrót do ekranu gry
        </button>
      </div>
    </div>
  );
}

export default Result;
