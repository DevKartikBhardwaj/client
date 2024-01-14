import React, { useState } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Paper,
  Avatar,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
const baseUrl = process.env.BASE_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [testing, setTesting] = useState("");
  const [otpVal, setOtpVal] = useState("");
  const [otpInput, setOtpInput] = useState("none");
  const [otpButton, setOtpButton] = useState("block");
  const [verifyButton, setVerifyButton] = useState("none");
  const [submitButton, setSubmitButton] = useState("none");
  const [passInputs, setPassInputs] = useState("none");
  const [progress, setProgress] = useState("none");
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleChangeInOtp = (e) => {
    setOtpVal(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/signup`, userInfo)
      .then((res) => {
        const data = res.data;
        if (data.success) {
          toast.success(data.msg);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else if (data.err) {
          const errObjectsArray = data.err;
          errObjectsArray.map((element) => {
            toast.error(element.msg);
            return element;
          });
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => console.log(err));
    setUserInfo({
      userName: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
    });
  };

  //TESING SPACE
  const sendOtp = () => {
    setProgress("inline-block");
    let otp = "";
    let email = userInfo.userEmail;
    while (otp < 1000) {
      otp = Math.ceil(Math.random() * 10000).toString();
    }
    setTesting(otp);
    axios
      .post(`${baseUrl}/verifyOtp`, { email, otp })
      .then((res) => {
        const { success, msg } = res.data;
        if (success) {
          toast.success(msg);
          setOtpInput("block");
          setOtpButton("none");
          setVerifyButton("block");
          setProgress("none");
        }
      })
      .catch((err) => {
        setProgress("none");
        toast.error("User already exists");
      });
  };

  const verifyOtp = () => {
    if (otpVal === testing) {
      setOtpInput("none");
      setPassInputs("block");
      setVerifyButton("none");
      setSubmitButton("block");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <Stack alignItems={"center"}>
        <Paper
          elevation={10}
          style={{ textAlign: "center", width: "400px", margin: "30px" }}
        >
          <Stack alignItems={"center"} p={"40px 24px"}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "blue" }}>
              <HowToRegIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <h1 style={{ margin: "10px 0px" }}>Signup</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                placeholder="Enter your name"
                variant="outlined"
                margin="dense"
                fullWidth
                name="userName"
                required
                value={userInfo.userName}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                margin="dense"
                fullWidth
                name="userEmail"
                type="email"
                required
                value={userInfo.userEmail}
                onChange={handleChange}
                helperText="**check spam folder for OTP"
              />
              <TextField
                label="OTP"
                placeholder="Enter OTP here"
                variant="outlined"
                margin="dense"
                fullWidth
                required
                type="number"
                onChange={handleChangeInOtp}
                value={otpVal}
                sx={{ display: otpInput }}
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
                value={userInfo.password}
                onChange={handleChange}
                sx={{ display: passInputs }}
              />
              <TextField
                label="Confirm Password"
                placeholder="Confirm your password"
                variant="outlined"
                margin="dense"
                fullWidth
                name="confirmPassword"
                type="password"
                required
                value={userInfo.confirmPassword}
                onChange={handleChange}
                sx={{ display: passInputs }}
              />
              <Button
                variant="contained"
                bgcolor="blue"
                fullWidth
                style={{ marginTop: "10px" }}
                onClick={sendOtp}
                sx={{ display: otpButton }}
              >
                Send OTP{" "}
                <CircularProgress
                  sx={{ color: "white", display: progress }}
                  size={15}
                  thickness={6}
                />
              </Button>
              <Button
                variant="contained"
                bgcolor="blue"
                fullWidth
                style={{ marginTop: "10px" }}
                onClick={verifyOtp}
                sx={{ display: verifyButton }}
              >
                verify OTP
              </Button>
              <Button
                variant="contained"
                bgcolor="blue"
                fullWidth
                style={{ marginTop: "10px" }}
                type="submit"
                sx={{ display: submitButton }}
              >
                Signup
              </Button>
            </form>
            <p style={{ marginTop: "12px" }}>
              already have an account?<Link to={"/login"}>Login</Link>
            </p>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default Signup;
