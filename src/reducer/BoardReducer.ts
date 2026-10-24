import { type BoardState, type BoardAction } from "../components/Board/Board";

export function BoardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "first_unhidden":
      console.log("first_unhidden");
      return {
        ...state,
        unhiddenTilesId: [action.tileId],
      };
    case "match":
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
      return {
        ...state,
        unhiddenTilesId: [...state.unhiddenTilesId, action.tileId],
        boardLocked: true,
      };
    case "mismatch_callback":
      return {
        ...state,
        unhiddenTilesId: [],
        boardLocked: false,
      };
    default:
      return state;
  }
}
