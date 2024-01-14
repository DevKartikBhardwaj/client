import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Tabs, Tab, Button, Avatar } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Cookies from "js-cookie";
import manipContext from "../Contexts/ManipContext";
import axios from "axios";
const baseUrl = process.env.BASE_URL;
const Header = () => {
  let { manipValue, setManipValue } = useContext(manipContext);
  const [loginStatus, setLoginStatus] = useState(Cookies.get("auth_token"));
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/getUser`);
        setUserName(data.userName);
      } catch (error) {
        console.log(error);
        setUserName("");
      }
    };
    fetchUser();
  }, [userName]);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    setLoginStatus("");
    setManipValue(++manipValue);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    let childrenString = "";
    name.split(" ").forEach((element) => {
      childrenString += element[0];
    });

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: childrenString,
    };
  }

  return (
    <AppBar sx={{ backgroundColor: "#2866a4" }}>
      <Toolbar>
        <TextSnippetIcon fontSize="large" sx={{ cursor: "pointer" }} />
        <Tabs
          sx={{ marginLeft: "60px", display: { xs: "none", md: "block" } }}
          value={0}
        >
          <Tab sx={{ color: "white" }} label="Home" />
          <Tab sx={{ color: "white" }} label="About" />
          <Tab sx={{ color: "white" }} label="Services" />
          <Tab sx={{ color: "white" }} label="Blogs" />
          <Tab sx={{ color: "white" }} label="Contact" />
        </Tabs>

        {loginStatus ? (
          <>
            <Button
              variant="contained"
              sx={{ marginLeft: "auto", marginRight: "10px" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            {userName !== "" ? <Avatar {...stringAvatar(userName)} /> : <></>}
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              style={{ marginLeft: "auto", textDecoration: "none" }}
            >
              <Button variant="contained">Login</Button>
            </Link>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ margin: "10px" }}>
                Signup
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
