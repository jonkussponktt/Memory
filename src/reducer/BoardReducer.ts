import { type BoardState, type BoardAction } from "../hooks/useBoard";

export function BoardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "first_unhidden":
      if (
        state.boardLocked ||
        state.unhiddenTilesId.length !== 0 ||
        state.matchedTilesId.includes(action.tileId)
      ) {
        return state;
      }
      return {
        ...state,
        unhiddenTilesId: [action.tileId],
      };
    case "match":
      if (
        state.boardLocked ||
        state.unhiddenTilesId.length !== 1 ||
        state.unhiddenTilesId[0] !== action.unhiddenTile ||
        action.tileId === action.unhiddenTile ||
        state.matchedTilesId.includes(action.tileId) ||
        state.matchedTilesId.includes(action.unhiddenTile)
      ) {
        return state;
      }
      return {
        ...state,
        matchedTilesId: [
          ...state.matchedTilesId,
          action.tileId,
          action.unhiddenTile,
        ],
        unhiddenTilesId: [],
        boardLocked: false,
      };
    case "mismatch":
      if (
        state.boardLocked ||
        state.unhiddenTilesId.length !== 1 ||
        state.unhiddenTilesId.includes(action.tileId) ||
        state.matchedTilesId.includes(action.tileId)
      ) {
        return state;
      }
      return {
        ...state,
        unhiddenTilesId: [...state.unhiddenTilesId, action.tileId],
        boardLocked: true,
      };
    case "mismatch_callback":
      if (!state.boardLocked || state.unhiddenTilesId.length !== 2) {
        return state;
      }
      return {
        ...state,
        unhiddenTilesId: [],
        boardLocked: false,
      };
    default:
      return state;
  }
}
