import { generateBoard } from "../utils/generateBoard";

export function BoardReducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        matchedTilesId: [],
        unhiddenTilesId: [],
        board: generateBoard(),
        boardLocked: false,
      };
    case "first_unhidden":
      return {
        ...state,
        unhiddenTilesId: [action.tileId],
      };
    case "second_unhidden":
      return {
        ...state,
        boardLocked: true,
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
