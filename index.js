const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//config
dotenv.config({path:"config/config.env"});

//controller
const Main = require("./controller/main");


var app = express();
app.use(cors());
app.use(
    bodyparser.urlencoded({
        extended: true,
        limit: '50mb'
    })
)
app.use(bodyparser.json({ limit: '50mb' }));
process.env.TZ = 'Asia/Kolkata'
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());

app.listen( process.env.PORT, () => {
    console.log(`nodejs running this ${process.env.PORT}`);
});

app.use("/api/", Main);