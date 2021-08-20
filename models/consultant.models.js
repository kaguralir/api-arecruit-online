const psql = require("../configs/db.js");

// constructor
const Consultant = function(consultant) {

    this.consultant=consultant.consultant;

}

Consultant.getConsultantAfiliate =(consultant_id,result)=>{
    
  psql.query(""+
  "(SELECT company_id as id,company_name as name, 'Prospect' AS origin FROM company WHERE company_contrat='prospect' AND consultant_id=$1) UNION "+
  "(SELECT company_id as id,company_name as name, 'Recruteur' AS origin FROM company WHERE company_contrat='recruteur' AND consultant_id=$1) UNION "+
  "(SELECT users.user_id as id,CONCAT(user_name,' ',user_firstname) as name, 'Candidat' AS origin FROM users JOIN user_info ON users.user_id=user_info.user_id WHERE user_consultant_id=$1);",
  [consultant_id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
   // console.log(res.rows)
    result(null,res);
  });
}


module.exports = Consultant;