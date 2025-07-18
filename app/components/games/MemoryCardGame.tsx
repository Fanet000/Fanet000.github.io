'use client';

import { useState, useEffect } from 'react';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryCardGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);

  const symbols = ['🎮', '🕹️', '🎯', '🎲', '🃏', '🎪', '🎨', '🎭'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
          
          const newMatches = matches + 1;
          setMatches(newMatches);
          setFlippedCards([]);
          
          if (newMatches === symbols.length) {
            const points = Math.max(200 - moves * 5, 50);
            setScore(score + points);
            setGameWon(true);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-8 mb-6">
        <div className="text-center">
          <div className="text-purple-400 text-sm">Moves</div>
          <div className="text-2xl font-bold text-white">{moves}</div>
        </div>
        <div className="text-center">
          <div className="text-pink-400 text-sm">Matches</div>
          <div className="text-2xl font-bold text-white">{matches}/{symbols.length}</div>
        </div>
        <div className="text-center">
          <div className="text-cyan-400 text-sm">Score</div>
          <div className="text-2xl font-bold text-white">{score}</div>
        </div>
      </div>

      {gameWon && (
        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500/20 text-center">
          <p className="text-green-400 text-xl font-semibold mb-4">
            🎉 Congratulations! You won in {moves} moves!
          </p>
          <button
            onClick={initializeGame}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-400 hover:scale-105'
            } ${card.isMatched ? 'opacity-75' : ''}`}
          >
            {card.isFlipped || card.isMatched ? card.symbol : '?'}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={initializeGame}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          New Game
        </button>
      </div>
    </div>
  );
}