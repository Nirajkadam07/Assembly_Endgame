import React from "react";
import { clsx } from "clsx";
import { languages } from "./languages";

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = React.useState("react");
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  // Derived values
  let wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

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
    const isLost = index < wrongGuessCount;

    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };

    return (
      <span
        style={styles}
        key={language.name}
        className={`chip ${isLost ? "lost" : ""}`}
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
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function Status() {
    if (isGameOver) {
      if (isGameWon) {
        return (
          <div className="status-won">
            <h2>You Win!</h2>
            <p>Well done!🎉</p>
          </div>
        );
      } else if (isGameLost) {
        return (
          <div className="status-lost">
            <h2>Game Over!</h2>
            <p>You lose! Better start learning assembly 😭</p>
          </div>
        );
      } else {
        return "";
      }
    } else {
      return null;
    }
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
        <section className="status">
          <Status />
        </section>

        <section className="language-chips">{languagesChips}</section>
        <section className="word">{letterElements}</section>
        <section className="keyboard">{keyboard}</section>
        {isGameOver && <button className="new-game-btn">New Game</button>}
      </main>
    </>
  );
}
