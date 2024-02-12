const { json } = require("express");
const pool = require("../db");

const getAllInci = async (req, res, next) => {
  try {
    const AllInci = await pool.query("SELECT * FROM incidentes;");
    res.json(AllInci.rows);
  } catch (error) {
    next(error);
  }
};

const getOneInci = async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT * FROM incidentes WHERE id_incidente = $1 ",
    [id]
  );

  try {
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "No se encontraron incidencias con esos parámetros",
      });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const createInci = async (req, res, next) => {
  const {
    asunto_incidente,
    detalle_incidente,
    tipo_incidente,
    piso_incidente,
    fecha_incidente,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO incidentes(asunto_incidente, detalle_incidente, tipo_incidente, piso_incidente, fecha_incidente) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        asunto_incidente,
        detalle_incidente,
        tipo_incidente,
        piso_incidente,
        fecha_incidente,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteInci = async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM incidentes WHERE id_incidente = $1",
    [id]
  );

  try {
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "No se encontraron incidencias con esos parámetros",
      });
    res.send("Incidente eliminado");
  } catch (error) {
    next(error);
  }
};

const editInci = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      asunto_incidente,
      detalle_incidente,
      tipo_incidente,
      piso_incidente,
      fecha_incidente,
    } = req.body;

    const result = await pool.query(
      "UPDATE incidentes SET asunto_incidente = $1, detalle_incidente = $2, tipo_incidente = $3, piso_incidente = $4, fecha_incidente = $5 WHERE id_incidente = $6 RETURNING *",
      [
        asunto_incidente,
        detalle_incidente,
        tipo_incidente,
        piso_incidente,
        fecha_incidente,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No se encontró indicendicias con esos parametros",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInci,
  getOneInci,
  createInci,
  deleteInci,
  editInci,
};
