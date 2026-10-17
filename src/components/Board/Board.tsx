import { useState, useRef, useEffect } from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import {
  generateBoard,
  type TileData,
  idToIndices,
} from "../../utils/generateBoard";

function Board({
  shouldReset,
  onReset,
  onMovesNumberChanged,
  onShowResult,
  onGameWon,
  onMismatch,
}) {
  const [unhiddenTilesId, setUnhiddenTilesId] = useState<number[]>([]);
  const [matchedTilesId, setMatchedTilesId] = useState<number[]>([]);
  const [board, setBoard] = useState<TileData[][]>(() => generateBoard());
  const [boardLocked, setBoardLocked] = useState<boolean>(false);

  const tilesNumber = 16;
  const gameWon = matchedTilesId.length === tilesNumber;
  const showResult = matchedTilesId.length === tilesNumber - 2;

  useEffect(() => {
    if (!shouldReset) return;
    onReset(() => {
      setMatchedTilesId([]);
      setUnhiddenTilesId([]);
      setBoard(() => generateBoard());
      setBoardLocked(false);
    });
  }, [shouldReset, onReset]);

  if (gameWon) {
    onGameWon();
  }

  function handleMatch(tileId: number) {
    if (showResult) {
      onShowResult();
    }
    setMatchedTilesId((prevMatchedTilesId) => [
      ...prevMatchedTilesId,
      tileId,
      unhiddenTilesId[0],
    ]);
    setUnhiddenTilesId([]);
    setBoardLocked(false);
    onMovesNumberChanged();
  }

  function handleMismatch(tileId: number) {
    setUnhiddenTilesId((prevUnhiddenTilesId: number[]) => [
      ...prevUnhiddenTilesId,
      tileId,
    ]);
    onMismatch(() => {
      setUnhiddenTilesId([]);
      setBoardLocked(false);
      onMovesNumberChanged();
    });
  }

  function handleTileClick(tileId: number, tileEmoji: string) {
    // board locked
    if (boardLocked) {
      return;
    }
    // dopiero pierwsza odkryta
    if (unhiddenTilesId.length !== 1) {
      setUnhiddenTilesId([tileId]);
      return;
    }
    setBoardLocked(true);
    const [i, j] = idToIndices(unhiddenTilesId[0]);
    console.log(
      `jedna niedopasowana karta z id ${unhiddenTilesId[0]} jest już odkryta pod indeksami i:${i} j:${j}`,
    );
    // wykryliśmy dopasowanie
    if (board[i][j].emoji === tileEmoji) {
      console.log(
        `wykryliśmy dopasowanie: board[i][j].emoji ${board[i][j].emoji} tileEmoji ${tileEmoji}`,
      );
      handleMatch(tileId);
    } else {
      // nie ma dopasowania => pokazujemy oba przez 3 sekundy a potem zasłaniamy oba
      console.log(
        `nie ma dopasowania: board[i][j].emoji ${board[i][j].emoji} tileEmoji ${tileEmoji}`,
      );
      handleMismatch(tileId);
    }
  }

  return (
    <>
      <div className="board-container">
        <div className="board">
          {board.map((row) =>
            row.map((tile) => (
              <Tile
                key={tile.id}
                id={tile.id}
                hidden={
                  !unhiddenTilesId.includes(tile.id) &&
                  !matchedTilesId.includes(tile.id)
                }
                locked={boardLocked}
                onClick={() => {
                  handleTileClick(tile.id, tile.emoji);
                }}
                win={gameWon}
              >
                {tile.emoji}
              </Tile>
            )),
          )}
        </div>
      </div>
    </>
  );
}

export default Board;
