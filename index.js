const express = require("express");
const cors = require("cors");
const duckdb = require("duckdb-async");

const app = express();

// duckdb part

const dbInit = async() => { db = await duckdb.Database.create("database.duckdb", duckdb.OPEN_READWRITE); return db};
let dbd;
let con;

const initDB = async() => {
    dbd = await dbInit();
    con = await dbd.connect();
}

// app exec

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

initDB();

app.get("/", (req,res) => {
    res.send("Hello");
});

app.post("/api", (req,res) => {
    console.log(req.body)
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé à http://localhost:${PORT}`);
})