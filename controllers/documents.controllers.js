const Document = require("../models/documents.models.js");


exports.getDocumentByOwnerId = (req,res)=>{

    const owner_id=req.body.owner_id

    Document.getDocumentByOwnerId(owner_id,(err, data) => {
  
      if (err){
        res.status(500).json({
          message:
            err.message || "Une erreur pendant le test de la base de donnée."
        });
  
      }else res.json(data.rows);
  
    });
  
}
