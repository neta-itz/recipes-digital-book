const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./Routes/Users/userRouter");
const recipesRouter = require("./Routes/Cards/recipesRouter");

require("./middlewares/connectToDb");

const app = express();

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`))
);
