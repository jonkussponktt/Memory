const emojis = ["🌟", "🚀", "🎸", "❤️", "🎂", "🎁", "🎉", "🎈"];

export type TileData = {
  id: number;
  emoji: string;
};

export function generateBoard(): TileData[][] {
  const shuffledEmojis = [...emojis, ...emojis];

  for (let i = shuffledEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledEmojis[i], shuffledEmojis[j]] = [
      shuffledEmojis[j],
      shuffledEmojis[i],
    ];
  }

  const tiles: TileData[] = shuffledEmojis.map((emoji, index) => ({
    id: index,
    emoji,
  }));

  return Array.from({ length: 4 }, (_, row) =>
    tiles.slice(row * 4, row * 4 + 4),
  );
}

export function idToIndices(id: number): number[] {
  if (id < 0 || id > 15) {
    return [];
  }

  return [Math.floor(id / 4), id % 4];
}

export function indicesToId(row: number, col: number): number {
  if (row < 0 || row > 3 || col < 0 || col > 3) {
    return -1;
  }

  return row * 4 + col;
}

