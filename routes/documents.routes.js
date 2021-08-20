module.exports = app => {

    const user = require("../controllers/documents.controllers.js");

    app.post("/getDocumentByOwnerId",user.getDocumentByOwnerId);
    

};