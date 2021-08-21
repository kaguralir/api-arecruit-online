const User = require("../models/user.models.js");
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const cookie = require('cookie')
const dotenv = require("dotenv");
dotenv.config({path: './.env'}); 
const TOKEN = process.env.TOKEN;



exports.test = (req,res)=>{

  User.test((err, data) => {

    if (err){
      res.status(500).json({
        message:
          err.message || "Une erreur pendant le test de la base de donnée."
      });

    }else res.json(data.rows);

  });

}

exports.getAllUsers = (req,res)=>{

  User.getAllUsers((err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows);

  });
}

exports.getUserProfileInfo = (req,res)=>{

  const id= req.body.id

  User.getUserProfileInfo(id,(err, data) => {

    if (err){

      res.status(500).json({
        message:
          err.message || "Une erreur pendant le test de la base de donnée."
      });

    }else res.json(data.rows[0]);

  });
}
exports.getUserInfoById = (req,res)=>{

  const user_id= req.body.user_id

  User.getUserInfoById(user_id,(err, data) => {

    if (err){

      res.status(500).json({
        message:
          err.message || "Une erreur pendant le test de la base de donnée."
      });

    }else res.json(data.rows[0]);

  });
}


exports.signup = (req,res)=>{

  bcrypt.hash(req.body.user_password,12,function(err,hash){

    const newUser = new User({
      user_name:req.body.user_name,
      user_firstname: req.body.user_firstname,
      user_email: req.body.user_email,
      user_password: hash,
      user_right:req.body.user_right
    });

    User.signup(newUser,(err, data) => {

      if (err){

        res.json({err:err}||{err:401});

      }else {
        const claims = {user_id : data.rows[0].user_id, user_name:data.rows[0].user_name,user_firstname: data.rows[0].user_firstname};
        const jwt =  Jwt.sign(claims,TOKEN,{expiresIn: '1h'});
        res.json({user_info:data.rows[0],jwt});

      }

    });

  }); 
}

exports.createUserInfo =(req,res)=>{

  const user_id = req.body.user_id

  User.createUserInfo(user_id,(err,data)=>{
      if (err){

        res.json(err||{err:401});

      }else res.json(data.rows[0]);
  })
}


exports.login = (req, res) => {

  // Create a User
  const user = new User({
    user_email: req.body.user_email,
    user_password: req.body.user_password
  });

  User.login(user,(err, data) => {

    if (err)
      res.json({err:400});
    else{

      data? bcrypt.compare(user.user_password,data.user_password,function(err,result){
        if(!err && result){

          const claims = {user_id : data.user_id, user_name:data.user_name,user_firstname: data.user_firstname};
          const jwt =  Jwt.sign(claims,TOKEN,{expiresIn: '1h'});
          res.setHeader('Set-cookie',cookie.serialize('auth',jwt,{
            httpOnly:true,
            secure:process.env.NODE_ENV!=="development",
            sameSite:'strict',
            maxAge:3600,
            path:'/'
          }))
          res.json(jwt);
                   
        }else{

          res.json(err||{err:401});

        }
      }):res.json(err||{err:401});

    }
  });
};



exports.createDb = (req,res)=>{

  User.createDb((err, data) => {

    if (err){

      res.status(500).json({
        message:
          err.message || "Une erreur pendant le test de la base de donnée."
      });

    }else res.json(data.rows);

  });
}







































