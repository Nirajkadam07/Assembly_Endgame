import React from "react";
import { languages } from "./languages";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = React.useState("react");

  const [guessedLetters, setGuessedLetters] = React.useState([]);

  function keyboardClick(e) {
    setGuessedLetters((prevArr) => {
      return [...prevArr, e.target.innerText];
    });
  }
  console.log(guessedLetters);
  
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

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
    return <span key={index}>{letter.toUpperCase()}</span>;
  });

  const keyboard = alphabet.split("").map((letter) => {
    return <button key={letter} onClick={keyboardClick}>{letter.toUpperCase()}</button>;
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
      </main>
    </>
  );
}
