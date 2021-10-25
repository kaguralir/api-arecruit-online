module.exports = app => {

    const cv = require('../controllers/cv_bank.controllers');

    app.post("/insertcv", cv.insertCv);
    app.get("/getallcvs", cv.getallcvs);
    app.get("/getCVUser", cv.getCVUser);

    app.get("/getCVbyId/:candidat_id", cv.getCVbyId);
};