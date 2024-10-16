const express = require('express');
const cookieParser = require('cookie-parser');
const Registeruser=require('../models/user');
const centerData=require('../models/center')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
// require('dotenv').config();
const signup=async(req,res)=>{
    console.log(req.body);
    const checkemail=req.body.email
    var result={
        Name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    
    const emailExists = await Registeruser.findOne({ email:checkemail }).lean();
    
    
        if(emailExists){
            const hash=await bcrypt.hash(emailExists.password,13);
            const isMatch = await bcrypt.compare(req.body.password,hash);
            const centerId=emailExists['center_id'];
            const centerInfo = await centerData.findOne({name:centerId}).lean();
            const spcenter=centerInfo['sports']
            console.log(centerInfo['sports'])
            console.log(centerId)
            // console.log(req.body.password);
            // console.log(emailExists.password);
            if(isMatch){
                const payload = {
                    TokenContent: {
                        isAuth: true,
                        email: req.body.email,
                        center_id:centerId,
                        sports: spcenter
                    }
                };
                const token = jwt.sign(
                    payload,
                    "tmkc",
                    { expiresIn: '7 days' }
                );
                console.log(token);
                res.cookie('authToken',token,{
                    httpOnly: true,
                    secure: true, // Set to true if using HTTPS
                    sameSite: 'strict', // Or 'lax' depending on your requirement
                });
                return res.status(200).json({email:req.body.email,id:emailExists._id, isAuth: true, token: token });
                // return res.status(200).send({msg:"Login Successful",username:emailExists.Name,token});
            }else{
                return res.status(400).json({ error: 'Password Mismatch' });
            }
            res.send(true);
        }else{
            return res.status(400).json({ error: 'Email is invalid' });
            
        }
    
    
}

module.exports={signup};