const router = require("express").Router();
const User = require("../models/user")
const Book = require("../models/books")
const { authenticateToken } = require("./userauth")

//adding book in db
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
      
        const { id } = req.headers;
        const user = await User.findById(id);
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            console.log("User is not admin");
            return res.status(400).json({ message: "You are not the admin" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        await book.save();       
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error processing add-book request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//updating book info
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        })

        return res.status(200).json({ message: "Book updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

//deleting book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

//get-all-books
router.get("/get-all-books",async (req,res)=>{
    try{
        const books = await Book.find().sort({crearedAt:-1})
        return res.json({
            status:"Success",
            data :books,
        })
    }catch(error){
        return res.status(500).json({ message: "Internal server error" })
    }
})

//get-recent-books
router.get("/get-recent-books",async (req,res)=>{
    try{
        const books = await Book.find().sort({crearedAt:-1}).limit(4)
        return res.json({
            status:"Success",
            data :books,
        })
    }catch(error){
        return res.status(500).json({ message: "Internal server error" })
    }
})

//get-booksbyid
router.get("/get-booksbyid/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id)
        return res.json({
            status:"Success",
            data :book,
        })
    }catch(error){
        return res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router