const router = require("express").Router();
const { User }= require("../models/user");
const Joi = require("joi");
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)

        // if error get it and throw it.
        if(error) return res.status(400).send(error.details[0].message)

        // user and check it is exist in db or not
        const user = await User.findOne({   email: req.body.email  })
        if(!user) return res.status(401).send({message: "Invalid Email or Password"})

        // validate password in db with req body
        const validPassword = bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" })

        // generate tocken if validation true 
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

})

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;