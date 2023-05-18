const db = require('../models');
const Comments = db.comments;
const Posts = db.posts;


const createComment = async(req,res) => {
      try {
        const { comments, postid, userid } = req.body;

        const commentObj = {
            comments : comments,
            postid : postid,
            userid : userid
        }
        const userComment = await Comments.create(commentObj);
        res.status(200).json({
            message : "ok",
            data : userComment
        })
      } catch (error) {
        res.status(400).json({
            message : "comment not created",
            err : error
        })
      }
}

// const getallComments = async(req,res) => {
//     try {
//         // const allComments = await Comments.findAll({});
//         const allComments = await Posts.findAll({
//             include : [{
//                 model : Comments
//             }]
//         })
//         res.status(200).json({
//             data : allComments
//         })
//     } catch (error) {
//         res.status(400).json({
//             message : "comment not created",
//             err : error
//         })
//     }
// }

const deleteComment = async(req,res) => {
  try {
     const { id } = req.body;
     const deletecomment = await Comments.destroy({
      where : {id : id}
     })
     res.status(200).json(deletecomment);
  } catch (error) {
    res.status(200).json(error) 
  }
}

module.exports = {
    createComment,
    // getallComments,
    deleteComment,
}