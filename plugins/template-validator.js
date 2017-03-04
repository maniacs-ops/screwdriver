'use strict';

const validator = require('screwdriver-template-validator');

exports.register = (server, options, next) => {
    server.route({
        method: 'POST',
        path: '/validator/template',
        config: {
            handler: (request, reply) => {
                // rip eslint
                const result = validator(request.payload.yaml)
                .then((stuff) => {
                    reply(stuff);
                }, (validationErr) => {
                    reply({
                        error: validationErr
                    });
                });

                return result;
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'template-validator'
};
