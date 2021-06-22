const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb+srv://Rohit123:Rohit123@cluster0.oxzda.mongodb.net/rohit?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.info(`Connected to monogDB...`));
};
