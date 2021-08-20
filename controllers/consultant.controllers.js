const Consultant = require("../models/consultant.models.js");



exports.getConsultantAfiliate = (req,res)=>{

  const consultant_id = req.body.consultant_id;

  Consultant.getConsultantAfiliate(consultant_id,(err, data) => {

    if (err){

      res.json(err || {err:401});

    }else res.json(data.rows);

  });
}