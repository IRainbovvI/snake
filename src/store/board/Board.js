import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { go, switchSide } from './boardSlice';
import './board.css';
import { useCallback } from 'react';
import { useRef } from 'react';

export const Board = () => {
  const game = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const interval = useRef(null);
  const keypress = useRef(null);

  const gameStep = useCallback(() => {
    interval.current = setInterval(() => {
      if (game.gameState === 1) {
        dispatch(go());
      }
    }, 500);
  }, [dispatch, game.gameState]);

  const arrowKeyPress = useCallback(() => {
    keypress.current = document.addEventListener('keydown', (e) => {
      if (game.switchingSide === 0) {
        console.log(game.switchingSide);
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
      }
    });
  }, [dispatch, game.switchingSide]);

  useEffect(() => {
    gameStep();
    return () => {
      clearInterval(interval.current);
    };
  }, [gameStep]);

  useEffect(() => {
    arrowKeyPress();
    return () => {
      document.removeEventListener('keydown', keypress.current);
    };
  }, [arrowKeyPress]);

  return (
    <div tabIndex='0' className='container'>
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
