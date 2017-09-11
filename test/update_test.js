const assert = require('assert');
const User = require('../src/user');

let jen;

describe('Updating records',() => {


  beforeEach((done) => {
    jen = new User({name: 'Jen', likes: 0});

    jen.save()
      .then(() => done())
  });

  function assertName(operation, done){
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Jennifer');
        done();
      });
  }

  it('Updating an instance with the \'Set n Save\' method', (done) => {
    jen.set('name', 'Jennifer');
    assertName( jen.save(), done);
  });
});
