import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from './slices/wordsSlice'

export const store = configureStore({
  reducer: { words: wordsReducer },
});
