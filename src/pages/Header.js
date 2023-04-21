import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { userUid } = useSelector((state) => state.words);

  return (
    <div>
      <header>
        {userUid === "none" ? (
          <div className="header">
            <Link to="/words">All Words</Link>

           
            <Link to="/login">
              <input type="button" value="login" />
            </Link>
            <Link to="/register">
              <input type="button" value="register" />
            </Link>
          </div>
        ) : (
          <div className="header">
            <Link to="/words">All Words</Link>

            <Link to="/myword">My Words</Link>
            <Link to="/out">
              <input type="button" value="out" />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
