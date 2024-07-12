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

app.use('/',basicRoute);

app.use(isAuthenticated)
app.use('/user',userRoute);


app.listen(5444,()=>{
    console.log(`Server is running on port : ${5444}`)
})