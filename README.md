# 🧠 Memory Game

### 🎮 Wyzwanie pamięciowe dla dwóch graczy

Odkrywaj kafelki, szukaj pasujących emoji i zdobądź więcej punktów niż przeciwnik!

**React · TypeScript · CSS**

---

## ✨ O projekcie

**Memory Game** to przeglądarkowa gra pamięciowa dla dwóch osób. Gracze na zmianę odkrywają kafelki na planszy 4 × 4 i próbują znaleźć pary identycznych emoji. Zwycięża osoba, która zdobędzie więcej punktów.

Projekt powstał jako ćwiczenie praktycznego wykorzystania Reacta, TypeScriptu oraz zarządzania stanem aplikacji.

## 🎯 Funkcje

- 🧩 **Plansza 4 × 4** — 16 kafelków i 8 par emoji.
- 🎲 **Losowe rozmieszczenie** — nowy układ przy rozpoczęciu gry.
- 👥 **Rozgrywka dla dwóch graczy** — wyświetlanie aktualnej kolejki.
- 🏆 **Punktacja** — punkt za każdą odnalezioną parę.
- ⏳ **Odkrywanie kart** — niedopasowane kafelki zakrywają się po 2 sekundach.
- 🔒 **Blokada planszy** — podczas oczekiwania nie można odkrywać kolejnych kart.
- ✨ **Animacje** — efekty interakcji z kafelkami i zakończenia rozgrywki.
- 🔄 **Reset gry** — nowa plansza i wyzerowana punktacja.
- 📱 **Responsywny interfejs** — plansza dopasowuje się do dostępnej przestrzeni.

## 🕹️ Zasady gry

1. Gracz 1 odkrywa dwa kafelki.
2. Jeśli emoji są identyczne, para pozostaje odkryta, a gracz zdobywa **1 punkt** i kontynuuje turę.
3. Jeśli emoji są różne, kafelki pozostają widoczne przez **2 sekundy**, po czym się zakrywają. Kolej przechodzi na drugiego gracza.
4. Gra kończy się po odnalezieniu wszystkich **8 par**.
5. Wygrywa gracz z większą liczbą punktów. Możliwy jest również **remis**.

## 🛠️ Technologie

| Technologia | Zastosowanie |
| --- | --- |
| **React** | Komponenty i interfejs użytkownika |
| **TypeScript** | Typowanie danych planszy, propsów i akcji |
| **CSS** | Układ Grid, responsywność i animacje |
| **React Hooks** | Zarządzanie stanem oraz cyklem życia logiki gry |

## 🚀 Uruchomienie lokalne

Potrzebujesz zainstalowanego **Node.js** i **npm**.

```bash
# Sklonuj repozytorium
git clone https://github.com/jonkussponktt/Memory.git

# Przejdź do katalogu projektu
cd Memory

# Zainstaluj zależności
npm install

# Uruchom aplikację w trybie deweloperskim
npm run dev
```

Otwórz adres podany w terminalu po uruchomieniu serwera deweloperskiego.

Lub wykorzystaj następujący link: [Netlify Memory App](https://memoryjonkussponkt.netlify.app/)

## 🧱 Architektura

Logika rozgrywki jest oddzielona od komponentów odpowiedzialnych za jej prezentację:

- **`App`** — zarządza graczami, punktacją, turami i wynikiem rozgrywki.
- **`Board`** — renderuje planszę i jej kafelki.
- **`Tile`** — wyświetla pojedynczy kafelek w odpowiednim stanie.
- **`useBoard`** — custom hook z logiką odkrywania i dopasowywania kafelków.
- **`BoardReducer`** — obsługuje przejścia między stanami planszy za pomocą akcji.
- **`generateBoard`** — tworzy i losowo miesza pary emoji.
- **`CurrentPlayer`, `Score`, `Result`, `ResetButton`** — prezentują informacje i akcje dostępne dla graczy.

W projekcie wykorzystano m.in. `useReducer`, `useCallback`, `useRef` i obsługę timeoutów do kontrolowania przebiegu tury.

## 📚 Czego uczy ten projekt?

- Projektowania komponentów w React i typowania ich propsów.
- Rozdzielania logiki biznesowej od warstwy wizualnej.
- Modelowania stanu gry przy użyciu `useReducer`.
- Tworzenia i używania własnych hooków.
- Obsługi operacji asynchronicznych i czyszczenia timeoutów.
- Budowy responsywnego interfejsu z użyciem CSS Grid.

---

**Miłej gry!** 🎉


