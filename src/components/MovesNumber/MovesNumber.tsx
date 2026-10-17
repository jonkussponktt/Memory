import "./MovesNumber.css";

interface MovesNumberProps {
  moves: number;
}

export function MovesNumber({ moves }: MovesNumberProps) {
  return (
    <div className="moves-number">
      Ruchy:
      <span className="moves-number__value">{moves}</span>
    </div>
  );
}
