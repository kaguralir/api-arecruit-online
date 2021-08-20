
module.exports = app => {

    const multer = require('multer')

    const AWS = require('../configs/aws')

    // SET STORAGE
    const storage = multer.memoryStorage({
        destination: function (req, file, callback) {
            callback(null, '')
        }
    })

    var upload = multer({ storage}).single('file')

    app.post('/uploadfile', upload, (req, res) => {
        let file =  req.body.file.buffer;
        let base64 =  file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var buffer = new Buffer.from(base64[2],'base64');
    
        const params ={
          Bucket : AWS.Bucket,
          Key:`${req.body.file.dest}/${req.body.file.fileName}`,
          Body: buffer,
        }
    
        AWS.s3.upload(params,(err,data)=>{
            if(err){
                res.status(500).send(err)
            }
            res.status(200).send(data.Location)
    
        })
            
    })
}