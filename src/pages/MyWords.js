import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLang, setIdWord } from "../redux/slices/wordsSlice";
import data from "../words.json";

function MyWords() {
  const dispatch = useDispatch();
  const { lang, idWord, words } = useSelector((state) => state.words);

  const [selectedDate, setSelectedDate] = useState("");

  const filteredWords = words.filter((word) => {
    return selectedDate ? word.dateAdded === selectedDate : true;
  });

  const addIdWord = () => {
    if (idWord < filteredWords.length - 1) {
      dispatch(setIdWord(idWord + 1));
    } else {
      dispatch(setIdWord(0));
    }
  };

  return (
    <div className="my-words">
      <div>
        <label htmlFor="date">Select date: </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      {lang === true ? (
        <div className="wrapper">
          <div className="word" onClick={() => dispatch(setLang(!lang))}>
            {filteredWords[idWord] &&
              data &&
              data.result.filter(
                (item) => item.id === filteredWords[idWord].id
              )[0].englishWord}
          </div>
          <div className="trans">
            [{" "}
            {filteredWords[idWord] &&
              data &&
              data.result.filter(
                (item) => item.id === filteredWords[idWord].id
              )[0].englishPronunciation}
            ]{" "}
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="word" onClick={() => dispatch(setLang(!lang))}>
            {filteredWords[idWord] &&
              data &&
              data.result.filter(
                (item) => item.id === filteredWords[idWord].id
              )[0].translateWord}
          </div>
        </div>
      )}
     {/*  <button onClick={() => dispatch(setLang(!lang))}>Переклад</button> */}
      <button onClick={() => addIdWord()}>Наступне слово</button>
    </div>
  );
}

export default MyWords;
