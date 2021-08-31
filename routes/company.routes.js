const { createCompany } = require("../models/company.models.js");

module.exports = app => {

    const company = require("../controllers/company.controllers.js");
    
    const multer = require('multer')
    const storage = multer.memoryStorage({
        destination: function (req, file, callback) {
            callback(null, '')
        }
    })
    var upload = multer({ storage}).single('file')

    app.post('/createCompany', company.createCompany);

    app.post('/createFullCompany', company.createFullCompany);

    app.post('/updateCompanyInfo',company.updateCompanyInfo);

    app.post('/updateConsultantCompanyInfo',company.updateConsultantCompanyInfo);

    app.post('/getCompanyInfo', company.getCompanyInfo);

    app.post('/getCompanyInfoById', company.getCompanyInfoById);

    app.get('/getAllCompany', company.getAllCompany);

    app.post('/getCompanyInfoByName', company.getCompanyInfoByName);

    app.post('/uploadCompanyLogo',upload, company.uploadCompanyLogo);

    app.post('/uploadCompanyPresentationPdf',upload, company.uploadCompanyPresentationPdf);


 
};