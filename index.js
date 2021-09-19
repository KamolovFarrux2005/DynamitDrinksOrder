const express = require('express');
const app = express();
require("dotenv").config();
const shopRouter = require("./routes/shop")
const  cookieParser = require('cookie-parser');


const mongoose = require("mongoose");

mongoose.connect(process.env.Mongo, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{console.log("mongo")}).catch((err)=>{console.error(err)})

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use('/', shopRouter);
app.use('/admin', require("./routes/admin"));;


app.use((req,res,next) =>{
     res.redirect('/');
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port`);
});
