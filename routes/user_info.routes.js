module.exports = app => {

    const user_info = require("../controllers/user_info.controllers.js");

    app.post('/getConsultantByDepartment',user_info.getConsultantByDepartment);

    app.post('/createFullUserInfo',user_info.createFullUserInfo);
  
    app.post('/getCity',user_info.getCity);


};