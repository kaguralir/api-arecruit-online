const psql = require("../configs/db.js");

// constructor
const Jobs = function (job) {
  
  this.job_id = job.job_id;
  this.job_title = job.job_title;
  this.job_contract_type = job.job_contract_type;
  this.job_presentation_pdf = job.job_presentation_pdf;
  this.job_presentation_video = job.job_presentation_video;
  this.job_country = job.job_country;
  this.job_department = job.job_department;
  this.job_city = job.job_city;
  this.job_zip_code = job.job_zip_code;
  this.job_required_level = job.job_required_level;
  this.job_required_grad = job.job_required_grad;
  this.job_required_experience = job.job_required_experience;
  this.job_creator_id = job.job_creator_id;
  this.job_origin = job.job_origin;
  this.job_hire = job.job_hire;
  this.job_description_pdf= job.job_description_pdf;
};

Jobs.getJobById = (id, result) => {
  
  psql.query("SELECT * FROM jobs WHERE job_id = $1 ",
  [id],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });

};


Jobs.getFillededJob = (company_id, result) => {
  
  psql.query("SELECT job_id,job_title,to_char(created_at, 'TMDay TMDD TMmonth YYYY') as created_at,job_hire FROM jobs WHERE job_creator_id = $1 AND job_statut = $2",
  [company_id,1],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });

};

Jobs.getUnFillededJob = (company_id, result) => {
  
  psql.query("SELECT job_id,job_title,to_char(created_at, 'TMDay TMDD TMmonth YYYY') as created_at,job_hire FROM jobs WHERE job_creator_id = $1 AND job_statut = $2",
  [company_id,0],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });

};


Jobs.getFillededJobLimit4 = (company_id, result) => {
  
  psql.query("SELECT job_id,job_title,to_char(created_at, 'TMDay TMDD TMmonth YYYY') as created_at,job_hire FROM jobs WHERE job_creator_id = $1 AND job_statut = $2 ORDER BY created_at LIMIT 4",
  [company_id,1],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });

};

Jobs.getUnFillededJobLimit4 = (company_id, result) => {

  psql.query("SELECT job_id,job_title,to_char(created_at, 'TMDay TMDD TMmonth YYYY') as created_at,job_hire FROM jobs WHERE job_creator_id = $1 AND job_statut = $2 ORDER BY created_at LIMIT 4;",
  [company_id,0],
  (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null,res);
  });

};


Jobs.createjob = (newJob, result) => {

  psql.query('INSERT INTO jobs (job_title,job_contract_type,job_presentation_pdf,job_presentation_video,job_country,job_department,job_city,job_zip_code,job_required_level,job_required_grad, job_required_experience, job_creator_id, job_origin,job_description_pdf) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING job_id;',
    [newJob.job_title,newJob.job_contract_type,newJob.job_presentation_pdf,newJob.job_presentation_video,newJob.job_country, newJob.job_department, newJob.job_city, newJob.job_zip_code, newJob.job_required_level, newJob.job_required_grad, newJob.job_required_experience, newJob.job_creator_id, newJob.job_origin,newJob.job_description_pdf], 
    (err, res) => {
      if (err) {
        result(err, null); 
        return;
      }
      result(null,res);
  });
}



Jobs.deletejob = (job_id, result ) => {

  psql.query(`DELETE FROM  jobs WHERE job_id=$1`,
  [job_id],
  (err, res) => {
    if (err) {
       result(err,null) //|| {message: "L'offre n'a pas été supprimé"}
    }
       result(null,{ message: 'Votre offre d\'emploi a bien été supprimé !' })
  })
};

Jobs.updatejob = (updateJob, result) => {

  psql.query(`UPDATE  jobs SET job_title=$1,job_contract_type=$2,job_presentation_pdf=$3,job_presentation_video=$4,job_country=$5,job_department=$6,job_city=$7,job_zip_code=$8,job_required_level=$9,job_required_grad=$10, job_required_experience=$11, job_creator_id=$12, job_origin=$13 WHERE job_id=$14 RETURNING job_id;`,
  [updateJob.job_title,updateJob.job_contract_type,updateJob.job_presentation_pdf,updateJob.job_presentation_video,updateJob.job_country, updateJob.job_department, updateJob.job_city, updateJob.job_zip_code, updateJob.job_required_level, updateJob.job_required_grad, updateJob.job_required_experience, updateJob.job_creator_id, updateJob.job_origin,updateJob.job_id],
  (err, res) => {
  if (err) {
    return result(err) //|| {message: "L'offre n'a pas été supprimé"}
  }
  return result({ message: 'Votre offre d\'emploi a bien été modifié !' })

  })
}





module.exports = Jobs;
