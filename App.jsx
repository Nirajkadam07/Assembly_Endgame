import React from "react";
import { languages } from "./languages";

export default function AssemblyEndgame() {
  const languagesChips = languages.map((language) => {
    return <p>{language.name}</p>;
  });

  return (
    <>
      <header className="header">
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <main>
        <section className="status">
          <h2>You Win!</h2>
          <p>Well done!🎉</p>
        </section>

        <section>{languagesChips}</section>
      </main>
    </>
  );
}
