 

module.exports = (sequelize,Sequelize) => {
    const Comments = sequelize.define('comments',{
        comments:{
            type: Sequelize.STRING
        },
        postid: {
            type: Sequelize.INTEGER
          },
        userid: {
            type: Sequelize.INTEGER
        }
    },{timestamps:true})
    return Comments;
}