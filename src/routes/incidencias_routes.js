const { Router } = require("express");
const pool = require("../db");
const {
  getAllInci,
  getOneInci,
  createInci,
  deleteInci,
  editInci,
} = require("../controllers/incidencias_controller");

const router = Router();

router.get("/incidentes", getAllInci);

router.get("/incidentes/:id", getOneInci);

router.post("/incidentes", createInci);

router.delete("/incidentes/:id", deleteInci);

router.put("/incidentes/:id", editInci);

module.exports = router;
