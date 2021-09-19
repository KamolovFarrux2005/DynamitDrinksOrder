const router = require("express").Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Agent = require('../model/agent');
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const verify = require('../verifytoken');
router.get('/', verify, async(req, res) => {
    try{
      await Product.find().then(result =>{
            res.render('home', {result});
        }).catch((err)=>{
            console.log(err)
        })
    }catch(err){
        throw new Error(err)
    }
});


router.get('/register', (req, res) => {
    try{
        res.render("agentReg");
    }catch(err){
        throw new Error(err)
    }
});
router.post('/register', async(req, res) => {
    try{
        const register = new Agent({
            agentName: req.body.agentname,
            agentNumber: req.body.agentnumber
        });
       await register.save();
        return res.redirect('/login');
    }catch(err){
        throw new Error(err)
    }
});

router.get('/login', (req, res)=>{
    try{
        res.render('login');
    }catch(err){
        throw new Error(err)
    }
});
router.post('/login', async(req, res) => {
    try{
        const number = await Agent.findOne({agentNumber: req.body.agentNumber})
        const token = jwt.sign({id: number._id}, process.env.jwtSecret,{expiresIn: '1h'})
        res.cookie("token",token,{
          httpOnly: true
        })
       
       return  res.redirect('/');
    }catch(err){
        throw new Error(err)
    }
});
router.get('/order/:id', verify, async(req, res) => {
    try{
        const userID = req.user.id;
        console.log(userID)
        const productID = req.params.id;
        const orderSave = new Order({
            AgentId: userID,
            ProductId: productID,
            QTY: req.query.qty,
            location: req.query.location
        });

        await  orderSave.save();
        return  res.redirect('/');
    }catch(err){
        throw new Error(err)
    }
});

module.exports = router;