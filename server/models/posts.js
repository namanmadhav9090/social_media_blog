 

module.exports = (sequelize,Sequelize) => {
    const Posts = sequelize.define('posts',{
        image:{
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
          },
        description: {
            type: Sequelize.STRING
          },
        userid: {
            type: Sequelize.INTEGER
        }
    },{timestamps:true})
    return Posts;
}