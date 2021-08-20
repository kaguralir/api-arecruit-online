/*
* Setup du serveur web.  Next.js API route support: https://nextjs.org/docs/api-routes/introduction
* @copyright  Copyright (c) 06-2021 Prince Nick BALLO
* @license    ....
* @link       https://github.com/...
* @since      0.1.0
*/

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3080
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
 

app.get('/', (req, res) => res.send('Bienvenue a recruit'))
 
  
  require("./routes/user.routes.js")(app)
  require("./routes/user_info.routes.js")(app)
  require("./routes/jobs.routes.js")(app)
  require("./routes/company.routes.js")(app)
  require("./routes/cv_bank.routes.js")(app)
  require("./routes/documents.routes.js")(app)
  require("./routes/consultant.routes.js")(app)


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


  
