require('dotenv').config({path: './.env'});
/*
var fs = require('fs');
var dbSchema =fs.readFileSync("a-recruit-api/configs/schema.sql").toString;
*/


const SERVEUR = process.env.SERVEUR
const UTILISATEUR =process.env.UTILISATEUR;
const PASSWORD =process.env.PASSWORD;
const DB =process.env.DB;


const Pool = require('pg').Pool;

const pool = new Pool({
  host: SERVEUR,
  user: UTILISATEUR,
  password: PASSWORD,
  database:DB,
  PORT : 5432,
})

pool.connect(error => {
  if (error) throw error;
  console.log("Connexion réussie à la base de donnée.");

});


pool.query("SET LC_TIME = 'French';",
(err,res)=>{
  if (err) throw err;
  console.log("Données configurées en Français.");
});

module.exports = pool;