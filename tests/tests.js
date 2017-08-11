var test = require('tape');
var server = require('./test_server');

test.onFinish(() => {
	process.exit();
});

test('request should return 200', (t) => {
    var options = {
            method: "GET",
            url: "/"
        };

    server.start((err) => {
        if (err) {
            console.log(err)
        }
        server.inject(options, function (response) {
            t.equal(response.statusCode, 200, '200 status code returned - ✅');
            server.stop(t.end);
        });
    });
});

test('request should contain request-timing-elapsed header', (t) => {
    var options = {
            method: "GET",
            url: "/"
        };

    server.start((err) => {
        if (err) {
            console.log(err)
        }
        server.inject(options, function (response) {
            t.ok(response.headers['request-timing-elapsed'], 'header should exist - ✅');
            t.ok(response.headers['request-timing-elapsed'] > 1000, 'header value should be at least 1000 - ✅');
            server.stop(t.end);
        })
    });
});