import { useEffect, useReducer } from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import {
  generateBoard,
  type TileData,
  idToIndices,
} from "../../utils/generateBoard";
import { BoardReducer } from "../../reducer/BoardReducer";

const initialBoardState = {
  unhiddenTilesId: [],
  matchedTilesId: [],
  board: generateBoard(),
  boardLocked: false,
};

function Board({
  shouldReset,
  onReset,
  onMovesNumberChanged,
  onShowResult,
  onGameWon,
  onMismatch,
}) {
  const [state, dispatch] = useReducer(BoardReducer, initialBoardState);

  const tilesNumber = 16;
  const gameWon = state.matchedTilesId.length === tilesNumber;
  const showResult = state.matchedTilesId.length === tilesNumber - 2;

  useEffect(() => {
    if (!shouldReset) return;
    onReset(() => {
      dispatch({ type: "reset" });
    });
  }, [shouldReset, onReset]);

  if (gameWon) {
    onGameWon();
  }

  function handleMatch(tileId: number) {
    if (showResult) {
      onShowResult();
    }
    dispatch({ type: "match", tileId, unhiddenTile: state.unhiddenTilesId[0] });
    onMovesNumberChanged();
  }

  function handleMismatch(tileId: number) {
    dispatch({ type: "mismatch", tileId });
    onMismatch(() => {
      dispatch({ type: "mismatch_callback" });
      onMovesNumberChanged();
    });
  }

  function handleTileClick(tileId: number, tileEmoji: string) {
    // board locked
    if (state.boardLocked) {
      return;
    }
    // dopiero pierwsza odkryta
    if (state.unhiddenTilesId.length !== 1) {
      dispatch({ type: "first_unhidden", tileId });
      return;
    }
    dispatch({ type: "second_unhidden", tileId });

    const [i, j] = idToIndices(state.unhiddenTilesId[0]);
    console.log(
      `jedna niedopasowana karta z id ${state.unhiddenTilesId[0]} jest już odkryta pod indeksami i:${i} j:${j}`,
    );
    // wykryliśmy dopasowanie
    if (state.board[i][j].emoji === tileEmoji) {
      console.log(
        `wykryliśmy dopasowanie: board[i][j].emoji ${state.board[i][j].emoji} tileEmoji ${tileEmoji}`,
      );
      handleMatch(tileId);
    } else {
      // nie ma dopasowania => pokazujemy oba przez 3 sekundy a potem zasłaniamy oba
      console.log(
        `nie ma dopasowania: board[i][j].emoji ${state.board[i][j].emoji} tileEmoji ${tileEmoji}`,
      );
      handleMismatch(tileId);
    }
  }

  return (
    <>
      <div className="board-container">
        <div className="board">
          {state.board.map((row: TileData[]) =>
            row.map((tile: TileData) => (
              <Tile
                key={tile.id}
                id={tile.id}
                hidden={
                  !state.unhiddenTilesId.includes(tile.id) &&
                  !state.matchedTilesId.includes(tile.id)
                }
                locked={state.boardLocked}
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
