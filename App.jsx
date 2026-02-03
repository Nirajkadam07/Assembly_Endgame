import React from "react";
import { clsx } from "clsx";
import { languages } from "./languages";
import { getFarewellText } from "./utils";

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = React.useState("react");
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
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

    return (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboard = alphabet.split("").map((letter) => {
    const isGuessd = guessedLetters.includes(letter);
    const isCorrect = isGuessd && currentWord.includes(letter);
    const isWrong = isGuessd && !currentWord.includes(letter);
    const classname = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={classname}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver}
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

  return (
    <>
      <main>
        <header className="header">
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
        </header>
        <section className={gameStatusClass}>{renderGameStatus()}</section>

        <section className="language-chips">{languagesChips}</section>
        <section className="word">{letterElements}</section>
        <section className="keyboard">{keyboard}</section>
        {isGameOver && <button className="new-game-btn">New Game</button>}
      </main>
    </>
  );
}
