import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const handleImport = async () => {
    try {
      // Fetching the YouTube OAuth URL from the backend
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/youtube/auth-url`
      );

      // Redirect the user to the YouTube OAuth URL
      window.location.href = res.data.url;

      // Optionally, if you want to use navigate to go to another page after redirection, you can use:
      // navigate('/some-other-page'); (however, it won't be reached since window.location.href causes a full page reload)
    } catch (error) {
      console.error("Error fetching auth URL", error);
    }
  };

  return (
    <header>
      <h1>Blaash Application</h1>
      <button onClick={handleImport}>Import From YouTube</button>
    </header>
  );
};

export default Header;
