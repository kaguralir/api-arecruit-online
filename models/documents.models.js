const psql = require("../configs/db.js");

// constructor
const Document = function(document) {
  this.document_id = document.document_id;
  this.document_owner = document.document_owner;
  this.document_name = document.document_name;
  this.document_url = document.document_url;
  this.document_date= document.document_date;
  this.document_status = document.document_status;
};

Document.getDocumentByOwnerId = (owner_id,result)=>{

    psql.query("SELECT document_id,document_owner,document_name,document_url,document_date,document_status,company_id FROM documents JOIN company ON company_id=document_owner JOIN users ON company_representative_id =user_id WHERE  document_owner=$1", [owner_id],
    (err, res) => {
      
      if (err) {
        result(err, null);
        return;
      }
      result(null,res);
    });
}

module.exports = Document;
