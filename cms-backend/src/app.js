const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.send("CMS API RUNNING");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/artifacts", require("./routes/artifact.routes"));



module.exports = app;