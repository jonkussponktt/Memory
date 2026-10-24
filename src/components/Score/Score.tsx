import "./Score.css";

interface ScoreProps {
  player1Score: number;
  player2Score?: number;
}

export function Score({ player1Score, player2Score }: ScoreProps) {
  return (
    <div className="score">
      <span>
        Gracz 1: <span className="score__value">{player1Score}</span>
      </span>
      <span>
        Gracz 2: <span className="score__value">{player2Score}</span>
      </span>
    </div>
  );
}
