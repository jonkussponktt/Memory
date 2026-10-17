import "./Result.css";

function Result({ onClick, moves }) {
  return (
    <div className="result-overlay">
      <div className="result-modal">
        <h2>Wygrałeś!🎉</h2>
        <h3>Wykonałeś {moves} ruchów</h3>
        <button className="result-button" onClick={onClick}>
          Powrót do ekranu gry
        </button>
      </div>
    </div>
  );
}

export default Result;
