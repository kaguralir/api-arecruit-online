module.exports = app => {

    const job = require("../controllers/jobs.controllers.js");


    app.post("/getUnFillededJob",job.getUnFillededJob);

    app.post("/getFillededJob",job.getFillededJob);

    app.post("/getUnFillededJobLimit4",job.getUnFillededJobLimit4);

    app.post("/getFillededJobLimit4",job.getFillededJobLimit4);

    app.post("/createJob",job.createjob);

    app.post("/deleteJob", job.deletejob); 

    app.post("/updateJob", job.updatejob);

};