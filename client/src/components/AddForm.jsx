import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";
function AddForm() {
  const [localState, setLocalState] = useState({
    name: "",
    email: "",
    contact: "",
  });
 
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setLocalState((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };
  const handleSubmit = async () => {
    if (!vaildate({ ...localState })) return;
    await axios
      .post("http://localhost:4000/api/users/", localState)
      .then((res) => {
        setLocalState({ name: "", email: "", contact: "" });
        alert("Saved Sucessfully");
        setError(null);
      })
      .catch((err) => {
        setError("User already registered");
      });
  };

  const vaildate = ({ name, email, contact }) => {
    let vaild = true;
    if (name.trim() == "") {
      vaild = false;
      setError("Enter Vaild Name");
    }

    if (email.trim() == "" || !email.includes("@")) {
      vaild = false;
      setError("Enter Vaild Email");
    }

    if (
      contact.trim() == "" ||
      !/^\d+$/.test(contact.trim()) ||
      contact.trim().length != 10
    ) {
      vaild = false;
      setError("Enter Vaild contact");
    }

    if (vaild == true) setError(null);
    return vaild;
  };
  return (
    <form>
      <h3>Add User</h3>
      <TextField
      
        value={localState.name}
        margin="none"
        id="name"
        size="small"
        label="Name"
        helperText="Required**"
        onChange={handleChange}
      />
      <br />
      <TextField
        value={localState.email}
        id="email"
        size="small"
        label="Email"
        margin="none"
        helperText="Required**"
        onChange={handleChange}
      />
      <br />
      <TextField
        value={localState.contact}
        id="contact"
        size="small"
        label="Contact"
        margin="none"
        helperText="Required**"
        onChange={handleChange}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add
      </Button>
      {error && <label>{error}</label>}
    </form>
  );
}

export default AddForm;
