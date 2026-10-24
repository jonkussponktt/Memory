import { useState, useRef, useEffect } from "react";
import Board from "./components/Board/Board";
import { Score } from "./components/Score/Score";
import ResetButton from "./components/ResetButton/ResetButton";
import Result from "./components/Result/Result";
import CurrentPlayer from "./components/CurrentPlayer/CurrentPlayer";
import "./App.css";

type PlayerState = {
  playerId: number;
  points: number;
  name?: string;
};

function App() {
  const [player1State, setPlayer1State] = useState<PlayerState>({
    playerId: 1,
    points: 0,
  });
  const [player2State, setPlayer2State] = useState<PlayerState>({
    playerId: 2,
    points: 0,
  });
  const [currentPlayerId, setcurrentPlayerId] = useState<number>(1);

  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameId, setGameId] = useState<number>(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleMatch() {
    if (currentPlayerId === 1) {
      setPlayer1State((prevPlayer1State) => {
        return {
          ...prevPlayer1State,
          points: prevPlayer1State.points + 1,
        };
      });
    } else {
      setPlayer2State((prevPlayer2State) => {
        return {
          ...prevPlayer2State,
          points: prevPlayer2State.points + 1,
        };
      });
    }
  }

  function handleMismatch(onMismatchCb: () => void) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      onMismatchCb();
      setcurrentPlayerId((prevCurrentPlayerId) =>
        prevCurrentPlayerId === 1 ? 2 : 1,
      );
    }, 2000);
  }

  function handleResetClick() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = null;

    setPlayer1State((prevPlayer1State) => {
      return { ...prevPlayer1State, points: 0 };
    });
    setPlayer2State((prevPlayer2State) => {
      return { ...prevPlayer2State, points: 0 };
    });
    setcurrentPlayerId(1);
    setResultVisible(false);
    setGameId((prevGameId) => prevGameId + 1);
    setGameWon(false);
  }

  return (
    <>
      <div className="game-container">
        <CurrentPlayer currentPlayerId={currentPlayerId} />
        <Board
          key={gameId}
          onMatch={handleMatch}
          onShowResult={() => setResultVisible(true)}
          onGameWon={() => setGameWon(true)}
          onMismatch={handleMismatch}
        />
        <ResetButton onClick={handleResetClick} gameWon={gameWon} />
        <Score
          player1Score={player1State.points}
          player2Score={player2State.points}
        />
        {resultVisible && (
          <Result onClick={() => setResultVisible(false)}>
            {
              <>
                {player1State.points === player2State.points ? (
                  <span>
                    Remis {player1State.points}:{player2State.points}
                  </span>
                ) : (
                  <span>
                    Gracz{" "}
                    {player1State.points > player2State.points ? "1" : "2"}{" "}
                    wygrywa {player1State.points}:{player2State.points}
                  </span>
                )}
              </>
            }
          </Result>
        )}
      </div>
    </>
  );
}

export default App;
