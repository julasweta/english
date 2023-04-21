import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLang, setIdWord } from "../redux/slices/wordsSlice";
import { getDatabase, ref, get } from "firebase/database";
import { setWords } from "../redux/slices/wordsSlice";
import data from "../words.json";
import moment from "moment";

function MyWords() {
  const dispatch = useDispatch();
  const { lang, idWord, words, userUid } = useSelector((state) => state.words);
  const [selectedDate, setSelectedDate] = useState("");
  const filteredWords = words.filter((word) => word.dateAdded === selectedDate);

  useEffect(() => {
    const db = getDatabase();
    const userWordsRef = ref(db, `users/${userUid}/words`);
    get(userWordsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const wordsData = snapshot.val();
        if (Array.isArray(wordsData)) {
          dispatch(setWords(wordsData));
        }
      }
    });
  }, [userUid, dispatch]);

  const filteredData = () => {
    return data.result.filter(obj => {
      return filteredWords.some(item => item.id === obj.id);
    });
  };

  useEffect(() => {
    filteredData();
  }, [selectedDate]);



  const addIdWord = () => {
    if (idWord < filteredWords.length - 1) {
      dispatch(setIdWord(idWord + 1));
    } else {
      dispatch(setIdWord(0));
    }
  };

  const handleChangeDate = (event) => {
    const date = new Date(event.target.value);
    const formattedDate = `${
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    }.${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }.${date.getFullYear()}`;
    setSelectedDate(formattedDate);
  };

  //7 днів тому
  const date1 = moment(selectedDate, "DD.MM.YYYY")
    .subtract(1, "days")
    .format("DD.MM.YYYY");
  const date7 = moment(selectedDate, "DD.MM.YYYY")
    .subtract(7, "days")
    .format("DD.MM.YYYY");
  const date30 = moment(selectedDate, "DD.MM.YYYY")
    .subtract(1, "month")
    .format("DD.MM.YYYY");

console.log(idWord);

  return (
    <div className="my-words">
      <h1>Вивчення слів</h1>
      <div>
        <label htmlFor="date">
          Вибери дату додавання слів у свій набір слів, <br></br>це корисно для
          вивчення слів інтервальним методом.<br></br> Наприклад, якщо ви вчите
          нові слова, то їх слід повторити кілька разів протягом одного заняття,{" "}
          <br></br>потім повторити на наступний день. Потім ще раз через тиждень
          і, нарешті, закріпити матеріал через місяць.{" "}
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate.split(".").reverse().join("-")}
          onChange={handleChangeDate}
        />
        {selectedDate && (
          <div>
            <b>Рекомендовані дати для повторення</b>
            <div>Selected date: {selectedDate}</div>
            <div>1 день тому: {date1}</div>
            <div>7 днів тому: {date7}</div>
            <div>місяць тому: {date30}</div>
          </div>
        )}
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
          <div className="trans">
            [{" "}
            {filteredWords[idWord] &&
              data &&
              data.result.filter(
                (item) => item.id === filteredWords[idWord].id
              )[0].uaPronunciation}
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
      <div className="list-words">
       {filteredData() && filteredData().map(item=>(<span className={item.id === filteredWords[idWord].id ? 'active' : ''} key={item.id}>{item.englishWord}</span>))}
      </div>
    </div>
  );
}

export default MyWords;
