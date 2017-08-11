'use strict';

exports.register = function (server, options, next) {
    server.ext('onRequest', function(request, reply) {
        request.timing = {
            start: new Date().getTime()
        };
        return reply.continue();
    });
    server.ext('onPreResponse', function(request, reply) {
        if (!request.timing && request.timing.start) {
            request.timing = {
                err: 'arrived in `onPreResponse` without request start time'
            };
        } else {
            let start = parseInt(request.timing.start),
                finish = new Date().getTime(),
                elapsed = finish - start;

            request.response.header('request-timing-elapsed', elapsed);
        }

        return reply.continue();
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};