

const Joi = require('joi');
const signupvalidation = (req,res,next) =>{

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
const loginvalidation = (req,res,next) =>{


    const schema = Joi.object({
       
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message : "bad request" ,error});
        
    }
    next();
    }

    module.exports = {
        signupvalidation,loginvalidation
    }