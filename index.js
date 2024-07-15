const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors');

const basicRoute = require('./routes/basicRoute');
const userRoute = require('./routes/userRoute');
const { isAuthenticated } = require('./middleware/authentication');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
      return res.send(200);
    } else {
      return next();
    }
  });



app.use('/',basicRoute);

app.use(isAuthenticated)
app.use('/user',userRoute);


app.listen(5444,()=>{
    console.log(`Server is running on port : ${5444}`)
})