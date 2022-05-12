const express = require("express")

const app = express()
app.disable('x-powered-by');
app.get("/", (req, res) => {
    res.send("Hello Worl")
})

app.listen(3000, '127.0.0.1', () => {
    console.log("app listening on port 3000")
})