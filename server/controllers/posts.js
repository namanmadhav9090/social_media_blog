const db = require('../models');
const Posts = db.posts;
const Users = db.users;
const Comments = db.comments;
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');


const createPost = async(req,res) => {
 try {
    const {title,description,userid} = req.body;
    console.log(title,description,userid);

    const posts = {
      image : req.file.path,
      title : title,
      description : description,
      userid : userid
  }
    const Post = await Posts.create(posts);
    res.status(200).json({
      message : "Posts created",
      result : Post,
      status : "file uploaded"
    });
 } catch (error) {
    res.status(200).json(error)
 }
}

const getAllPosts = async(req,res) => {
   try {
      const { option, userid } = req.query;
      console.log(option,userid);

      if(option == "onlyme"){
         const onlymeUsers = await Posts.findAll({
            include : [{
                         model : Comments
                      }],
            where : {
               userid : {
                  [Op.ne] : userid
               }
            }
         })
         res.status(200).json(onlymeUsers);
      } else {
         const allusers = await Posts.findAll({
            include : [{
                        model : Comments,
                      }]
         });
         res.status(200).json(allusers);
      }
   } catch (error) {
    res.status(200).json(error)
   }
}

const updatePosts = async(req,res) => {
   try {
      const { id,title,description } = req.body;
      console.log(req.body);
      const updatePosts = await Posts.update({title:title,description:description},{
         where : {id : id}
      })

      res.status(200).json(updatePosts);
   } catch (error) {
    res.status(200).json(error)
   }
}

const deletePost = async(req,res) => {
   try {
      const {id} = req.body;
      const deletepost = await Posts.destroy({
         where : {id : id}
      })
      res.status(200).json(deletepost);
   } catch (error) {
    res.status(200).json(error)
   }
}

const myPosts = async(req,res) => {
   try {
      console.log(req.query.userid);
      const data = await Posts.findAll({
         where: { userid : req.query.userid}
         // where : {
         //    userid : {
         //       [Op.ne] : req.query.userid
         //    }
         // }

   });



      res.status(200).json({
         message : "OK",
         data : data
         
      });
   } catch (error) {
    res.status(200).json(error)
   }
}

const storage = multer.diskStorage({
   destination : (req,file,cb)=>{
      cb(null, "Images")
   },
   filename:(req, file, cb)=>{
      cb(null, Date.now() + path.extname(file.originalname))
   }
})

const upload = multer({
   storage : storage,
   limits : { fileSize : '100000000' },
   fileFilter : (req,file,cb)=>{
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname))

      if(mimeType && extname) {
         return cb(null, true)
      }
      cb('Give proper files format to upload')
   }
}).single('image')


module.exports = {
    createPost,
    getAllPosts,
    updatePosts,
    deletePost,
    myPosts,
    upload
}