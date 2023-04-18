import React from 'react';
import data from '../words.json';



function WordsComponents({ writeUserData}) {

   
  return (
    <div>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Англійське слово</th>
          <th>Переклад</th>
          <th>Частка мови</th>
          <th>Вимова</th>
        </tr>
      </thead>
      <tbody>
        {data.result.map((word) => (
          <tr key={word.id}>
            <td>{word.id}</td>
            <td>{word.englishWord}</td>
            <td>{word.translateWord}</td>
            <td>{word.partsOfSpeech}</td>
            <td>{word.englishPronunciation}</td>
            <td>
                <button onClick={() =>writeUserData(word.id)}>Додати слово</button>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default WordsComponents
