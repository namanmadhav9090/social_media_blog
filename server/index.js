const express = require('express');
const port = 5000;
const app = express();
const userCtrl = require('./controllers/users');
const postCtrl = require('./controllers/posts');
const commentCtrl = require('./controllers/comments');
// const cors = require('cors');
const bodyParser = require('body-parser');



require('./models/index');


// var corsOptions = {
//     origin: "http://localhost:5000"
//   };

app.use(express.json());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors(corsOptions));


app.get('/',(req,res)=>{
    res.send('server started');
})

//static Images folder

app.use('/Images', express.static('./Images'));

//user routes
app.use('/register',userCtrl.registerUser);
app.use('/login',userCtrl.userLogin);
app.use('/home',userCtrl.homePage);

//posts routes
app.use('/createposts', postCtrl.upload , postCtrl.createPost);
app.use('/getposts' , postCtrl.getAllPosts);
app.use('/updatepost' , postCtrl.updatePosts);
app.use('/deletepost' , postCtrl.deletePost);
app.use('/myposts' ,postCtrl.upload, postCtrl.myPosts);

//comments routes
app.use('/createcomments',commentCtrl.createComment);
app.use('/deletecomment',commentCtrl.deleteComment);




app.listen(port,()=>{
    console.log(`server running successfully on port ${port}`);
})