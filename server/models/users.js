 

module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('Busers',{
        username: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          }
    },{timestamps:true})
    return User;
}