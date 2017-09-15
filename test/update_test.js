const assert = require('assert');
const User = require('../src/user');

describe('Updating instances in a document', () => {
  let jen;

  beforeEach((done) => {
    jen = new User({name: 'Jen', likes: 0});
    jen.save()
      .then(()=> done());
  });

  function assertName(operation, done){
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Jennifer');
        done();
      })
  }

  it('Updating an instance with Set n Save', (done) => {
    jen.set('name', 'Jennifer');
    assertName(jen.save(), done);
  });

  it('Updating with a model instance', (done) => {
    assertName(jen.update({name: 'Jennifer'}), done);
  });

  it('Updating a model Class', (done) => {
    assertName(
      User.update({name: 'Jen'}, {name: 'Jennifer'}),
      done
    );
  });

  it('a model class can update one record', (done) => {
		assertName(
			User.findOneAndUpdate({name: 'Jen'}, {name: 'Jennifer'}),
			done
		);
	});

  it('Find a record with an id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(jen._id, {name: 'Jennifer'}),
      done
    );
  });

  xit('A user can have their post incremented by one', (done) => {
    User.update({name: 'Jen'}, {$inc: [likes: 10]})
      .then(() => User.findOne({name: 'Jen'}))
      .then((user) => {
        assert(user.likes === 10);
        done();
      })
  });
});
