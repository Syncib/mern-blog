import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    // Fetch the profile information from the backend
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://blog-server-zeta-tan.vercel.app/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchProfile();
  }, [setUserInfo]);

  const logout = async () => {
    try {
      const response = await fetch("https://blog-server-zeta-tan.vercel.app/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      setUserInfo(null); // Clear the user info from context
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a href="#!" onClick={logout}>Logout</a>
          </>
        ) : (
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
