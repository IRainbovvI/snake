import { createSlice } from '@reduxjs/toolkit';
import data from '../../data';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: data,
    tail: 3,
    side: 3,
    switchingSide: 0,
    gameState: 1
  },
  /* 
  side:
  0 - left
  1 - top
  2 - right
  3 - bottom

  gameState:
  0 - paused
  1 - active
  2 - game over
  */
  reducers: {
    go: (state) => {
      let a;
      let b;
      for (let i = 0; i < state.board.length; i++) {
        for (let i1 = 0; i1 < state.board[i].length; i1++) {
          if (state.board[i][i1][0] === 2) {
            b = i1;
            a = i;
            break;
          }
        }
      }
      //   let tail;
      //   for (let i = 0; i < state.board.length; i++) {
      //     for (let i1 = 0; i1 < state.board[i].length; i1++) {
      //       if (state.board[i][i1].length > 1) {
      //         if (state.board[i][i1][1] === state.tail) {
      //           tail = [i, i1];
      //           break;
      //         }
      //       }
      //     }
      //   }

      switch (state.side) {
        case 0:
          if (state.board[a][b - 1][0] === 3) {
            gOver(state);
          } else {
            state.board[a][b - 1][0] = 2;
            state.board[a][b][0] = 1;
            changeTailIndexes(state);
            state.board[a][b - 1].push(1);
          }

          break;
        case 1:
          if (state.board[a - 1][b][0] === 3) {
            gOver(state);
          } else {
            state.board[a - 1][b][0] = 2;
            state.board[a][b][0] = 1;
            changeTailIndexes(state);
            state.board[a - 1][b].push(1);
          }

          break;
        case 2:
          if (state.board[a][b + 1][0] === 3) {
            gOver(state);
          } else {
            state.board[a][b + 1][0] = 2;
            state.board[a][b][0] = 1;
            changeTailIndexes(state);
            state.board[a][b + 1].push(1);
          }

          break;
        case 3:
          if (state.board[a + 1][b][0] === 3) {
            gOver(state);
          } else {
            state.board[a + 1][b][0] = 2;
            state.board[a][b][0] = 1;
            changeTailIndexes(state);
            state.board[a + 1][b].push(1);
          }

          break;
        default:
          console.log('Oh man, you broke it, again');
          break;
      }
      state.switchingSide = 0;
    },
    gameOver: (state) => {
      gOver(state);
    },
    switchSide: (state, action) => {
      const direction = action.payload;
      if (direction === 0 || direction === 2) {
        if (state.side !== 0 && state.side !== 2) {
          state.side = direction;
        }
      } else {
        if (state.side !== 1 && state.side !== 3) {
          state.side = direction;
        }
      }
      state.switchingSide = 1;
    }
  }
});

export const { go, switchSide } = boardSlice.actions;

export default boardSlice.reducer;

const gOver = (state) => {
  state.gameState = 2;
  console.log('Game over!');
};

const changeTailIndexes = (state) => {
  for (let i1 = 0; i1 < state.board.length; i1++) {
    for (let i2 = 0; i2 < state.board[i1].length; i2++) {
      if (state.board[i1][i2][1] === state.tail) {
        state.board[i1][i2].pop();
        state.board[i1][i2][0] = 0;
      }
    }
  }

  for (let i = state.tail - 1; i > 0; i--) {
    for (let i1 = 0; i1 < state.board.length; i1++) {
      for (let i2 = 0; i2 < state.board[i1].length; i2++) {
        if (state.board[i1][i2][1] === i) {
          state.board[i1][i2][1] = i + 1;
          break;
        }
      }
    }
  }
};
