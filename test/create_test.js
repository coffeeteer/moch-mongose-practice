const assert = require('assert');
const User = require('../src/user');

describe('Test creating a new user', () => {

  it('Creates a user', (done) => {
    let joe = new User({name: 'Joe'});

    joe.save()
      .then(() => {
        console.log(joe);
        console.log(joe.name);
        assert(!joe.isNew);
        assert(joe.name === 'Joe');
        done();
      });
  });

});
