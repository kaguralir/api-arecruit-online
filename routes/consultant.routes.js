module.exports = app => {

    const consultant = require("../controllers/consultant.controllers.js");

    app.post('/getConsultantAfiliate',consultant.getConsultantAfiliate);
  
};