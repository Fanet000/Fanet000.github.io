'use client';

import { useState, useEffect } from 'react';

export default function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setMessage('I\'m thinking of a number between 1 and 100. Can you guess it?');
    setGameOver(false);
  };

  const handleGuess = () => {
    if (!guess || isNaN(Number(guess))) {
      setMessage('Please enter a valid number!');
      return;
    }

    const guessNum = Number(guess);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === targetNumber) {
      const points = Math.max(100 - (newAttempts - 1) * 10, 10);
      setScore(score + points);
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts! (+${points} points)`);
      setGameOver(true);
    } else if (guessNum < targetNumber) {
      setMessage(`Too low! Try a higher number. (Attempt ${newAttempts})`);
    } else {
      setMessage(`Too high! Try a lower number. (Attempt ${newAttempts})`);
    }

    setGuess('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !gameOver) {
      handleGuess();
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/20">
        <div className="flex justify-between items-center mb-4">
          <div className="text-blue-400">
            <div className="text-sm">Attempts</div>
            <div className="text-2xl font-bold">{attempts}</div>
          </div>
          <div className="text-cyan-400">
            <div className="text-sm">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
        </div>
        
        <p className="text-white text-lg mb-6">{message}</p>
        
        {!gameOver ? (
          <div className="flex gap-4 justify-center items-center">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess"
              className="bg-black/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white text-center w-40 focus:outline-none focus:border-blue-500"
              min="1"
              max="100"
            />
            <button
              onClick={handleGuess}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Guess!
            </button>
          </div>
        ) : (
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Play Again
          </button>
        )}
      </div>
      
      <div className="text-gray-400 text-sm">
        <p>Tip: The fewer attempts you take, the more points you earn!</p>
      </div>
    </div>
  );
}