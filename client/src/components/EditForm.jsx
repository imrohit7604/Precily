import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";

function EditForm() {
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
      .put("http://localhost:4000/api/users/", localState)
      .then((res) => {
        setLocalState({ name: "", email: "", contact: "" });
        alert("Updated Sucessfully");
        setError(null);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status == "404") setError("User Not found");
        if (err.response.status == "400")
          setError("Given Contact is Already Registered");
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
      <h3>Edit User</h3>
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
        Update
      </Button>
      {error && <label>{error}</label>}
    </form>
  );
}

export default EditForm;
