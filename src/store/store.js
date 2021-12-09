import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice';

export default configureStore({
  reducer: {
    board: boardReducer
  }
});
