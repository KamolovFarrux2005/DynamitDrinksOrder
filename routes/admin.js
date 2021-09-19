const express = require("express")
const router = express.Router();
const Product = require("../model/product");
const Agent = require("../model/agent");
const Order = require("../model/order");

router.get('/', async(req, res) => {
    try{
       await Order.find({}).populate("AgentId").populate("ProductId").then(result =>{
            res.render("admin", {result});
        }).catch(err => {
             res.redirect('/')
        })
    }catch(err){
        throw new Error(err)
    }
}); 

router.post('/post', async(req, res) => {
    try{
       const Newproduct = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image
        })
        Newproduct.save().then(()=>{
             res.redirect('/admin');
        }).catch((err)=>{
            console.log(err)
        })
        console.log(req.user)
    }catch(err){
        throw new Error(err)
    }
});

router.get('/delete/:id', async(req, res) => {
    try{
    await Order.findByIdAndDelete(req.params.id)
    .then(()=>{
             res.redirect('/admin');
    })
    .catch((err)=>{
         res.redirect('/admin');
    })
}catch(err){
    throw new Error(err)
}

});

module.exports = router