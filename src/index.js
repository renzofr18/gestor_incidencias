const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const taskRoutes = require("./routes/incidencias_routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(taskRoutes);

app.use((error, req, res, next) => {
  return res.json({
    message: error.message,
  });
});

app.listen(3000);
console.log("Servidor en el puerto 3000");
