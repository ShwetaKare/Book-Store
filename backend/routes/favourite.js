const router = require("express").Router();
const User = require("../models/user")
const {authenticateToken} = require("./userauth")

//add book to favourites
router.put("/add-to-fav" , authenticateToken, async(req,res)=>{
    try{
        const {bookid , id} = req.headers;
        const userData = await User.findById(id)
        const isbookfav = userData.favourites.includes(bookid)
        if(isbookfav){
            return res.status(200).json({message : "Book is already in favourites"})
        }
        await User.findByIdAndUpdate(id , {$push :{favourites:bookid}})
        return res.status(200).json({message : "Book added in favourites"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//delete book from fav
router.put("/delete-from-fav" , authenticateToken, async(req,res)=>{
    try{
        const {bookid , id} = req.headers;
        const userData = await User.findById(id)
        const isbookfav = userData.favourites.includes(bookid)
        if(isbookfav){            
            await User.findByIdAndUpdate(id , {$pull :{favourites:bookid}})
        }
        return res.status(200).json({message : "Book removed from favourites"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//get favourite book of particular user
router.get("/get-fav" , authenticateToken, async(req,res)=>{
    try{
        const {bookid , id} = req.headers;
        const userData = await User.findById(id).populate("favourites")
        const favbooks = userData.favourites;
       return res.json({
        status:"Success",
        data:favbooks
       })
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports =  router;