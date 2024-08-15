const UserModel =require('../models/users')
const bcrypt= require('bcrypt');

const jwt = require('jsonwebtoken')


const userAccountCreation=async (req,res)=>{
    try{
        const {email}=req.body
        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message:'Email already exists,please login',
                error:'Email already exists please login'
                })
        }
         else{
            // store hashed password 
            const {password}=req.body;
            const hashedPassword=await bcrypt.hash(password,10)
            const userAccount= await UserModel.create({...req.body,password:hashedPassword})

           res.status(201).json({
            message:"User Account created successfully..",
            user:userAccount
         })
         }
      
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
}

// get all users form the server
const getAllUsers=async (req,res)=>{
    try{
     const totalUsers= await UserModel.find();
     res.status(200).json({
        message:"user data fetched successfully",
        userCount:totalUsers.length,
        userData:totalUsers,
     })
    }
    catch(err){
        console.log(err);
        res.json(err)
    }
}

// single user get by id 
const getUserInfo= async(req,res)=>{

    try{
       
        const exisitingUser=await UserModel.findById(req.params.userId);
        if(!exisitingUser){
            return res.status(404).json({
                message:"User with this id not found",
            })
        }

     
       else{
        res.status(200).json({
            message:"User Information found successfully..",
            userInfo:exisitingUser
        })
       }
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}


// delete user by id , single user deletion
const deleteUser=async (req,res)=>{
    try{
    const existingUser= await UserModel.findById(req.params.userId);
    if(!existingUser){
        return res.status(404).json({
            message:"userNot found"})
    }
    else{
        const userDeletion= await UserModel.findByIdAndDelete(req.params.userId);
        res.status(200).json({
            message:"User deleted successfully..",
            deletedUser:userDeletion
        })
    }
    }
    catch(err){
        console.log(err)
        res.status(404).josn({
            message:"Error deleting user"
        })
    }
}


const updateUser=async (req,res)=>{
    try{
          const existingUser= await UserModel.findById(req.params.userId);
          if(!existingUser){
            return res.status(404).json({
                message:"user with this id doesn't exists"})
          }else{
            const updatedUser= await UserModel.findByIdAndUpdate(req.params.userId,req.body,{new : true})
            res.status(200).json({
                message:"User updated successfully..",
                user:updatedUser
            })
          }
    }
    catch(err){
        console.log(err);
        res.json(err)
    }
}


// login 
const userLogin= async (req,res)=>{
       try{
        const {email,password}=req.body;
        const existingUser= await UserModel.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                message:"User with this email doesn't exists,please create an Account"
            })
        }
        else{
            const comparePassword=await bcrypt.compare(password,existingUser.password);
            if(!comparePassword){
                return res.status(404).json({
                    message:"password is mismatched ...please try with another password"
                })
            }
          // create a token
            const userToken=jwt.sign({Email:existingUser.email},process.env.JWT_SECRET,{expiresIn:'1d'})
            // update the token
            const updateToken= await UserModel.findByIdAndUpdate(existingUser._id,{token:userToken},{new : true})
            return res.status(200).json({
                message:"User logged in successfully",
                data:updateToken
            })
            
        }
       }
       catch(err){
        console.log(err);
        return res.json({
            error:err});
       }
}





module.exports={ deleteUser,getAllUsers,getUserInfo,updateUser,userAccountCreation,userLogin}