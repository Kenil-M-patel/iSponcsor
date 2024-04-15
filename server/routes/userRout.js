const router = require("express").Router();
const { model } = require("mongoose");
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {

        const { error } = validate(req.body)
        
        if(error) return res.status(400).send(error.details[0].message)

        // find email fo user from db
        const user = await User.findOne({ email: req.body.email })

        // user user exists in db
        if(user) return res.status(400).send("User already registered")  
        
        // hash password generate salt
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // add new user in db
        await new user({...req.body , password: hashPassword}).save();
        res.status(201).send({ message: "User created successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

})

module.exports = router;