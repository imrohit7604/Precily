const express = require("express");
const app = express();

var cors = require("cors");
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use(cors());
require("./startup/routes")(app);
require("./startup/db")();

const port = 4000;
app.listen(port, () => console.info(`Listening on port ${port}...`));
