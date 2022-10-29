const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router()
const con=require('./connection')
const app=express()
const bodyParser=require("body-parser");
app.post('/upload-post',  function(req, res){
  message = '';
 if(req.method == "POST"){
  var post  = req.body;
  var user_id=post.user_id

  if (!req.files)
      return res.status(400).send('No files were uploaded.');
              var file = req.files.uploaded_image;
  
      var Filename=file.name;
     if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                               
          file.mv('public/images/upload_images/'+Filename.name, function(err) {
                           
              if (err)

                return res.status(500).send(err);
var sql = "INSERT INTO `posts`( `user_id` ,`Filename `) VALUES ('" + user_id +  "','" + Filename + "')";
// 'insert into posts values(?,?)',[user_id,Filename]

  
var query = con.query(sql, function(err, result) {
           res.send(result);
              });
           });
        } else {
          message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
          res.send({message: message});
        }
 } else {
    res.send(req.file);
 }


app.get('/get-posts', function(req, res, next)  {
  con.query("SELECT * FROM posts", function (err, data, fields) {
    if(err) return next(new AppError(err))
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
 });

})//call for signup post 
app.listen(3000 || process.env.PORT, () => {
console.log("Server on...")
})













// const fileUpload = require('express-fileupload')
// // Image Upload
// const imageStorage = multer.diskStorage({
//     destination:"Filename", // Destination to store image 
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
//         // file.fieldname is name of the field (image), path.extname get the uploaded file extension
//     }
// });

// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//         fileSize: 2000000   // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
//             return cb(new Error('Please upload a Image'))
//         }
//         cb(undefined, true)
//     }
// })  

// // For Single image upload
// app.post('/upload-post', imageUpload.single('Images'), (req, res) => {
//     const Id=req.body.Id
//     const user_id=req.body.user_id
//     const Filename=req.body.Filename

    
//     con.query('insert into posts values(?,?,?)',[Id,user_id,Filename],(err,res)=>{
//         if(err){
//             console.log(err)

//         }else{
//            res.send('post')
//            console.log(typeof Filename)
//         }
//      })
//     res.send(req.file)
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })
// app.listen(3000 || process.env.PORT, () => {
//   console.log("Server on...")
// })

