const express = require('express');
const app = express.Router();

const con = require("./db");
const db = con.db;


app.get("/api/get-vibrate", (req, res) => {
    // const { limit } = req.body;
    const limit = 4000;

    const sql = `SELECT * FROM (SELECT TO_CHAR(ts, 'YYYY-MM-DD HH:MM:SS') as dt,  * 
        FROM vibratexml ORDER BY ts desc LIMIT ${limit}) as aa
        ORDER BY aa.dt asc`;

    db.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;