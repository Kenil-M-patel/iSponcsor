const UserObj = require('../models/user')

async function handleLogin(req , res){
    try{
        const {email , password}  = req.body;
        
        console.log(`email: ${email} & pass ${password}`);

        //check user in database 
        let user = await UserObj.findOne({email: email, password: password})
         
        if (!user) {
            return res.status(400).json({message: "user not found"})
        }

    
    // compare password from user input and database password
   
    // basic auth
        const checkPass= (Pass)=>{
            console.log(Pass);
            if(user.password === Pass){ return true } else {return false}
        }
        if(checkPass(password)){
            res.status(200).json({message: "login success"})
            console.log('logged in');
        }else{
            res.json({message: "invalid pass"})
        }



    }catch(err){
        console.log(err)
    }

}

async function handleSignin(req, res){

}

module.exports = {
    handleLogin , 
    handleSignin
}