const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test3', {useMongoClient: true});

mongoose.connection
  .on('error', console.error.bind(console, 'Error in connection with Mongoose DB'))
  .once('open', () => console.log('You have successfully connected to Mongoose'));

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });

});
