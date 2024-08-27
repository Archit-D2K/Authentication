const jwt = require("jsonwebtoken")
const usermodel = require("../models/Users")

const bcrypt = require("bcrypt")
const signup = async (req,res) => {
        try{
            const {name,email,password} = req.body;
            const user = await usermodel.findOne({email});
            if(user){
                return res.status(400)
                .json({message:"user already exists",success:false})
                
            }

            const userModel = new usermodel({name,email,password});
            userModel.password = await bcrypt.hash(password,10)
            await userModel.save()
            return res.status(201)
                .json({message:"signup successfully",success:true})

        }
        catch(error){
           res.status(500)
                .json({message:"internal server error",success:false})

        }
}

const errormsg ="Auth failed email or password is wrong"

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await usermodel.findOne({email});
        if(!user){
            return res.status(403)
            .json({message:errormsg,success:false})
            
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(403)
            .json({message:errormsg, success:false})

        }
        const jwtToken = jwt.sign({email:user.email,id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"24h"
        })
        return res.status(200)
            .json({message:"login succuess",success:true
                ,jwtToken,email,name:user.name
            })

    }
    catch(error){
       res.status(500)
            .json({message:"internal server error",success:false})

    }
}



module.exports = {signup,login}