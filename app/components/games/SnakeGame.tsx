'use client';

import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
  const BOARD_SIZE = 15;
  const INITIAL_SNAKE = [{ x: 7, y: 7 }];
  const INITIAL_FOOD = { x: 10, y: 10 };

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setGameRunning(false);
    setGameOver(false);
    setScore(0);
  };

  const startGame = () => {
    setGameRunning(true);
    setGameOver(false);
  };

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        if (score > highScore) {
          setHighScore(score);
        }
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        if (score > highScore) {
          setHighScore(score);
        }
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, gameRunning, gameOver, food, score, highScore, generateFood]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 200);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameRunning]);

  const handleDirectionClick = (newDirection: Direction) => {
    if (!gameRunning) return;
    
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT'
    };
    
    if (direction !== opposites[newDirection]) {
      setDirection(newDirection);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-8 mb-6">
        <div className="text-center">
          <div className="text-green-400 text-sm">Score</div>
          <div className="text-2xl font-bold text-white">{score}</div>
        </div>
        <div className="text-center">
          <div className="text-yellow-400 text-sm">High Score</div>
          <div className="text-2xl font-bold text-white">{highScore}</div>
        </div>
        <div className="text-center">
          <div className="text-purple-400 text-sm">Length</div>
          <div className="text-2xl font-bold text-white">{snake.length}</div>
        </div>
      </div>

      <div className="flex justify-center">
        <div 
          className="grid bg-gray-900 p-4 rounded-xl border border-green-500/20"
          style={{ 
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            gap: '2px'
          }}
        >
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
            const x = index % BOARD_SIZE;
            const y = Math.floor(index / BOARD_SIZE);
            
            const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
            const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;
            
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-sm ${
                  isSnakeHead
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                    : isSnakeBody
                    ? 'bg-green-500'
                    : isFood
                    ? 'bg-red-500 animate-pulse'
                    : 'bg-gray-800'
                }`}
              >
                {isFood && <div className="w-full h-full flex items-center justify-center text-xs">🍎</div>}
              </div>
            );
          })}
        </div>
      </div>

      {gameOver && (
        <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border border-red-500/20 text-center">
          <p className="text-red-400 text-xl font-semibold mb-4">
            Game Over! Final Score: {score}
          </p>
          {score === highScore && score > 0 && (
            <p className="text-yellow-400 text-sm mb-4">🎉 New High Score!</p>
          )}
        </div>
      )}

      <div className="text-center space-y-4">
        {!gameRunning && !gameOver && (
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Start Game
          </button>
        )}
        
        {gameOver && (
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Play Again
          </button>
        )}

        <div className="grid grid-cols-3 gap-2 max-w-32 mx-auto">
          <div></div>
          <button
            onClick={() => handleDirectionClick('UP')}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <i className="ri-arrow-up-line"></i>
          </button>
          <div></div>
          
          <button
            onClick={() => handleDirectionClick('LEFT')}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <div></div>
          <button
            onClick={() => handleDirectionClick('RIGHT')}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
          
          <div></div>
          <button
            onClick={() => handleDirectionClick('DOWN')}
            className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <i className="ri-arrow-down-line"></i>
          </button>
          <div></div>
        </div>
        
        <p className="text-gray-400 text-sm">
          Use arrow keys or buttons to control the snake
        </p>
      </div>
    </div>
  );
}