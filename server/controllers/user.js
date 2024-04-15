const User = require('../models/user')


async function handleGetAllUsers(req ,res){
    const allUsers = await User.find()
    return res.json(allUsers)
}

async function handleGetUserbyId(req ,res){
    const id = req.params.id
    const user = await User.findById(id)
    if(!user) return res.status(404).json({message: "user not found"})
    return res.json(user)
}

async function handleUpdateUserbyID(req ,res){
    const id = req.params.id
    await User.findByIdAndUpdate(id,{ LasttName: "changed"})
    return res.json({message: "user updated"})
}

async function handleDelet(req ,res) {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    return res.json({message: "user deleted"})    
}

async function handleCreateUser(req ,res) {
    const body = req.body
    console.log(body)

    try {
        const result = await User.create({
            firstName: body.firstName,
            LasttName:  body.LasttName,
            email:  body.email,
            password: body.password,
            location: {
                country:  body.location.country,
                city:  body.location.city
            }
        })
        return res.status(201).json({message: "user created" , id: result._id})
    }catch (err){
        console.log(err)
    }
    
}


module.exports ={
    handleGetAllUsers,
    handleGetUserbyId,
    handleUpdateUserbyID,
    handleDelet,
    handleCreateUser,
}