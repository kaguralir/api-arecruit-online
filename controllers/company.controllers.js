const Company = require("../models/company.models.js");
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');


exports.createCompany = (req,res)=>{

  const user_id= req.body.user_id;

  Company.createCompany(user_id,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows);

  });
}

exports.createFullCompany = (req,res)=>{

  const company = new Company({
    company_name:req.body.company_name,
    company_address:req.body.company_address,
    company_representative_id:req.body.company_representative_id,
    company_representative_status:req.body.company_representative_status,
    company_phone_number: req.body.company_phone_number,
    company_headquarters:req.body.company_headquarters,
    company_rcs: req.body.company_rcs,
    is_partner:req.body.is_partner,
    partner_type:req.body.partner_type,
    consultant_id:req.body.consultant_id,
    company_contrat:req.body.company_contrat,
  });

  Company.createFullCompany(company,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows[0]);

  });

}

exports.uploadCompanyLogo = async (req,res)=>{

  const AWS_S3=await require('../configs/aws');
  let file =  req.body.file.buffer;
  let base64 =  file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var buffer = new Buffer.from(base64[2],'base64');
  console.log(req)

  const params={
    Body: buffer,
    Bucket: AWS_S3.S3_BUCKET,
    Key: `company/${req.body.id}/logo.png`
  }

  AWS_S3.myBucket.upload(params, async (err,data)=>{
    console.log(data)
    console.log(err)
    Company.uploadCompanyLogo({company_logo:data.Location,company_id:req.body.id},(err, data) => {
      if (err){
        res.json(err || {err:401});
      }else res.json(data.rows);
  
    });
  })

}

exports.uploadCompanyPresentationPdf = async (req,res)=>{

  const AWS_S3=await require('../configs/aws');
  let file =  req.body.file.buffer;
  let base64 =  file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var buffer = new Buffer.from(base64[2],'base64');


  const params={
    Body: buffer,
    Bucket: AWS_S3.S3_BUCKET,
    Key: `company/${req.body.id}/presentation.pdf`
  }

  AWS_S3.myBucket.upload(params, async (err,data)=>{

    Company.uploadCompanyPresentationPdf({company_presentation_pdf:data.Location,company_id:req.body.id},(err, data) => {
      if (err){
        res.json(err || {err:401});
      }else res.json(data.rows);
  
    });
  })

}

exports.uploadCompanyPresentationVideo = async (req,res)=>{

  const AWS_S3=await require('../configs/aws');
  let file =  req.body.file.buffer;
  let base64 =  file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var buffer = new Buffer.from(base64[2],'base64');


  const params={
    Body: buffer,
    Bucket: AWS_S3.S3_BUCKET,
    Key: `company/${req.body.id}/presentation.mp4`
  }

  AWS_S3.myBucket.upload(params, async (err,data)=>{

    Company.uploadCompanyPresentationVideo({company_presentation_video:data.Location,company_id:req.body.id},(err, data) => {
      if (err){
        res.json(err || {err:401});
      }else res.json(data.rows);
  
    });
  })

}

exports.updateCompanyInfo = (req,res)=>{

  const company = new Company({
    company_id:req.body.company_id,
    company_name:req.body.company_name,
    company_nationality:req.body.company_nationality,
    company_address:req.body.company_address,
    company_department:req.body.company_department,
    company_representative_status:req.body.company_representative_status,
    company_phone_number: req.body.company_phone_number,
    company_headquarters:req.body.company_headquarters,
    company_city:req.body.company_city,
    company_rcs: req.body.company_rcs,
    company_zip_code:req.body.company_zip_code,
    company_country:req.body.company_country,
    is_partner:req.body.is_partner,
    partner_type:req.body.partner_type,
    consultant_id:req.body.consultant_id,
    company_presentation_pdf:req.body.company_presentation_pdf,
    company_presentation_video:req.body.company_presentation_video
  });

  Company.updateCompanyInfo(company,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows[0]);

  });

}

exports.updateConsultantCompanyInfo = (req,res)=>{

  const company = new Company({
    company_id:req.body.company_id,
    company_name:req.body.company_name,
    company_nationality:req.body.company_nationality,
    company_address:req.body.company_address,
    company_department:req.body.company_department,
    company_activity:req.body.company_activity,
    company_phone_number: req.body.company_phone_number,
    company_headquarters:req.body.company_headquarters,
    company_city:req.body.company_city,
    company_rcs: req.body.company_rcs,
    company_zip_code:req.body.company_zip_code,
    company_country:req.body.company_country,
    company_ape:req.body.company_ape,
    company_siret:req.body.company_siret,
    company_history:req.body.company_history,
   
  });
  Company.updateConsultantCompanyInfo(company,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows[0]);

  });

}


exports.getCompanyInfo = (req,res)=>{

  const user_id= req.body.user_id;

  Company.getCompanyInfo(user_id,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows[0]);

  });
}



exports.getCompanyInfoById = (req,res)=>{

  const id= req.body.id;

  Company.getCompanyInfoById(id,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows[0]);

  });
}


exports.getCompanyInfoByName  = (req,res)=>{

  const company_name= req.body.company_name;

  Company.getCompanyInfoByName (company_name,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows[0]);

  });
}

exports.getAllCompany = (req,res)=>{

  Company.getAllCompany((err, data) => {
    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows);

  });
}


