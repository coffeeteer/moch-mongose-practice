const assert = require('assert');
const User = require('../src/user');

describe('Updating options with mongoose', () => {
  let jen;

  beforeEach((done) => {
    jen = new User({name: 'Jen', likes: 0});
    jen.save()
      .then(() => done());
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

  it('Updates an instance with Set n Save', (done) => {
    jen.set('name', 'Jennifer')
    assertName(jen.save(), done);
  });

  it('Updates with a model instance', (done)=>{
    assertName(jen.update({name: 'Jennifer'}), done)
  });

  it('Updating a model class', (done) =>{
    assertName(
      User.findOneAndUpdate({name: 'Jen'}, {name: 'Jennifer'}),
      done
    );
  });
});
