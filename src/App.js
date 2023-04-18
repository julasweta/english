import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Words from "./pages/Words";
import SignOut from "./pages/SignOut";
import { useDispatch } from 'react-redux';
import { isAuth } from "./redux/slices/wordsSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MyWords from "./pages/MyWords";




function App() {
  const dispatch = useDispatch()
  //перевірка даних входу користувача
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //console.log(user);
      const uid = user.uid;
      // Записати дані у локальне сховище
      dispatch(isAuth(uid))
    } else {
      console.log("NOT ENTER");
      dispatch(isAuth('none'))
    }
  });

  return (
    <div className="App">
      <HashRouter>
      <Header></Header>
        <Routes>
          <Route exact path="/*" element={<Words />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/out" element={<SignOut />} />
          <Route path="/myword" element={<MyWords />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
