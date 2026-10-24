# 🧠 Memory Game

### 🎮 A Two-Player Memory Challenge

Flip tiles, match emojis, and score more points than your opponent!

**React · TypeScript · CSS**

<img width="500" height="500" alt="game_preview" src="https://github.com/user-attachments/assets/b4f4dd7c-dba1-4f1a-9411-7d1f22929f9d" />

---

## ✨ About the Project

**Memory Game** is a browser-based memory matching game for two players. Players take turns revealing tiles on a 4 × 4 board, trying to find pairs of matching emojis. The player with the most points at the end wins.

The project was built as a hands-on exercise in React, TypeScript, and application state management.

## 🎯 Features

- 🧩 **4 × 4 board** — 16 tiles containing 8 emoji pairs.
- 🎲 **Randomized layout** — a fresh arrangement for every new game.
- 👥 **Two-player mode** — displays whose turn it is.
- 🏆 **Score tracking** — earn one point for each matching pair.
- ⏳ **Tile reveal** — unmatched tiles flip back after 2 seconds.
- 🔒 **Board locking** — prevents additional selections while unmatched tiles are visible.
- ✨ **Animations** — interactive tile effects and a victory animation.
- 🔄 **Game reset** — start over with a new board and reset scores.
- 📱 **Responsive design** — adapts the board to the available screen space.

## 🕹️ How to Play

1. **Player 1** reveals two tiles.
2. If the emojis match, the tiles remain visible, the player earns **1 point**, and keeps their turn.
3. If the emojis do not match, both tiles remain visible for **2 seconds** before being hidden again. The turn then passes to the other player.
4. The game ends when all **8 pairs** have been found.
5. The player with the higher score wins. A **draw** is also possible.

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **React** | Component-based user interface |
| **TypeScript** | Type-safe board data, component props, and actions |
| **CSS** | Grid layout, responsiveness, and animations |
| **React Hooks** | State management and game lifecycle logic |

## 🚀 Getting Started

Make sure **Node.js** and **npm** are installed.

```bash
# Clone the repository
git clone https://github.com/jonkussponktt/Memory.git

# Navigate to the project directory
cd Memory

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the local URL displayed in your terminal.

## 🧱 Architecture

The game logic is separated from the components responsible for rendering the interface:

- **`App`** — manages players, scores, turns, and game results.
- **`Board`** — renders the board and its tiles.
- **`Tile`** — displays an individual tile in its current state.
- **`useBoard`** — a custom hook containing tile selection and matching logic.
- **`BoardReducer`** — manages board state transitions through actions.
- **`generateBoard`** — creates and shuffles the emoji pairs.
- **`CurrentPlayer`, `Score`, `Result`, `ResetButton`** — display player information and available actions.

The project uses React features such as `useReducer`, `useCallback`, and `useRef`, along with timeout management to control turns.

## 📚 What I Learned

- Building React components and typing their props with TypeScript.
- Separating game logic from presentation components.
- Modeling game state with `useReducer`.
- Creating and using custom hooks.
- Handling asynchronous behavior and cleaning up timeouts.
- Building a responsive interface with CSS Grid.

---

**Have fun playing!** 🎉

</div>

