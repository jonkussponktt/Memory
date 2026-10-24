import { useReducer, useCallback } from "react";
import { BoardReducer } from "../reducer/BoardReducer";
import {
  generateBoard,
  type TileData,
  idToIndices,
} from "../utils/generateBoard";

export const tilesNumber = 16;

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

export interface BoardProps {
  onMatch: () => void;
  onShowResult: () => void;
  onGameWon: () => void;
  onMismatch: (cb: () => void) => void;
}

export type BoardState = {
  unhiddenTilesId: number[];
  matchedTilesId: number[];
  board: TileData[][];
  boardLocked: boolean;
};

export type UseBoardResult = BoardState & {
  tileClickCb: (tile: TileData) => void;
};

function createInitialBoardState(): BoardState {
  return {
    unhiddenTilesId: [],
    matchedTilesId: [],
    board: generateBoard(),
    boardLocked: false,
  };
}

export function useBoard({
  onMatch,
  onShowResult,
  onGameWon,
  onMismatch,
}: BoardProps): UseBoardResult {
  const [state, dispatch] = useReducer(
    BoardReducer,
    undefined,
    createInitialBoardState, // lazy init
  );

  const isLastPair = state.matchedTilesId?.length === tilesNumber - 2;

  const handleMatch = useCallback(
    function handleMatch(tileId: number) {
      if (isLastPair) {
        onShowResult();
        onGameWon();
      }
      dispatch({
        type: "match",
        tileId,
        unhiddenTile: state.unhiddenTilesId[0],
      });
      onMatch();
    },
    [isLastPair, onGameWon, onShowResult, onMatch, state.unhiddenTilesId],
  );

  const handleMismatch = useCallback(
    function handleMismatch(tileId: number) {
      dispatch({ type: "mismatch", tileId });
      onMismatch(() => {
        dispatch({ type: "mismatch_callback" });
      });
    },
    [onMismatch],
  );

  const tileClickCb = useCallback(
    function handleTileClick(tile: TileData) {
      if (state.boardLocked) {
        return;
      }
      // dopiero pierwsza odkryta
      const firstTileId = state.unhiddenTilesId[0];
      if (firstTileId === undefined) {
        dispatch({ type: "first_unhidden", tileId: tile.id });
        return;
      }

      const [row, col] = idToIndices(firstTileId);
      const firstTile = state.board[row][col];
      // wykryliśmy dopasowanie
      if (firstTile.emoji === tile.emoji) {
        handleMatch(tile.id);
      } else {
        // nie ma dopasowania => pokazujemy oba przez 2 sekundy a potem zasłaniamy oba
        handleMismatch(tile.id);
      }
    },
    [
      handleMatch,
      handleMismatch,
      state.board,
      state.boardLocked,
      state.unhiddenTilesId,
    ],
  );

  return {
    unhiddenTilesId: state.unhiddenTilesId,
    matchedTilesId: state.matchedTilesId,
    board: state.board,
    boardLocked: state.boardLocked,
    tileClickCb: tileClickCb,
  };
}
