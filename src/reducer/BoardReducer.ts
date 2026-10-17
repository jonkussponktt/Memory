import { generateBoard } from "../utils/generateBoard";
import { type BoardState, type BoardAction } from "../components/Board/Board";

export function BoardReducer(state: BoardState, action: BoardAction): BoardState {
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
