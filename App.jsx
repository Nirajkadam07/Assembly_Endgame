import React from "react";
import { clsx } from "clsx";
import { languages } from "./languages";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState("react");

  const [guessedLetters, setGuessedLetters] = React.useState([]);

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

  const languagesChips = languages.map((language) => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    return (
      <span style={styles} key={language.name}>
        {language.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const isGuessd = guessedLetters.includes(letter);
    const isCorrect = isGuessd && currentWord.includes(letter);

    return isGuessd && currentWord.includes(letter) ? (
      <span key={index}>{letter.toUpperCase()}</span>
    ) : null;
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
          <h2>You Win!</h2>
          <p>Well done!🎉</p>
        </section>

        <section className="language-chips">{languagesChips}</section>
        <section className="word">{letterElements}</section>
        <section className="keyboard">{keyboard}</section>
        <button className="new-game-btn">New Game</button>
      </main>
    </>
  );
}
