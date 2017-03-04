'use strict';

const assert = require('chai').assert;
const hapi = require('hapi');

const TEST_INPUT = require('../data/template-validator.input.json');
const MISSING_VERSION_INPUT = require('../data/template-validator.missing-version.json');

describe.only('template validator plugin test', () => {
    let plugin;
    let server;

    beforeEach(() => {
        /* eslint-disable global-require */
        plugin = require('../../../plugins/template-validator');
        /* eslint-enable global-require */

        server = new hapi.Server();

        server.connection({
            port: 1234
        });

        return server.register([{
            register: plugin
        }]);
    });

    it('registers', () => {
        assert.isOk(server.registrations['template-validator']);
    });

    describe('POST /validator/template', () => {
        it('returns OK for a successful template yaml', () => {
            // shutup eslint
            const stuff = server.inject({
                method: 'POST',
                url: '/validator/template',
                payload: TEST_INPUT
            }).then((reply) => {
                assert.strictEqual(reply.statusCode, 200);
            });

            return stuff;
        });

        it('returns OK and error yaml for bad yaml', () => {
            // rip eslint
            const stuff = server.inject({
                method: 'POST',
                url: '/validator/template',
                payload: MISSING_VERSION_INPUT
            }).then((reply) => {
                assert.strictEqual(reply.statusCode, 200);

                const payload = JSON.parse(reply.payload);

                console.log(payload.error.details);
            });

            return stuff;
        });
    });
});
