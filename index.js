const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to this is home mndka page')
})

app.listen(port, ()=>{
    console.log(`Server is running on :${port}`);
})