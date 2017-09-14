const assert = require('assert');
const User = require('../src/user');

describe('Different ways of updating documents', () => {
  let jen;

  beforeEach((done) => {
      jen = new User({name: 'Jen', likes: 0});
      jen.save()
        .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Jennifer');
        done();
      });
  }

  it('Updates a user with the Set n Save', (done) => {
    jen.set('name', 'Jennifer');
    assertName(jen.save(), done);
  });

  it('updating an instance with a model', (done) => {
    assertName(jen.update({name: 'Jennifer'}), done)
  });

  it('Updating an instance model Class', (done) => {
    assertName(
      User.update({name: 'Jen'}, {name: 'Jennifer'}),
      done
    );
  });

  it('Updating a model with only with only one instance', (done) => {
    assertName(
      User.findOneAndUpdate({name: 'Jen'}, {name: 'Jennifer'}),
      done
    );
  });

  it('Updating a model using an Id', (done) => {
    assertName(
      User.findByIdAndUpdate(jen._id, {name: 'Jennifer'}),
      done
    );
  });
});
