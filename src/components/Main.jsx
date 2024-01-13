import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
// import { FaceIcon } from "@material-ui/icons";

import NotesCard from "./NotesCard";
import manipContext from "../Contexts/ManipContext";
const Main = () => {
  const { manipValue } = useContext(manipContext);
  const [loginStatus, setLoginStatus] = useState(Cookies.get("auth_token"));
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [submit, setSubmit] = useState(0);
  const [notesData, setNotesData] = useState({
    title: "",
    description: "",
    tag: "",
  });
  useEffect(() => {
    const fetchNotes = () => {
      axios
        .get("/fetch-notes")
        .then((res) => {
          setFetchedNotes(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
          setFetchedNotes([]);
          setLoginStatus(false);
        });
    };
    fetchNotes();
  }, [submit, manipValue]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNotesData({ ...notesData, [name]: value });
  };

  const handleSubmit = (e) => {
    setSubmit(submit + 1);
    e.preventDefault();
    axios.post("/create-note", notesData).catch((err) => {
      console.log(err.message);
    });

    setNotesData({
      title: "",
      description: "",
      tag: "",
    });
  };

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Box
        position={"absolute"}
        top={"60px"}
        padding={"50px 0px"}
        sx={{ textAlign: "Center" }}
        width={"100%"}
      >
        <Typography variant="h3">Draft a note</Typography>
        <Box
          component={"form"}
          fullWidth
          sx={{ padding: { xs: "0 20px", lg: "0 200px" } }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ margin: "10px 0" }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            onChange={handleChange}
            value={notesData.title}
            fullWidth
            required
          />
          <TextField
            sx={{ margin: "10px 0" }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            name="description"
            onChange={handleChange}
            value={notesData.description}
            fullWidth
            required
          />
          <TextField
            sx={{ margin: "10px 0" }}
            id="outlined-basic"
            label="Tag"
            variant="outlined"
            name="tag"
            onChange={handleChange}
            value={notesData.tag}
            fullWidth
            required
          />
          <Button
            variant="contained"
            fullWidth
            disabled={loginStatus ? false : true}
            type="submit"
          >
            Add Note
          </Button>
        </Box>

        {/* ************************************************ */}
        <h2 style={{ margin: "50px 0" }}>Your Notes</h2>
        <Stack
          sx={{
            margin: { xs: "0 20px", lg: "0 200px" },
            justifyContent: "center",
          }}
          flexWrap={"wrap"}
          flexDirection={"row"}
        >
          {fetchedNotes.map((element, i) => {
            return (
              <NotesCard
                title={element.title}
                description={element.description}
                id={element._id}
                created={element.createdAt}
                updated={element.updatedAt}
                key={i}
              />
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Main;
