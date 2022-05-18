const express = require("express")
const bodyParser = require('body-parser')
const fileupload = require("express-fileupload")
const http = require('http')
const app = express()
const path = require('path')
const Joi = require('joi')
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const hash = crypto.createHash('sha512')

const cookieParser = require('cookie-parser')
const passwordComplexity = require('joi-password-complexity')
app.disable('x-powered-by')
app.use( bodyParser.json() ) 
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(fileupload({ parseNested: true }))
app.use(express.static(path.join(__dirname, 'views')));
app.use(cookieParser())
const { Pool} = require('pg')

function auth(req, res, next) {
 
  const token = req.cookies["auth"];

  if (!token) return res.status(401).render("login");
  try {
      const decoded = jwt.verify(token, "*7¡Vamos!");
      req.user = decoded;
      next();
  } catch (ex) {
      res.status(400).render("login");
  }
}

function validateUser(user) {
  const schema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      email: Joi.string().min(5).max(30).required().email(),
      password: Joi.required()
  });

  return schema.validate(user);
}
function generateAuthToken(username, is_admin) {

  const token = jwt.sign({username: username, is_admin: is_admin}, '*7¡Vamos!')
  return token
}
const pool = new Pool({
  user: 'postgres',
  database: 'api',
  password: 'password',
  port: 5432,
  host: 'localhost',
})

app.get("/", (req, res) => {
  
  res.render('index');
})


app.get("/upload", auth, (req, res) => {
  if (req.user.is_admin) res.render('upload', {username: req.user.username});
  res.send("non sei admin")
})


app.get("/about", (req, res) => {
  res.render('about');
})

app.get("/contact", (req, res) => {
  res.render('contact');
})

app.get("/login", (req, res) => {
  res.render('login');
})

app.get("/menu", (req, res) => {
  res.render('menu');
})

app.get("/register", (req, res) => {
  res.render('register');
})

app.post("/register", async (req, res) => {
  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const user = await pool.query('SELECT users.username FROM users WHERE users.username = $1', [req.body.username])
  if (user.rowCount > 0) res.status(400).send("username already exists")
  const hash = crypto.createHash('sha512')
  data = hash.update(req.body.password, 'utf-8')
  password = data.digest('hex')
  const result = await pool.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3)',
    [req.body.username, req.body.email, password])
  
  res.render("login")

})

app.post("/login", async (req, res) => {
  const hash = crypto.createHash('sha512')
  data = hash.update(req.body.password, 'utf-8')
  password = data.digest('hex')
  let user = {}
  try {
    user = await pool.query("SELECT * FROM users WHERE users.username = '" + req.body.username + "' AND users.password = '" + password +"';")
    console.log(user.rowCount)
    if (user.rowCount == 0) {
      res.send('invalid username or password')
      return
    }
    token = generateAuthToken(req.body.username, user.rows[0].is_admin)
    console.log(user.rows[0].is_admin)
    if (user.rows[0].is_admin == false)
      res.cookie('auth', token, {httpOnly: true}).render('index')
    else
      res.cookie('auth', token, {httpOnly: true}).render('upload', {username: user.rows[0].username})
  }
  catch(e) {
    res.status(500).send('internal server error')
  }
})



app.listen(5000, '127.0.0.1', () => {
    console.log("app listening on port 5000")
})