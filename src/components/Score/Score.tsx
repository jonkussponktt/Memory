import "./Score.css";

interface ScoreProps {
  player1Score: number;
  player2Score?: number;
}

export function Score({ player1Score, player2Score }: ScoreProps) {
  return (
    <div className="score-container">
      <span className="score-player">
        Gracz 1: <span className="score-value">{player1Score}</span>
      </span>
      <span className="score-player">
        Gracz 2: <span className="score-value">{player2Score}</span>
      </span>
    </div>
  );
}
