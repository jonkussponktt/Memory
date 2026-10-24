import Tile from "../Tile/Tile";
import "./Board.css";
import { type TileData } from "../../utils/generateBoard";
import {
  useBoard,
  type UseBoardResult,
  tilesNumber,
  type BoardProps,
} from "../../hooks/useBoard";

function Board({ onMatch, onShowResult, onGameWon, onMismatch }: BoardProps) {
  const res: UseBoardResult = useBoard({
    onMatch,
    onShowResult,
    onGameWon,
    onMismatch,
  });
  const gameWon = res.matchedTilesId?.length === tilesNumber;
  return (
    <>
      <div className="board-container">
        <div className="board">
          {res.board.map((row: TileData[]) =>
            row.map((tile: TileData) => (
              <Tile
                key={tile.id}
                id={tile.id}
                hidden={
                  !res.unhiddenTilesId?.includes(tile.id) &&
                  !res.matchedTilesId?.includes(tile.id)
                }
                locked={res.boardLocked}
                onClick={() => {
                  if (tile) {
                    res.tileClickCb(tile);
                  }
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
