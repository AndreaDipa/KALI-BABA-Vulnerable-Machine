const express = require("express")
const bodyParser = require('body-parser')
const fileupload = require("express-fileupload");
const http = require('http')
const app = express()
app.disable('x-powered-by')
app.use( bodyParser.json() ) 
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(fileupload({ parseNested: true }));



app.get("/", (req, res) => {
    res.render('index')
})

app.listen(3000, '127.0.0.1', () => {
    console.log("app listening on port 3000")
})