import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchWord  } from '../redux/slices/wordsSlice';

function SearchBox() {
    const { searchWord} = useSelector((state) => state.words);
    const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setSearchWord (event.target.value));
  };

  return (
    <div>
      <input
        type="text"
        value={searchWord}
        onChange={handleChange}
        placeholder="Enter your search term..."
      />
      
    </div>
  );
}

export default SearchBox;
