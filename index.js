const express = require("express")
const bodyParser = require('body-parser')
const app = express()
app.disable('x-powered-by')
app.use( bodyParser.json() ) 
app.use(bodyParser.urlencoded({ extended: false }))



app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000, '127.0.0.1', () => {
    console.log("app listening on port 3000")
})