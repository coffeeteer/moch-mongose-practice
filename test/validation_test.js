const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('Requires user name', (done) => {
        const user = new User({name: undefined});
        const validationResult = user.validationSync();
        const message = validationResult.errors.message;

        assert(message === 'Name is required.');
        done();
    });
});
