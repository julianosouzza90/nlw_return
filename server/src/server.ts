import express from 'express';

import cors from 'cors';


import {routes} from './routes';

const app = express();

app.use(cors({
  origin: '*',
}));   
app.use(express.json() );
app.use(routes);



app.listen(3334, function(){
  console.log('Server started on port 3333');
});