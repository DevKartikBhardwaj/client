import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Stack, Paper, TextField, Button } from "@mui/material";

const ForgetPass = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      axios.post(`https://notes-server-86ig.onrender.com/forget-password`, {
        email,
      }),
      {
        loading: "Sending verification mail.....",
        success: <b>verification mail sent successfully!</b>,
        error: <b>Not able to sent mail!</b>,
      }
    );
    setEmail("");
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

  return (
    <>
      <Stack alignItems={"center"}>
        <Toaster position="top-center" reverseOrder={false} />
        <Paper
          elevation={10}
          style={{ textAlign: "center", width: "400px", margin: "30px" }}
        >
          <Stack alignItems={"center"} p={"40px 24px"} position={"relative"}>
            <h1 style={{ margin: "10px 0px" }}>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                margin="dense"
                fullWidth
                name="email"
                type="email"
                onChange={handleChange}
                value={email}
                required
                helperText="*check your spam folder after sending mail"
              />

              <Button
                variant="contained"
                bgcolor="blue"
                fullWidth
                style={{ marginTop: "10px" }}
                type="submit"
              >
                Verify
              </Button>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default ForgetPass;
