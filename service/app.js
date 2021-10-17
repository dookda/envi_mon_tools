const express = require('express');
const app = express.Router();

const con = require("./db");
const db = con.db;


app.post("/api/getvibrate", (req, res) => {
    const { start, end } = req.body;
    const limit = 4000;

    const sql = `SELECT TO_CHAR(ts, 'YYYY-MM-DD HH24:MI:SS') as dt, * FROM (
        SELECT ts, avg(tranppv) as tranppv, 
                avg(vertppv) as vertppv, 
                avg(longppv) as longppv
            FROM vibratexml 
            WHERE ts BETWEEN '${start}' AND '${end}'
            GROUP BY ts
            ORDER BY ts desc 
    ) as aa
    ORDER BY aa.ts asc`;

    db.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/api/getmax", (req, res) => {
    const { param, start, end } = req.body;
    let sql = `SELECT TO_CHAR(ts, 'YYYY-MM-DD HH24:MI:SS') as dt,* FROM vibratexml
    WHERE ${param}= (SELECT max(${param}) 
        FROM vibratexml
        WHERE ts BETWEEN '${start}' AND '${end}')
    AND ts BETWEEN '${start}' AND '${end}'`

    // console.log(sql);

    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

app.post("/api/getlast", (req, res) => {
    const { param, start, end } = req.body;
    let sql = `SELECT TO_CHAR(ts, 'YYYY-MM-DD HH24:MI:SS') as dt,* 
                FROM vibratexml 
                WHERE ts = (SELECT(MAX(ts)) FROM vibratexml)`

    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
})

module.exports = app;