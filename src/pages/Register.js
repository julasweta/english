import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//регістрація і відправлення даних на сервер
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
         // const errorCode = error.code;
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
      <h1>Register</h1>
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
  );
}

export default SignUp;
