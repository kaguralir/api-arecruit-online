module.exports = app => {

    const cv = require('../controllers/cv_bank.controllers');

    app.post("/insertcv",  cv.insertCv);
    app.get("/getallcvs", cv.getallcvs);
};