import { useReducer } from "react";
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
      type: "first_unhidden";
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
  onShowResult: () => void;
  onGameWon: () => void;
  onMismatch: (cb: () => void) => void;
}

function Board({ onMatch, onShowResult, onGameWon, onMismatch }: BoardProps) {
  function createInitialBoardState(): BoardState {
    return {
      unhiddenTilesId: [],
      matchedTilesId: [],
      board: generateBoard(),
      boardLocked: false,
    };
  }
  const [state, dispatch] = useReducer(
    BoardReducer,
    undefined,
    createInitialBoardState, // lazy init
  );

  const tilesNumber = 16;
  const gameWon = state.matchedTilesId?.length === tilesNumber;
  const lastPair = state.matchedTilesId?.length === tilesNumber - 2;

  function handleMatch(tileId: number) {
    if (lastPair) {
      onShowResult();
      onGameWon();
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

  function handleTileClick(tile: TileData) {
    console.log("handleTileClick");
    if (state.boardLocked || gameWon) {
      console.log("early return");
      return;
    }
    // dopiero pierwsza odkryta
    const firstTileId = state.unhiddenTilesId[0];
    if (firstTileId === undefined) {
      console.log("odkryta pierwsza karta");
      dispatch({ type: "first_unhidden", tileId: tile.id });
      return;
    }

    const [row, col] = idToIndices(firstTileId);
    const firstTile = state.board[row][col];
    // wykryliśmy dopasowanie
    if (firstTile.emoji === tile.emoji) {
      handleMatch(tile.id);
    } else {
      // nie ma dopasowania => pokazujemy oba przez 3 sekundy a potem zasłaniamy oba
      handleMismatch(tile.id);
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
                  handleTileClick(tile);
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
