import  { Component } from "react";
import Modal from "react-modal";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import './App.css';

const word_list = ["apple", "grape", "mango", "lemon", "peach"];
const getRandomWord = () => word_list[Math.floor(Math.random() * word_list.length)];

class WordleClone extends Component {
  
    state = {
      targetWord: getRandomWord(),
      guesses: [],
      currentGuess: "",
      attemptsLeft: 6,
      gameStatus: "playing",
      darkMode: false,
      isRulesOpen: false,
    };
  

  handleInputChange = (e) => {
    this.setState({ currentGuess: e.target.value.toLowerCase() });
  };

  handleSubmit = () => {
    const { currentGuess, targetWord, guesses, attemptsLeft, gameStatus } = this.state;
    if (gameStatus !== "playing" || currentGuess.length !== 5) return;
    
    if (!word_list.includes(currentGuess)) {
      alert("Invalid word!");
      this.setState({ attemptsLeft: attemptsLeft - 1 });
      return;
    }

    const feedback = currentGuess.split("").map((letter, index) => {
      if (letter === targetWord[index]) return "green";
      if (targetWord.includes(letter)) return "yellow";
      return "gray";
    });

    const newGuesses = [...guesses, { word: currentGuess, feedback }];
    const newAttemptsLeft = attemptsLeft - 1;
    const newGameStatus = currentGuess === targetWord ? "won" : newAttemptsLeft === 0 ? "lost" : "playing";

    this.setState({
      guesses: newGuesses,
      currentGuess: "",
      attemptsLeft: newAttemptsLeft,
      gameStatus: newGameStatus,
    });
  };

  handleNewGame = () => {
    this.setState({
      targetWord: getRandomWord(),
      guesses: [],
      currentGuess: "",
      attemptsLeft: 6,
      gameStatus: "playing",
    });
  };

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  openRules = () => {
    this.setState({ isRulesOpen: true });
  };

  closeRules = () => {
    this.setState({ isRulesOpen: false });
  };

  render() {
    const { guesses, currentGuess, attemptsLeft, gameStatus, darkMode, isRulesOpen } = this.state;

    return (
      <div className={`wordle-container ${darkMode ? "dark" : ""}`}>
        <nav className="theme-btn"> <button onClick={this.toggleDarkMode} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} >{darkMode ? <CiLight/> : <MdDarkMode/>}</button></nav>
        <h1>Wordle Clone</h1>
        
        
        <Modal isOpen={isRulesOpen} onRequestClose={this.closeRules} className="modal">
          <div className="modal-content">
          <h2>Game Rules</h2>
          <p>- You have 6 attempts to guess a 5-letter word.</p>
          <p>- Each guess must be a valid word.</p>
          <p className="words">Hint:words belongs to fruits category</p>
          <p> Green: Correct letter in the correct position.</p>
          <p> Yellow: Correct letter in the wrong position.</p>
          <p> Gray: Incorrect letter.</p>
          <button onClick={this.closeRules}>Close</button>
          </div>
        </Modal>
        <div className="grid">
          {guesses.map((guess, i) => (
            <div key={i} className="row">
              {guess.word.split("").map((letter, j) => (
                <div key={j} className={`cell ${guess.feedback[j]}`}>{letter}</div>
              ))}
            </div>
          ))}
        </div>
        {gameStatus === "playing" ? (
          <>
            <input
              type="text"
              maxLength="5"
              value={currentGuess}
              onChange={this.handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && this.handleSubmit()}
              disabled={gameStatus !== "playing"}
              placeholder="Enter a 5-letter word"
            />
            <button className="game-button" onClick={this.handleSubmit} disabled={currentGuess.length !== 5}>Submit</button>
          </>
        ) : (
          <h2>{gameStatus === "won" ? "You Win!" : "Game Over!"}</h2>
        )}
        <button className="game-button" onClick={this.handleNewGame}>New Game</button>
        <p>Attempts Left: {attemptsLeft}</p>
        <div className="Rules-btn-con" > <button className="Rules-btn" onClick={this.openRules} >Rules</button></div>
        
      </div>
    );
  }
}

export default WordleClone;

