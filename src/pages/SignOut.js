import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//вихід з системи
function SignOut() {
  const navigate = useNavigate();

  const auth = getAuth();
  const out = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h4>Підтердіть вихід</h4>
      <button onClick={() => out()}>Вийти</button>
    </div>
  );
}

export default SignOut;
