const express = require('express');

const app = express();

// index route
app.get('/', (req, res)=>{
  res.send('INDEX');
});

// about route

app.get('/about', (req, res)=>{
  res.send('ABOUT 1');
});

const port = 5000;

app.listen(port,()=>{
 console.log(`Server started on port ${port}`);
});
