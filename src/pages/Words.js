import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, update, get, remove } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { setWords, setPart } from "../redux/slices/wordsSlice";
import data from "../words.json";
import SearchForm from "../components/SearchForm";

function Words() {
  const { userUid, words, part, searchWord } = useSelector(
    (state) => state.words
  );
  const dispatch = useDispatch();

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

  const writeUserData = (wordsArr) => {
    const db = getDatabase();
    const userWordsRef = ref(db, `users/${userUid}/words`);
    const wordsObj = wordsArr.reduce((acc, cur, i) => {
      if (cur) {
        acc[i] = {
          ...cur,
          dateAdded: new Date().toLocaleDateString("uk-UA"), // use current date
        };
      }
      return acc;
    }, {});
    update(userWordsRef, wordsObj);
  };

  //додавання слова
  const handleAddWord = (wordId) => {
    const currentDate = new Date().toLocaleDateString("uk-UA");

    const existingWord = words.find((w) => w.id === wordId);
    if (existingWord && existingWord.dateAdded) {
      // Використовуйте існуючу дату, якщо вона існує
      const newWord = {
        id: wordId,
        dateAdded: existingWord.dateAdded,
      };
      const updatedWords = [...words.filter((w) => w.id !== wordId), newWord];
      dispatch(setWords(updatedWords));
      writeUserData(updatedWords);
    } else {
      // Додайте нову дату, якщо це нове слово
      const newWord = {
        id: wordId,
        dateAdded: currentDate,
      };
      const updatedWords = [...words, newWord];
      dispatch(setWords(updatedWords));
      writeUserData(updatedWords);
    }
  };

  //видалення слова
  const handleDeleteWord = (wordId) => {
    const db = getDatabase();
    const userWordsRef = ref(db, `users/${userUid}/words`);
    console.log(words);
    remove(userWordsRef)
      .then(() => {
        const filteredWords = words.filter((word) => word.id !== wordId);
        dispatch(setWords(filteredWords));
        console.log(filteredWords);
        writeUserData(filteredWords);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //записуємо вибране значення частини мови
  const handleSelectChange = (event) => {
    dispatch(setPart(event.target.value)); // збереження вибраного значення у стані компонента
  };

  //фільтр масиву по пошуку і частині мови
  const filterWords = () => {
    if (part !== "" && searchWord !== "") {
      return data.result
        .filter((item) => item.englishWord.includes(searchWord.toLowerCase()))
        .filter((item) => item.partsOfSpeech === part);
    }
    if (part !== "") {
      return data.result.filter((item) => item.partsOfSpeech === part);
    }
    if (searchWord !== "") {
      return data.result.filter((item) =>
        item.englishWord.includes(searchWord.toLowerCase())
      );
    }
  };
useEffect(()=>{
filterWords();
}, [part, searchWord])

  return (
    <div>
      <SearchForm></SearchForm>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Англійське слово</th>
              <th>Переклад</th>
              <th>
                {" "}
                <div>
                  <label>Виберіть частину мови:</label>
                  <select value={part} onChange={handleSelectChange}>
                    <option value="">Оберіть</option>
                    <option value="noun">Іменник</option>
                    <option value="verb">Дієслово</option>
                    <option value="adjective">Прикметник</option>
                    <option value="adverb">Прислівник</option>
                    <option value="phrase">Фраза</option>
                    <option value="interjection">Вставні слова</option>
                  </select>
                </div>
              </th>
              <th>Вимова</th>
              <th>Додати</th>
              <th>Видалити</th>
              <th>Додано</th>
            </tr>
          </thead>
          <tbody>
            {part === "" && searchWord === ""
              ? data.result.map((word) => (
                  <tr key={word.id}>
                    <td>{word.englishWord}</td>
                    <td>{word.translateWord}</td>
                    <td>{word.partsOfSpeech}</td>
                    <td>{word.englishPronunciation}</td>
                    <td>
                      <button onClick={() => handleAddWord(word.id)}>
                        Add
                      </button>
                    </td>

                    <td>
                      <button onClick={() => handleDeleteWord(word.id)}>
                        Del
                      </button>
                    </td>
                    {words.find((w) => w.id === word.id) ? (
                      <td>&#10004;</td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))
              : filterWords() &&
                filterWords().map((word) => (
                  <tr key={word.id}>
                    <td>{word.englishWord}</td>
                    <td>{word.translateWord}</td>
                    <td>{word.partsOfSpeech}</td>
                    <td>{word.englishPronunciation}</td>
                    <td>
                      <button onClick={() => handleAddWord(word.id)}>
                        Add
                      </button>
                    </td>

                    <td>
                      <button onClick={() => handleDeleteWord(word.id)}>
                        Del
                      </button>
                    </td>
                    {words.find((w) => w.id === word.id) ? (
                      <td>&#10004;</td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Words;
