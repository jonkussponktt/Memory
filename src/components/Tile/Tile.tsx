import "./Tile.css";

const hiddenEmoji = "❓";

export default function Tile({ id, hidden, locked, onClick, win, children }) {
  return (
    <>
      <button
        className={`tile ${hidden ? "tile--hidden" : "tile--revealed"} ${
          win ? "tile--win" : ""
        }`}
        onClick={onClick}
        disabled={!hidden || locked}
        style={{
          animationDelay: win ? `${id * 80}ms` : "0ms",
        }}
      >
        <span className={"tile_content"}>
          {hidden ? hiddenEmoji : children}
        </span>
      </button>
    </>
  );
}
