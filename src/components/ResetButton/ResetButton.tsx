import { useState } from "react";
import "./ResetButton.css";

export default function ResetButton({ onClick, gameWon }) {
  return (
    <button className="reset-button" onClick={onClick}>
      {gameWon ? "Nowa gra" : "Zresetuj"}
    </button>
  );
}
