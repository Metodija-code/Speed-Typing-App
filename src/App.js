import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { words } from "./data";

function App() {
  let [timer, setTimer] = useState(null);

  let [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState("play");
  let [typedWord, setTypedWord] = useState("");
  const [initializeGame, setInitializeGame] = useState("play");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const int = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      if (timer <= 0) {
        setIsPlaying(false);
        clearInterval(int);
        setModal(true);
        setCurrentWord("");
      }

      return () => {
        clearInterval(int);
      };
    }
  }, [timer]);

  useEffect(() => {
    if (typedWord === currentWord) {
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);

      setScore(score + 1);
      setTypedWord("");
      setTimer(10);
    }
  }, [typedWord]);

  return (
    <section className="section-center">
      {modal && (
        <div className="modal">
          <button className="myButton" onClick={() => setModal(false)}>
            Play again
          </button>
        </div>
      )}

      <article>
        <p>
          Timer: <span>{isPlaying ? timer : "10"}</span>
        </p>

        <p>
          Word: <span id="currnet-word">{currentWord}</span>
        </p>

        <form>
          <input
            type="text"
            placeholder="type in play to start playing"
            value={typedWord}
            onChange={(e) => {
              setTypedWord(e.target.value);
              if (e.target.value === initializeGame) {
                setCurrentWord(words[Math.floor(Math.random() * words.length)]);
                setIsPlaying(true);
                setTimer(10);
                setTypedWord("");
                setInitializeGame(null);
              }
            }}
          />
        </form>

        <p>
          Score: <span>{score}</span>
        </p>
      </article>
    </section>
  );
}

export default App;
