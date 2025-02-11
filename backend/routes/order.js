const router = require("express").Router();
const Book = require("../models/books")
const Order = require("../models/orders")
const User = require("../models/user")
const { authenticateToken } = require("./userauth")

//place order from cart
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderdata of order) {
            const neworder = new Order({ user: id, book: orderdata._id })
            const orderdatafromdb = await neworder.save();
            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderdatafromdb._id },
            })
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderdata._id },
            })
        }
        return res.json({
            status: "Success",
            message: "Order Placed Successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

//get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        })

        const ordersdata = userdata.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersdata
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

//get all orders --admin
router.get("/get-all-history", authenticateToken, async (req, res) => {
    try {
        const cart = await Order.find().populate({
            path: "book",
        }).populate({
            path: "user",
        }).sort({ createdAt: -1 });

        return res.json({
            status: "Success",
            data: cart
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

//update orders --admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
       const {id} = req.params
       await Order.findByIdAndUpdate(id , {status:req.body.status})
        return res.json({
            status: "Success",
            message: "Status updated successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})


module.exports = router
