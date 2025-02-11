const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/connection");
const cors = require("cors")

// Import routes
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const favourites = require("./routes/favourite")
const cart = require("./routes/cart")
const Order = require("./routes/order")
app.use(cors())

// Use routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", Order);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});
