import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

//Авторизація і відправлення даних на сервер
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const auth = getAuth();
    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
          const userCredential = signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            navigate("/*");
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    
          console.log(userCredential.user);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div>
      <h1>Login</h1>
      <form>
      <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign up</button>
      </form>
    </div>
  )
}

export default Login
