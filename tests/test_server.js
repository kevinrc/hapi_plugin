var Hapi = require('hapi');
var test_server = new Hapi.Server();

test_server.connection({port: 3000});
test_server.register({
  register: require('../index')
});

test_server.route([{
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    setTimeout(
        function() {
            reply('done after 1 seconds')
        }, 1000
    );
}
}]);

test_server.route([{
    method: 'GET',
    path: '/noStart',
    handler: function(request, reply) {
      setTimeout(
          function() {
              request.timing = undefined;
              reply('done after 1 seconds')
          }, 1000
      );
  }
  }]);
  
module.exports = test_server;