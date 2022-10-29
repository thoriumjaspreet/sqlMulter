const mysql = require('mysql');


const con=mysql.createConnection(
 {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_db',
    
  })
  con.connect(function(err) {
    
  console.log("Connected!");

 });


   // con.query("SELECT * FROM test_db.posts", function (err, result, fields) {
   //   if (err) throw err;
   //   console.log(result);
   // });
 module.exports=con