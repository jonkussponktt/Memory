import Board from "./components/Board/Board";
import { MovesNumber } from "./components/MovesNumber/MovesNumber";
import "./App.css";
import ResetButton from "./components/ResetButton/ResetButton";
import Result from "./components/Result/Result";
import { useState, useRef, useEffect, useCallback } from "react";

function App() {
  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [movesNumber, setMovesNumber] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const resetCb = useCallback((cb) => {
    console.log("RESET, timeout =", timeoutRef.current);

    if (timeoutRef.current) {
      console.log("CLEAR TIMEOUT");
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    cb();
    setShouldReset(false);
    setMovesNumber(0);
    setGameWon(false);
  }, []);

  return (
    <>
      <div className="game-container">
        <MovesNumber moves={movesNumber} />
        <Board
          shouldReset={shouldReset}
          onReset={resetCb}
          onMovesNumberChanged={() =>
            setMovesNumber((prevMovesNumber) => prevMovesNumber + 1)
          }
          onShowResult={() => setResultVisible(true)}
          onGameWon={() => setGameWon(true)}
          onMismatch={(onMismatchCb) => {
            console.log("CREATE TIMEOUT");

            timeoutRef.current = setTimeout(() => {
              console.log("TIMEOUT FIRED");
              onMismatchCb();
            }, 2000);
          }}
        />
        <ResetButton onClick={() => setShouldReset(true)} gameWon={gameWon} />
        {resultVisible && (
          <Result onClick={() => setResultVisible(false)} moves={movesNumber} />
        )}
      </div>
    </>
  );
}

export default App;
