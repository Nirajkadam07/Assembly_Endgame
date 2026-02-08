import React, { useRef } from "react";
import { clsx } from "clsx";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";
import GameTimer from "./GameTimer";

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = React.useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [isTimeUp, setIsTimeUp] = React.useState(false);
  const [gameCount, setGameCount] = React.useState(0);

  // Derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const isGameLost = wrongGuessCount >= languages.length - 1 || isTimeUp;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters(
      (prevLetters) =>
        prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],

      // {
      //   const lettersSet = new Set(prevLetters);
      //   lettersSet.add(letter);
      //   return Array.from(lettersSet);
      // },
    );
  }

  const languagesChips = languages.map((language, index) => {
    const isLanguageLost = index < wrongGuessCount;

    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };

    return (
      <span
        style={styles}
        key={language.name}
        className={`chip ${isLanguageLost ? "lost" : ""}`}
      >
        {language.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    // const isGuessd = guessedLetters.includes(letter);

    // return isGuessd && currentWord.includes(letter) ? (
    //   <span key={index}>{letter.toUpperCase()}</span>
    // ) : null;

    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter",
    );

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboard = alphabet.split("").map((letter) => {
    const isGuessd = guessedLetters.includes(letter);
    const isCorrect = isGuessd && currentWord.includes(letter);
    const isWrong = isGuessd && !currentWord.includes(letter);
    const classname = clsx("keyboardKey", {
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={classname}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver || !isGameStarted}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx("status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You Win!</h2>
          <p>Well done!🎉</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2>
          <p>You lose! Better start learning assembly 😭</p>
        </>
      );
    }

    return null;
  }

  function newGame() {
    setGuessedLetters([]);
    setIsTimeUp(false);
    setCurrentWord(getRandomWord());
    setGameCount((prev) => prev + 1);
    setIsGameStarted(false);
  }

  function startGame() {
    setIsGameStarted(true);
  }

  return (
    <>
      <main>
        {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
        <header className="header">
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 60 seconds and 8 attempts to keep the
            programming world safe from Assembly!
          </p>
        </header>
        <section className={gameStatusClass} aria-live="polite" role="status">
          {renderGameStatus()}
        </section>

        <section className="language-chips">{languagesChips}</section>
        {isGameStarted && (
          <GameTimer
            key={gameCount}
            expiryTimestamp={new Date(new Date().getTime() + 60000)}
            isPaused={isGameOver}
            onExpire={() => {
              setIsTimeUp(true);
            }}
          />
        )}
        {<section className="word">{letterElements}</section>}
        <section className="sr-only" aria-live="polite" role="status">
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct! The letter ${lastGuessedLetter} is in the word.`
              : `Sorry, the letter ${lastGuessedLetter} is not in the word`}
            You have {numGuessesLeft} attempts left.
          </p>
          <p>
            Current word:{" "}
            {currentWord
              .split("")
              .map((letter) =>
                guessedLetters.includes(letter) ? letter + "." : "blank",
              )
              .join(" ")}
          </p>
        </section>
        <section className="keyboard">{keyboard}</section>
        {!isGameOver && (
          <button onClick={startGame} className="new-game-btn">
            Start Game
          </button>
        )}
        {isGameOver && (
          <button onClick={newGame} className="new-game-btn">
            New Game
          </button>
        )}
      </main>
    </>
  );
}
