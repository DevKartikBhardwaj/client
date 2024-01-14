import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Stack, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
const baseUrl = process.env.BASE_URL;
const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [passwordObject, setPasswordObject] = useState({
    newPassword: "",
    confirmNewPassword: "",
    token,
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPasswordObject({ ...passwordObject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/reset-password`, passwordObject)
      .then((res) => {
        const responseData = res.data;
        if (responseData.success) {
          toast.success(responseData.msg);

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        const data = err.response.data;
        toast.error(data.msg);
      });

    setPasswordObject({
      newPassword: "",
      confirmNewPassword: "",
    });
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
            <h1 style={{ margin: "10px 0px" }}>Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Password"
                placeholder="Enter your new password"
                variant="outlined"
                margin="dense"
                fullWidth
                name="newPassword"
                type="password"
                onChange={handleChange}
                value={passwordObject.newPassword}
                required
              />
              <TextField
                label="Confirm Password"
                placeholder="Re-enter your new password"
                variant="outlined"
                margin="dense"
                fullWidth
                name="confirmNewPassword"
                onChange={handleChange}
                value={passwordObject.confirmNewPassword}
                type="password"
                required
              />

              <Button
                variant="contained"
                bgcolor="blue"
                fullWidth
                style={{ marginTop: "10px" }}
                type="submit"
              >
                Confirm
              </Button>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default ResetPassword;
