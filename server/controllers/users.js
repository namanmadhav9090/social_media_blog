const db = require('../models');
const Users =  db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const registerUser = async(req,res) => {
     try {
        const {username,email,password} = req.body;
        console.log(username,email,password);
        console.log(req.body);



        // let salt = await bcrypt.genSalt(20);
        // let hash = await bcrypt.hash(password,salt);
        const user = {
            username : username,
            email  : email,
            password : password
        }

        const User = await Users.create(user);
        const secret = password
        token = jwt.sign({ "id" : User.id,"email" : User.email },secret);
        

        res.status(200).json({
            message : "User registered",
            user :User,
            token : token
        });

     } catch (error) {
        console.log(error);
        res.status(400).json(error);
     }
}

const userLogin = async(req,res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const user = await Users.findOne({where:{email:email}});
        console.log(user);
        console.log('user');

        if(user){
            // const password_valid = await bcrypt.compare(password,user.dataValues.password);
            // console.log(password_valid);
            // console.log('password');
            // const password_val = true;
            // if(!password_valid){
                const secret = password
                token = jwt.sign({ "id" : user.id,"email" : user.email },secret);
                res.status(200).json({ token : token, response:'user login success',userId : user.id });
            // } else {
            //     res.status(400).json({ error : "Password Incorrect" });
            //   }
        }
        else{
            res.status(404).json({ error : "User does not exist" });
          }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const homePage = async(req,res) => {
      try {
        const allUsers = await Users.findAll({});
        res.status(200).json(allUsers);
      } catch (error) {
        res.status(400).json({
            message : error
        })
      }
}

const oneTomany =async(req,res) => {
    try {
        const allUsers = await Users.findAll();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({
            message : error
        })
    }
}

module.exports = { 
    registerUser,
    userLogin,
    homePage,
    oneTomany,
 }