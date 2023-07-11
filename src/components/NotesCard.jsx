import React, { useContext, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import manipContext from "../Contexts/ManipContext";

const NotesCard = ({ title, description, id, created, updated }) => {
  let createdDateStamp = new Date(created).toDateString();
  let createdTimeStamp = new Date(created).toTimeString().slice(0, 8);
  let updatedDateStamp = new Date(updated).toDateString();
  let updatedTimeStamp = new Date(updated).toTimeString().slice(0, 8);
  const [open, setOpen] = useState(false);
  let { manipValue, setManipValue } = useContext(manipContext);

  const [updateNotes, setUpdatedNotes] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedNotes({ ...updateNotes, [name]: value });
  };

  const handleDelete = (id) => {
    axios
      .delete(`delete-note/${id}`)
      .then((res) => {
        toast.success(res.data.msg);
        setManipValue(++manipValue);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const updateNote = (id) => {
    setOpen(false);
    axios
      .put(`/update-note/${id}`, updateNotes)
      .then((res) => {
        toast.success(res.data.msg);
        setManipValue(++manipValue);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
    setUpdatedNotes({ title: "", description: "", tag: "" });
  };

  return (
    <Card
      sx={{
        width: 345,
        minHeight: 345,
        margin: "0 20px 20px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: "flex-end" }}>
        <span
          style={{
            marginRight: "10px",
            fontWeight: "500",
            fontSize: "10px",
          }}
        >
          {createdTimeStamp} {createdDateStamp}
        </span>
        <span
          style={{
            marginRight: "68px",
            fontWeight: "500",
            fontSize: "10px",
          }}
        >
          {updatedTimeStamp} {updatedDateStamp}
        </span>
        <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => handleDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>

      {/* dialog for updating notes */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Notes</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            name="title"
            onChange={handleChange}
            value={updateNotes.title}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            multiline
            fullWidth
            name="description"
            variant="standard"
            onChange={handleChange}
            value={updateNotes.description}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag"
            type="text"
            fullWidth
            variant="standard"
            name="tag"
            onChange={handleChange}
            value={updateNotes.tag}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateNote(id)}>Update</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default NotesCard;
