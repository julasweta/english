import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userUid: false,
    words: [],
    lang: "translateWord",
    idWord:  0
}

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
  
    isAuth: (state, action) => {
      state.userUid = action.payload
    },
    setWords: (state, action) => {
      state.words = action.payload
    },
    setLang: (state, action) => {
      state.lang = action.payload
    },
    setIdWord: (state, action) => {
      state.idWord = action.payload
    },
  },
})


export const { isAuth, setWords, setLang, setIdWord } = wordsSlice.actions

export default wordsSlice.reducer