import "./ResetButton.css";

interface ResetButtonProps {
  onClick: () => void;
  gameWon: boolean;
}

export default function ResetButton({ onClick, gameWon }: ResetButtonProps) {
  return (
    <button className="reset-button" onClick={onClick}>
      {gameWon ? "Nowa gra" : "Zresetuj"}
    </button>
  );
}
