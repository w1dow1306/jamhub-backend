console.clear();
// importing express and mongoose
const express = require("express"); // imprting express
const config = require("./config/server-config.json"); //importing configs
const cookieparser = require('cookie-parser');
const cors = require("cors"); //importing cors

// config
const app = express();
const PORT = config.server.port;
const HOST = config.server.host;

// using middlewears
app.use(cookieparser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers

//importing rouetes
const { USERroutes, TODOSroutes } = require("./routes/routes.js");

//USING ROUTES

app.use("/user", USERroutes); // user routes [signup,login,adduser]
app.use("/todos", TODOSroutes); // todo routes [addtodo , deletedtodo,]

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
