import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { go, switchSide } from './boardSlice';
import './board.css';

export const Board = () => {
  const game = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    if (game.gameState === 1) {
      const gameStep = setTimeout(() => {
        dispatch(go());
      }, 1000);
      return () => {
        clearTimeout(gameStep);
      };
    }
  });

  useEffect(() => {
    const keydown = document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          dispatch(switchSide(0));
          break;
        case 'ArrowUp':
          dispatch(switchSide(1));
          break;
        case 'ArrowRight':
          dispatch(switchSide(2));
          break;
        case 'ArrowDown':
          dispatch(switchSide(3));
          break;
        default:
          break;
      }
    });
    return document.removeEventListener('keyup', keydown);
  });

  const test = (e) => {
    console.log(e.keyCode);
  };

  return (
    <div
      tabIndex='0'
      className='container'
      onKeyDown={(e) => {
        test(e);
      }}
    >
      {game.board.map((row, index) => {
        return (
          <div key={index} className='row'>
            {row.map((cell, index) => {
              return <div key={index} className={`cell-${cell[0]}`}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};
