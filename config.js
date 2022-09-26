const mysql = require("mysql");
const con = mysql.createConnection({
    host : "192.168.100.210",
    user: "crm",
    port:"3306",
    password: "crm123!@#",
    database: "crm-test",
});

con.connect((err)=>{
if(err){
    console.log("connection error");
}
})

module.exports = con;
