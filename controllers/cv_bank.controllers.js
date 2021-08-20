const cv = require('../models/cv_bank.models');

exports.insertCv = (req, res) => {

    const newCv = new cv ({
        searched_job1 : req.body.searched_job1,
        searched_job2 : req.body.searched_job2,
        searched_job3 : req.body.searched_job3,
        job_location1 : req.body.job_location1,
        job_location2 : req.body.job_location2,
        job_location3 : req.body.job_location3,
        job_field1 : req.body.job_field1,
        job_field2 : req.body.job_field2,
        job_field3 : req.body.job_field3,
        experience1 : req.body.experience1,
        experience2 : req.body.experience2,
        experience3 : req.body.experience3,
        studies_level : req.body.studies_level,
        last_graduation : req.body.last_graduation,
        availability_job : req.body.availability_job,
        cv_pdf : req.body.cv_pdf,
        cv_video : req.body.cv_video,
        motivation_pdf : req.body.motivation_pdf,
        motivation_video : req.body.motivation_video
    });

    cv.insertCv(newCv, (err, data) => {

        if (err) {
    
            res.status(500).json({
               
                message : err.message || "Une erreur est survenue lors de l'insertion du cv"
            });
           
        } else res.json(data.rows)

});

};

exports.getallcvs = (req,res)=> {

    cv.getallcvs ((err, data) => {
  
      if (err) {

        res.status(500).json({

          message: err.message || "Une erreur est survenue pendant la récupération des Cvs."
        });
  
      }else res.json(data.rows);
  
    });
  
  }