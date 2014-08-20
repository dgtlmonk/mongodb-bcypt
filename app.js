var mongoose = require('mongoose'),
    User = require('./model/user');

var connStr = 'mongodb://localhost:27017/mongo-bcrypt-test';
mongoose.connect(connStr, function (err){
    if (err) throw err;
    console.log('Successfully connect to MongoDB');
})

// define new user
var tmpUser = 'kamikaze_' + Math.round(Math.random()*30);

// create new user
var testUser = new User({
  username:tmpUser,
  password:'test123'
});



// save user to database
testUser.save( function (err){
  console.log('@testUser save ---');
    if (err) throw err;

    // fetch user and test password verification
    User.findOne({username:tmpUser}, function (err, user){
      console.log('@findOne username:"'+ tmpUser  + '" --- ');
        if (err) throw err;

        // test maching password
        user.comparePassword('test123', function (err, isMatch){
            if (err) throw err;
            console.log('test123:', isMatch); // should be true
        });

        // test failing password
       user.comparePassword('test1231', function (err, isMatch){
            if (err) throw err;
            console.log('test1231:', isMatch); // should be true
        });
        console.log('@findOne username: ' + tmpUser + ' ends ----');
        mongoose.disconnect();
        process.exit(0);
    })
 console.log('@testUser save ends ---');
})
