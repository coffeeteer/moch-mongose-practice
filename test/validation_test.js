const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('Requires a user name', (done) => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;

        assert(message === 'Name is required.');
        done();
    });

    it('Requires a user name longer than two characters', (done) => {
        const user = new User({name: 'JW'});
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;

        assert(message === 'Name must be longer than two characters.');
        done();
    });

    it('Disallows invalid messages from being saved', (done) => {
        const user = new User({name: 'JW'});
        user.save()
            .catch((validateResults) => {
                const message = validateResults.errors.name.message;
                assert(message === 'Name must be longer than two characters.');
                done();
            });
    });
});
