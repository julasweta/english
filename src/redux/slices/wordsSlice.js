import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userUid: false,
    words: [],
    lang: "translateWord",
    idWord:  0,
    parts: ['phrase', 'noun', 'verb'],
    part: '',
    searchWord: ''
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
    setPart: (state, action) => {
      state.part = action.payload
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload
    },
  },
})


export const { isAuth, setWords, setLang, setIdWord, setPart, setSearchWord } = wordsSlice.actions

export default wordsSlice.reducer