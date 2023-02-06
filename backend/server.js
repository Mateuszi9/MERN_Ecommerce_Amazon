import express from 'express';
import data from './data.js';

const app = express(); //create express object - app

app.get('/api/products', (req, res) => {
  res.send(data.products); //sending data to the frontend
}); //method app.get (URL, function respond to api)

//define port to respond
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
}); //server starts and it's ready to responds (port, call back function)
