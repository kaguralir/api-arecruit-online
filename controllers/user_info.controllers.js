const User_info = require("../models/user_info.models.js");

exports.getConsultantByDepartment = (req,res)=>{

    const departement = req.body.company_department;
  
    User_info.getConsultantByDepartment(departement,(err, data) => {
  
      if (err){
        res.status(500).json({
          message:
            err.message || "Une erreur pendant le test de la base de donnée."
        });
  
      }else res.json(data);
  
    });
  
}

exports.getCity = (req,res)=>{


  User_info.getCity((err, data) => {

    if (err){
      res.status(500).json({
        message:
          err.message || "Une erreur pendant le test de la base de donnée."
      });

    }else res.json(data);

  });

}
