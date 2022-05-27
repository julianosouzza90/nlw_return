import express from 'express';


const app = express();

app.get('/users', (req, res) => {
 res.send('olá mundo')
})

app.listen(3333, function(){
  console.log('Server started');
});