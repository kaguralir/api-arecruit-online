const psql = require("../configs/db.js");

// Constructor

const CvBank = function (cv) {
    this.candidat_id = cv.candidat_id;
    this.searched_job1 = cv.searched_job1;
    this.searched_job2 = cv.searched_job2;
    this.searched_job3 = cv.searched_job3;
    this.job_location1 = cv.job_location1;
    this.job_location2 = cv.job_location2;
    this.job_location3 = cv.job_location3;
    this.job_field1 =    cv.job_field1;
    this.job_field2 =    cv.job_field2;
    this.job_field3 =    cv.job_field3;
    this.experience1 = cv.experience1;
    this.experience2 = cv.experience2;
    this.experience3 = cv.experience3;
    this.studies_level = cv.studies_level;
    this.last_graduation = cv.last_graduation;
    this.availability_job = cv.availability_job;
    this.cv_pdf = cv.cv_pdf;
    this.cv_video = cv.cv_video;
    this.motivation_pdf = cv.motivation_pdf;
    this.motivation_video = cv.motivation_video;
};

CvBank.insertCv = (newCV, result) => {

    psql.query('INSERT INTO cv_bank (searched_job1,searched_job2,searched_job3,job_location1,job_location2,job_location3,job_field1,job_field2,job_field3,experience1, experience2, experience3, studies_level, last_graduation, availability_job, cv_pdf, cv_video, motivation_pdf, motivation_video) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING candidat_id;',
    [newCV.searched_job1, newCV.searched_job2, newCV.searched_job3, newCV.job_location1, newCV.job_location2, newCV.job_location3, newCV.job_field1, newCV.job_field2, newCV.job_field3, newCV.experience1, newCV.experience2, newCV.experience3, newCV.studies_level, newCV.last_graduation, newCV.availability_job, newCV.cv_pdf, newCV.cv_video, newCV.motivation_pdf, newCV.motivation_video], 
    (err, res) => {
      
      if (err) {
        result(err, null); 
        return;
      }
      result(null,res);
  });
}

CvBank.getallcvs = (result) => {

  psql.query('SELECT * FROM public.cv_bank ', (err, res) => {
    
        if (err) {
          result(err, null);
          return;
        }
        result(null,res);
      });
}

module.exports = CvBank ;