const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const signinRouter = require("./Routes/signin");
const loginRouter = require("./Routes/login");
const homeRouter = require("./Routes/home");

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/signin", signinRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
