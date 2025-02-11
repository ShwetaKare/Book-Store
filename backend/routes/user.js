const router = require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {authenticateToken}=require("./userauth")

//sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        //check usrname length is more than 4
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" })
        }

        //check username already exists
        const exisitinguser = await User.findOne({ username: username });
        if (exisitinguser) {
            return res.status(400).json({ message: "Username already exists" })
        }

        //check email already exists
        const exisitingemail = await User.findOne({ email: email });
        if (exisitingemail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        //check password length greater than 6
        if (password.length <= 5) {
            return res.status(400).json({ message: "Password's length should be greater than 5" })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const newuser = new User({ username: username, email: email, password: hashpass, address: address })
        await newuser.save()
        return res.status(200).json({ message: "Signed up successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

//sign in
router.post("/sign-in", async (req, res) => {
    console.log("Raw body:", req.body);  // Log raw body
    try {
        const { username, password } = req.body;
        console.log("Parsed body:", { username, password });  // Log parsed fields to confirm structure
        const existinguser = await User.findOne({ username });
        if (!existinguser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        await bcrypt.compare(password, existinguser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existinguser.username },
                    { role: existinguser.role },
                ];
                const token = jwt.sign({ authClaims }, "bookstore123", { expiresIn: "30d" });
                return res.status(200).json({ id: existinguser._id, role: existinguser.role, token: token });
            } else {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
        });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get user info
router.get("/get-user-information" ,authenticateToken, async (req,res) =>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select("-password")
        return res.status(200).json(data)

    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//update address
router.put("/update-address" , authenticateToken,async(req,res)=>{
    try{
        const{id} = req.headers
        const {address} = req.body
        await User.findByIdAndUpdate(id , {address:address})
        return res.status(200).json({message:"Address updated successfully"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;