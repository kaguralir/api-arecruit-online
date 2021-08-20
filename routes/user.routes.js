module.exports = app => {

    const user = require("../controllers/user.controllers.js");

    app.get("/test",user.test);

    app.post("/signup",user.signup);

    app.post('/createUserInfo',user.createUserInfo);

    app.post("/login",user.login);

    app.get("/getAllUsers",user.getAllUsers);

    app.post("/getUserProfileInfo",user.getUserProfileInfo);

    app.post("/getUserInfoById",user.getUserInfoById);

    app.post("/DB_CREATE",user.createDb);
    

};