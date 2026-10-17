import "./MovesNumber.css";

export function MovesNumber({ moves }) {
  return (
    <div className="moves-number">
      Ruchy:
      <span className="moves-number__value">{moves}</span>
    </div>
  );
}
