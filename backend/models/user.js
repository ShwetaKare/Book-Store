const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/9187/9187532.png"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "orders",
    }]
},
    { timestamps: true },
)
module.exports= mongoose.model("user",user)