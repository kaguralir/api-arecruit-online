const Jobs = require("../models/jobs.models.js");

exports.getJobById = (req,res)=>{

    const id = req.body.id

    Jobs.getJobById(id,(err, data) => {
  
        if (err){
  
          res.json(err || {err:401});
  
        }else res.json(data.rows);
  
    });
  
}

exports.getFillededJob = (req,res)=>{

    const company_id = req.body.company_id

    Jobs.getFillededJob(company_id,(err, data) => {
  
        if (err){
  
          res.json(err || {err:401});
  
        }else res.json(data.rows);
  
    });
  
}

exports.getUnFillededJob = (req,res)=>{

    const company_id = req.body.company_id

    Jobs.getUnFillededJob(company_id,(err, data) => {
  
        if (err){
  
          res.json(err || {err:401});
  
        }else res.json(data.rows);
  
    });
  
}

exports.getFillededJobLimit4 = (req,res)=>{

    const company_id = req.body.company_id

    Jobs.getFillededJobLimit4(company_id,(err, data) => {
  
        if (err){
  
          res.json(err || {err:401});
  
        }else res.json(data.rows);
  
    });
  
}

exports.getUnFillededJobLimit4 = (req,res)=>{

    const company_id = req.body.company_id

    Jobs.getUnFillededJobLimit4(company_id,(err, data) => {
  
        if (err){
  
          res.json(err || {err:401});
  
        }else res.json(data.rows);
  
    });
  
}

exports.createjob = (req, res) => {
    
    const upload = require('../utils/filesUploade.utils.js')

    let files = []
  
    if(req.body.job_description_pdf.new){
        files.push(req.body.job_description_pdf.new)
    }
  
    if(req.body.job_presentation_pdf.new){
      files.push(req.body.job_presentation_pdf.new)
    } 
    
    if(files.length!==0){
  
        upload(files).then((result,err)=>{
            console.log(result.job_presentation_pdf)
            console.log(result.job_description_pdf)

            if(!err){
               /* const newJob = new Jobs ({

                    job_title : req.body.job_title,
                    job_contract_type : req.body.job_contract_type,
                    job_presentation_pdf : result.job_presentation_pdf,
                    job_presentation_video : req.body.job_presentation_video,
                    job_country : req.body.job_country,
                    job_department : req.body.job_department,
                    job_city : req.body.job_city,
                    job_zip_code : req.body.job_zip_code,
                    job_required_level : req.body.job_required_level,
                    job_required_grad : req.body.job_required_grad,
                    job_required_experience : req.body.job_required_experience,
                    job_creator_id : req.body.job_creator_id,
                    job_origin : req.body.job_origin,
                    job_statut : req.body.job_status,
                    job_description_pdf: result.job_description_pdf
                });
            
                Jobs.createjob(newJob, (err, data) => {
            
                    if (err){
            
                        res.status(500).json({
                        message:
                            err.message || "Une erreur pendant l'ajout à la base de donnée"
                        });
                
                    }else res.json(data.rows);
                });*/

            }else res.json({message: 'erreur lors du chargement des fichiers'})
        })

    }else{

            const newJob = new Jobs ({

                job_title : req.body.job_title,
                job_contract_type : req.body.job_contract_type,
                job_presentation_pdf : req.body.job_presentation_pdf,
                job_presentation_video : req.body.job_presentation_video,
                job_country : req.body.job_country,
                job_department : req.body.job_department,
                job_city : req.body.job_city,
                job_zip_code : req.body.job_zip_code,
                job_required_level : req.body.job_required_level,
                job_required_grad : req.body.job_required_grad,
                job_required_experience : req.body.job_required_experience,
                job_creator_id : req.body.job_creator_id,
                job_origin : req.body.job_origin,
                job_statut : req.body.job_status,
                job_description_pdf: req.body.job_description_pdf
            });
        
            Jobs.createjob(newJob, (err, data) => {

                if (err){

                    res.status(500).json({
                    message:
                        err.message || "Une erreur pendant l'ajout à la base de donnée"
                    });
            
                }else res.json(data.rows);
            });
    }
}

// Controller 

exports.deletejob = (req, res) => {

    const job_id = req.body.job_id 
    
    Jobs.deletejob(job_id,(err, data) => {
    
        if (err){
        
            res.json(err || {err:401});
        
        }else res.json("offre supprimée");
        
    })
    
} 

exports.updatejob = (req, res) => {

    const updateJob = new Jobs ({
        job_id : req.body.job_id,
        job_title : req.body.job_title,
        job_contract_type : req.body.job_contract_type,
        job_presentation_pdf : req.body.job_presentation_pdf,
        job_presentation_video : req.body.job_presentation_video,
        job_country : req.body.job_country,
        job_department : req.body.job_department,
        job_city : req.body.job_city,
        job_zip_code : req.body.job_zip_code,
        job_required_level : req.body.job_required_level,
        job_required_grad : req.body.job_required_grad,
        job_required_experience : req.body.job_required_experience,
        job_creator_id : req.body.job_creator_id,
        job_origin : req.body.job_origin,
        job_statut : req.body.job_status,
        job_description_pdf: req.body.job_description_pdf
    });

    Jobs.updatejob(updateJob,(err, data) => {

        if (err){

        res.json(err || {err:401});
          
        }else res.json(data.rows);
    })
}

