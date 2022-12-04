const express = require("express")
const cors = require("cors")
const { port } = require("./config")
const {connection} = require("./config/db");
require("dotenv").config({path: '.env'});

//Importando routes
const users = require("./routes/users")
const auth = require("./routes/auth")
const jobs = require("./routes/jobs")

connection()

const app = express()

//Middleware de JSON
app.use(cors({
    origin: [process.env.URL_FRONTEND]
}))
app.use(express.json())

//Usando routes
users(app)
auth(app)
jobs(app)


app.listen(port,()=>{
})