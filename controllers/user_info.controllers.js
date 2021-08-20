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


exports.createFullUserInfo =(req,res)=>{

  const user = new User_info({
    user_phone_number:req.body.user_phone_number,
    user_address:req.body.user_address,
    user_department:req.body.user_department,
    user_city:req.body.user_city,
    user_zip_code:req.body.user_zip_code,
    user_country:req.body.user_country,
    user_id:req.body.user_id,
    user_consultant_id:req.body.user_consultant_id
  });

  User_info.createFullUserInfo(user,(err,data)=>{
      if (err){

        res.json(err||{err:401});

      }else res.json(data.rows[0]);
  })
}