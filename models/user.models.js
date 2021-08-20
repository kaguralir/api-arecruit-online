const psql = require("../configs/db.js");

// constructor
const User = function(user) {
  this.user_id = user.user_id;
  this.user_name = user.user_name;
  this.user_firstname = user.user_firstname;
  this.user_email = user.user_email;
  this.user_right= user.user_right;
  this.user_password = user.user_password;
  this.user_profile= user.user_profile;
};

// User.createDb = (result)=>{

//   psql.query(""+
//     " CREATE TABLE  IF NOT EXISTS  users ("+

//         "user_id         serial primary key ,"+
//         "user_name       varchar(150) not null,"+
//         "user_firstname  varchar(150) not null ,"+
//         "user_email      varchar(150) not null,"+
//         "user_password   varchar(150) not null,"+
//         "user_right      varchar(150) not null"+

//     ");"+


//     "CREATE TABLE  IF NOT EXISTS  user_info ("+

//       "user_info_id             serial primary key,"+
//       "user_nationality         varchar(150) ,"+
//       "user_phone_number        varchar(150)  ,"+
//       "user_address             varchar(150) ,"+
//       "user_department          varchar(150) ,"+
//       "user_city                varchar(150)  ,"+
//       "user_zip_code            varchar(150) ,"+
//       "user_country             varchar(150) ,"+
//       "user_id                  serial,"+
//       "FOREIGN KEY(user_id) REFERENCES users(user_id)"+

//     ");"+


//     "CREATE TABLE IF NOT EXISTS company ("+

//         "company_id                  serial primary key,"+
//         "company_nationality         varchar(150) ,"+
//         "company_phone_number        varchar(150)  ,"+
//         "company_headquarters        varchar(150) ,"+
//         "company_address             varchar(150) ,"+
//         "company_department          varchar(150) ,"+
//         "company_city                varchar(150)  ,"+
//         "company_rcs                 varchar(150),"+
//         "company_zip_code            varchar(150) ,"+
//         "company_country             varchar(150) ,"+
//         "company_representative_id   serial ,"+
//         "company_representative_status varchar(150),"+
//         "is_partner                  varchar(150) ,"+
//         "partner_type                varchar(150),"+
//         "consultant_id               serial,"+


//         "FOREIGN KEY(company_representative_id) REFERENCES users(user_id),"+
//         "FOREIGN KEY(consultant_id) REFERENCES users(user_id)"+

//     ");"+



//     "CREATE TABLE  IF NOT EXISTS jobs ("+
//     "   job_id              serial primary key,"+
//     "    job_title           varchar(150),"+
//     "    job_contract_type        varchar(150),"+
//     "    job_presentation_pdf             varchar(150) ,"+
//     "    job_presentation_video          varchar(150) ,"+
//     "    job_country                varchar(150)  ,"+
//     "job_department            varchar(150) ,"+
//     "    job_city             varchar(150) ,"+
//     "    job_zip_code          varchar(150) ,"+
//     "    job_required_level               varchar(150) ,"+
//     "    job_required_grad              varchar(150) ,"+
//     "    job_required_experience              varchar(150) ,"+
//     "    job_creator_id              serial,"+
//     "    job_origin              varchar(150)"+
//     ");CREATE TABLE  IF NOT EXISTS cv_bank ("+

//     "    candidat_id             serial,"+
//     "    searched_job1           varchar(150) ,"+
//     "    searched_job2           varchar(150)  ,"+
//     "   searched_job3           varchar(150) ,"+
//     "    job_location1           varchar(150) ,"+
//     "    job_location2           varchar(150)  ,"+
//     "    job_location3           varchar(150) ,"+
//     "    job_field1              varchar(150) ,"+
//     "    job_field2              varchar(150) ,"+
//     "    job_field3              varchar(150) ,"+
//     "    experience1             varchar(150) ,"+
//     "  experience2             varchar(150) ,"+
//     "    experience3             varchar(150) ,"+
//     "    studies_level           varchar(150) ,"+
//     "    last_graduation         varchar(150) ,"+
//     "    availability_job        varchar(150) ,"+
//     "    cv_pdf                  varchar(150) ,"+
//     "    cv_video                varchar(150) ,"+
//     "    motivation_pdf          varchar(150) ,"+
//     "    motivation_video        varchar(150) "+


//     ");", (err, res) => {
    
//     if (err) {
//       result(err, null);
//       return;
//     }
//     result(null,res);
//   });

// }

User.test = (result)=>{

  psql.query("SELECT user_name FROM public.users ", (err, res) => {
    
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
}

User.signup = (newUser,result)=>{ 

  psql.query('INSERT INTO users  (user_name,user_firstname,user_email,user_password,user_right) VALUES ($1,$2,$3,$4,$5) RETURNING user_id, user_name,user_firstname;',
  [newUser.user_name,newUser.user_firstname,newUser.user_email,newUser.user_password,newUser.user_right], 
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
      result(null,res);
  });
}

User.createUserInfo = (user_id,result)=>{

  psql.query('INSERT INTO user_info  (user_id)  VALUES ($1) ;',
    [user_id], 
    (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });

}


User.login = (lodedUser, result) => {
  
  psql.query("SELECT * FROM users WHERE user_email= $1",
  [lodedUser.user_email],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res.rows[0]);
  });
};

User.getAllUsers = (result) => {
  
  psql.query("SELECT user_id,user_name,user_firstname FROM users",
 
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
};

User.getUserProfileInfo = (id,result) => {
  
  psql.query("SELECT "+
  "users.user_id,"+
  "user_name,"+
  "user_firstname,"+
  "user_profession,"+
  "user_phone_number,"+
  "user_country,"+
  "user_address,"+
  "user_department,"+
  "user_email,"+
  "user_city,"+
  "user_zip_code,"+
  "user_location,"+
  "user_post"+
  " FROM users JOIN user_info ON users.user_id=user_info.user_id WHERE CONCAT(users.user_id,'@',LOWER(REPLACE(user_name,' ', '-')),'-',LOWER(REPLACE(user_firstname,' ', '-')))= $1",
  [id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
};


User.getUserInfoById = (user_id,result) => {
  
  psql.query("SELECT "+
  "users.user_id,"+
  "user_name,"+
  "user_firstname,"+
  "user_profession,"+
  "user_phone_number,"+
  "user_country,"+
  "user_address,"+
  "user_department,"+
  "user_email,"+
  "user_city,"+
  "user_zip_code,"+
  "user_location,"+
  "user_post"+
  " FROM users JOIN user_info ON users.user_id=user_info.user_id WHERE users.user_id= $1",
  [user_id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    //console.log(res)
    result(null,res);
  });
};


module.exports = User;































/*
User.signup = (newUser, result) => {

  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });

};

User.login = (lodedUser, result) => {
  
    sql.query("SELECT * FROM user WHERE user_email= ? ",[lodedUser.user_email], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null,res[0]);
    });
};

User.getAll = (result) => {

  sql.query("SELECT * FROM user ", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });
  
}

module.exports = User;
*/