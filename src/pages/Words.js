import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { getDatabase, ref, update, get, remove } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { setWords } from '../redux/slices/wordsSlice';
import data from "../words.json";

function Words() {
  const { userUid, words } = useSelector((state) => state.words);
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
        acc[i] = cur;
      }
      return acc;
    }, {});
    update(userWordsRef, wordsObj);
  };

  const handleAddWord = (wordId) => {
    const currentDate = new Date().toISOString().slice(0, 10); 
    if (words.find((w) => w.id === wordId)) {
      alert('This word has already been added.');
    } else {
      const newWord = {
        id: wordId,
        dateAdded: currentDate, 
      };
      const updatedWords = [...words, newWord];
      dispatch(setWords(updatedWords));
      writeUserData(updatedWords); 
    }
  };

  const handleDeleteWord = (wordId) => {
    console.log(wordId);
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
 

  return (
    <div>
      <div  className="table">
       
        <table>
          <thead>
            <tr>
              <th>Англійське слово</th>
              <th>Переклад</th>
              <th>Частина мови</th>
              <th>Вимова</th>
              <th>Додати</th>
              <th>Видалити</th>
              <th>Додано</th>
            </tr>
          </thead>
          <tbody>
            {data.result.map((word) => (
              <tr key={word.id}>
                <td>{word.englishWord}</td>
                <td>{word.translateWord}</td>
                <td>{word.partsOfSpeech}</td>
                <td>{word.englishPronunciation}</td>
                <td>
                  <button onClick={() => handleAddWord(word.id)}>Додати слово</button>
                </td>
                
                <td>
            <button onClick={() => handleDeleteWord(word.id)}>Delete</button>
         </td>
         { words.find((w) => w.id === word.id) ? <td>&#10004;</td> : <td></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Words;







