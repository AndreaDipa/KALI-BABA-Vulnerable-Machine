const express = require("express")

const app = express()
app.disable('x-powered-by');
app.set('view engine', 'pug')

app.get("/", (req, res) => {
    res.render('index', { title: 'PND AGAINST THR MACHNE', message: 'spognardi infame' })})

app.listen(3000, '127.0.0.1', () => {
    console.log("app listening on port 3000")
})