import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("https://blog-server-zeta-tan.vercel.app/profile", {
      credentials: "include",
    }).then((response) => {
      response
        .json()
        .then((userInfo) => {
          setUserInfo(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [setUserInfo]);

  const logout = () => {
    fetch("https://blog-server-zeta-tan.vercel.app/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post </Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
