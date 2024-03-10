const connectToMongo=require('./db');
var cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env.local' });


connectToMongo();

const express = require('express')
const app = express()
app.use(cors())
const port = process.env.PORT
app.use(bodyParser.json());

app.use(express.json());// req.body doesn't run without this

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/email',require('./routes/email'))

app.get('/', (req, res) => {
  res.send('Aarsh Prajapati Here!')
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})