import { useEffect, useReducer } from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import {
  generateBoard,
  type TileData,
  idToIndices,
} from "../../utils/generateBoard";
import { BoardReducer } from "../../reducer/BoardReducer";

export type BoardState = {
  unhiddenTilesId: number[];
  matchedTilesId: number[];
  board: TileData[][];
  boardLocked: boolean;
};

export type BoardAction =
  | {
      type: "reset";
    }
  | {
      type: "first_unhidden";
      tileId: number;
    }
  | {
      type: "second_unhidden";
      tileId: number;
    }
  | {
      type: "match";
      tileId: number;
      unhiddenTile: number;
    }
  | { type: "mismatch"; tileId: number }
  | { type: "mismatch_callback" };

interface BoardProps {
  shouldReset: boolean;
  onMatch: () => void;
  onReset: (cb: () => void) => void;
  onShowResult: () => void;
  onGameWon: () => void;
  onMismatch: (cb: () => void) => void;
}

const initialBoardState: BoardState = {
  unhiddenTilesId: [],
  matchedTilesId: [],
  board: generateBoard(),
  boardLocked: false,
};

function Board({
  shouldReset,
  onMatch,
  onReset,
  onShowResult,
  onGameWon,
  onMismatch,
}: BoardProps) {
  const [state, dispatch] = useReducer(BoardReducer, initialBoardState);

  const tilesNumber = 16;
  const gameWon = state.matchedTilesId?.length === tilesNumber;
  const showResult = state.matchedTilesId?.length === tilesNumber - 2;

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
    onMatch();
  }

  function handleMismatch(tileId: number) {
    dispatch({ type: "mismatch", tileId });
    onMismatch(() => {
      dispatch({ type: "mismatch_callback" });
    });
  }

  function handleTileClick(tileId: number, tileEmoji: string) {
    if (state.boardLocked) {
      return;
    }
    // dopiero pierwsza odkryta
    if (state.unhiddenTilesId?.length !== 1) {
      dispatch({ type: "first_unhidden", tileId });
      return;
    }
    dispatch({ type: "second_unhidden", tileId });

    const [i, j] = idToIndices(state.unhiddenTilesId[0]);
    // wykryliśmy dopasowanie
    if (state.board[i][j].emoji === tileEmoji) {
      handleMatch(tileId);
    } else {
      // nie ma dopasowania => pokazujemy oba przez 3 sekundy a potem zasłaniamy oba
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
                  !state.unhiddenTilesId?.includes(tile.id) &&
                  !state.matchedTilesId?.includes(tile.id)
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
