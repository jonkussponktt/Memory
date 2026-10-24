import "./CurrentPlayer.css";

interface CurrentPlayerProps {
  currentPlayerId: number;
}

export default function CurrentPlayer({ currentPlayerId }: CurrentPlayerProps) {
  return (
    <span className="player-turn">
      Ruch gracza <span className="player-turn__id">{currentPlayerId}</span>
    </span>
  );
}
