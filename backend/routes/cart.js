const router = require("express").Router();
const User = require("../models/user")
const {authenticateToken} = require("./userauth")

//put book to cart
router.post("/add-to-cart" , authenticateToken , async (req,res)=>{
    try{

        const {bookid , id} = req.headers;
        const userdata = await User.findById(id)
        const isbookincart = userdata.cart.includes(bookid)
        if(isbookincart){
            return res.json({
                status:"Success",
                message:"Book is already in cart"
            })
        }
        await User.findByIdAndUpdate(id,{
            $push :{cart:bookid},
        })
    
        return res.json({
            status:"Success",
            message :"Book added to cart"
        })
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//remove from cart
router.put("/remove-from-cart/:bookid" , authenticateToken , async (req,res)=>{
    try{

        const {bookid} = req.params;
        const {id} = req.headers;

        await User.findByIdAndUpdate(id,{
            $pull :{cart:bookid},
        })
    
        return res.json({
            status:"Success",
            message :"Book is removed from cart"
        })
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//get cart of particular user
router.get("/get-user-cart" , authenticateToken , async (req,res)=>{
    try{
        const {id} = req.headers;
        const userdata = await User.findById(id).populate("cart");
        const cart = userdata.cart.reverse();

        return res.json({
            status:"Success",
            data:cart
        })
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;