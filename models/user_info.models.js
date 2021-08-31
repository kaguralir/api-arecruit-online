const psql = require("../configs/db.js");
// constructor
const User_info = function(user) {
    this.user_info_id = user.user_info_id;
    this.user_nationality = user.user_nationality;
    this.user_phone_number= user.user_phone_number;
    this.user_address = user.user_address;
    this.user_department= user.user_department;
    this.user_city = user.user_city;
    this.user_zip_code = user.user_zip_code;
    this.user_country = user.user_country;
    this.user_id= user.user_id;
    this.user_profession= user.user_profession;
    this.user_calendly = user.user_calendly;
    this.user_post = user.user_post;
    this.user_location= user.user_location;
    this.user_consultant_id= user.user_consultant_id;
};

User_info.getConsultantByDepartment = (departement, result) => {
  
    psql.query("SELECT users.user_id,user_name FROM user_info JOIN users ON user_info.user_id =users.user_id WHERE user_department= $1",
    [departement],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null,res.rows);
    });
};

User_info.getCity = (result) => {
  
  psql.query("SELECT DISTINCT user_city FROM user_info ;",
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res.rows);
  });
};

User_info.createFullUserInfo = (user,result)=>{

  psql.query('INSERT INTO user_info  (user_phone_number,user_address,user_department,user_city,user_zip_code,user_country,user_id,user_consultant_id)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING user_info_id;',
  [user.user_phone_number,user.user_address,user.user_department,user.user_city,user.user_zip_code,user.user_country,user.user_id,user.user_consultant_id], 
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    console.log(res)
    result(null,res);
  });

}



module.exports = User_info;
  