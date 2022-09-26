const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const con = require("./config");
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


router.get('/home', (req, res) => {
    res.send(JSON.stringify([ {name:"naseem", eemail:"naseem@gmail.com"}, 
    {name:"ghalib", eemail:"naseem@gmail.com"},
    {name:"usman", eemail:"naseem@gmail.com"},
    {name:"ali", eemail:"naseem@gmail.com"},
    {name:"fahad", eemail:"naseem@gmail.com"},]));
});


router.get('/clientEmailList', (req, res) => {
    console.log('get');
    // res.send(' Hello World, This is profile router ');
    con.query('SELECT el.Email_ID emailID, el.Email_Address emailAddress, cs.cl_ID clientID,cs.Cl_Name clientName, el.Email_Name emailName FROM email_list el LEFT JOIN client_store cs ON el.CL_ID = cs.CL_ID;',(err,result)=>{
        if(err){
            res.send("err")
        }else{
        
            res.send(JSON.stringify(result) )
        }
    })
});

router.post('/updateclientEmailList/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const data = [req.body.clientId, req.body.emailName, req.params.id]
    console.log("data",data)
    con.query('UPDATE email_list SET CL_ID = ?, Email_Name= ? WHERE Email_ID = ?  ',data,(err,result)=>{
        if(err){
            console.log("err", err)
            res.send({"success": false, "message": "something went wrong", "result": err})
        }else{
            res.send({"success": true, "message": "record updated successfully", "result": result})
        }
    })

    // res.send(' Hello World, This is logout router ');
});
// router.route(emailListRoutes)
app.use('/clientEmail', router);


app.listen(8000);
console.log('Web Server is listening at port ' + (8000));
