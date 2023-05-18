const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog','root','@Naman321',{
    host : 'localhost',
    dialect : 'mysql',
    logging : false,
})

sequelize.authenticate()
.then(()=>{
    console.log('db connected');
})
.catch((err)=>{
    console.log(err);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users')(sequelize,Sequelize);
db.posts = require('./posts')(sequelize,Sequelize);
db.comments = require('./comments')(sequelize,Sequelize);


db.users.hasMany(db.posts,{foreignKey:'userid',as:'postDetails'});    
db.posts.hasMany(db.comments, {foreignKey:'postid'});                        // geting all posts with their comments based on postid
db.posts.hasMany(db.users, {foreignKey:'userid'});

db.sequelize.sync()
.then(()=>{
    console.log('db synced');
})
.catch((err)=>{
    console.log(err,'db not connected');
})


module.exports = db;