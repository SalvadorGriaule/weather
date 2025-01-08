const express = require("express");
const cors = require("cors");
const syncdb = require("duckdb");
const app = express();

// duckdb part

const dbSync = new syncdb.Database("database.duckdb")
const conSyn = dbSync.connect();
let dbd;
let con;

// app exec

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//initDB();

conSyn.all('SHOW TABLES', (err , result) => {
    if (err) {
        console.warn(err);
    } else {
        if (result.length == 0 ){
            conSyn.all('CREATE SEQUENCE data_id_ai',(err, result) => {
                if(err) {
                    console.warn(err);
                } else {
                    conSyn.all('CREATE TABLE Weather (id INTEGER PRIMARY KEY, position JSON, weather JSON, time STRING)',(err,result) => {
                        if (err) console.warn(err);
                    })
                }
            })
        }
    }
})

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get('/history', (req, res) => {
    let history = dbSync.all('SELECT * FROM Weather', (err, result) => {
        if (err) {
            console.warn(err);
        } else {
            res.send(result);
        }
    })

})

app.post("/api", (req, res) => {
    data = req.body
    let positionData = JSON.stringify(data.position);
    let weatherData = JSON.stringify(data.weather);
    const stmt = conSyn.prepare("INSERT INTO Weather VALUES(nextval('data_id_ai'), ?::JSON, ?::JSON , ?::STRING)", (err, res) => {
        if (err) {
            console.warn(err);
        } 
    })
    stmt.run(positionData, weatherData, data.create_at, (err, res) => {
        if (err) {
            console.warn(err);
        } 
    });
    stmt.finalize();
   
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé à http://localhost:${PORT}`);
})