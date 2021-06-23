import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
function SearchForm() {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleSearch = () => {
    if (search == null) return;
    let email, contact;
    if (search.includes("@")) email = search;
    else contact = search;
    axios
      .get("http://localhost:4000/api/users/", {
        params: {
          email,
          contact,
        },
      })
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setError("Not Found");
      });
  };
  return (
    <>
      <h3>Search User</h3>
      <br />
      <TextField
        size="small"
        label="Search"
        variant="outlined"
        onChange={(event) => setSearch(event.target.value)}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <br />
      {data && (
        <>
          <label>Name : {data.name}</label>
          <label>Email : {data.email}</label>
          <label>Contact : {data.contact}</label>
        </>
      )}
      {error && <label>{error}</label>}
    </>
  );
}

export default SearchForm;
