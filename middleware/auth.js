const JWT = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config({path: './.env'}); 
const TOKEN = process.env.TOKEN;

const authenticated = (fn)=>  async (req,res)=>{
    JWT.verify(!req.cookies.auth, TOKEN, async function (err, decoded) {
        if (!err && decoded) {
            return fn(req, res);
        }
        res.json({ message: "Désolé il faut des accès" });
    })
}

module.exports = authenticated 