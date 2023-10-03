import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import LoginIcon from "@mui/icons-material/Login";
import { Stack, Paper, Avatar, TextField, Button } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [loginObj, setLoginObj] = useState({
    userEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginObj({ ...loginObj, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/login", loginObj)
      .then((res) => {
        const response = res.data;
        if (response.success) {
          toast.success(response.msg);
        }
        setTimeout(() => {
          navigate("/");
        }, 300);
      })
      .catch((err) => {
        const res = err.response.data;
        toast.error(res.msg);
      });
    setLoginObj({
      userEmail: "",
      password: "",
    });
  };

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Stack alignItems={"center"}>
        <Paper
          elevation={10}
          style={{ textAlign: "center", width: "400px", margin: "30px" }}
        >
          <Stack alignItems={"center"} p={"40px 24px"} position={"relative"}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "blue" }}>
              <LoginIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <h1 style={{ margin: "10px 0px" }}>Login</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                margin="dense"
                fullWidth
                name="userEmail"
                type="email"
                required
                onChange={handleChange}
                value={loginObj.userEmail}
              />
              <TextField
                label="Password"
                placeholder="Enter your password"
                variant="outlined"
                margin="dense"
                fullWidth
                name="password"
                type="password"
                required
                onChange={handleChange}
                value={loginObj.password}
                autoComplete="true"
              />
              <Button
                variant="contained"
                bgcolor="blue"
                fullWidth
                style={{ marginTop: "10px" }}
                type="submit"
              >
                Login
              </Button>
            </form>
            <p style={{ marginTop: "12px" }}>
              don't have an account?<Link to={"/signup"}>Signup</Link>
            </p>
            <p>or</p>
            <p>
              <Link to={"/forget-password"}>forgot Password?</Link>
            </p>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default Login;
