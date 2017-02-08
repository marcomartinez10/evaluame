'use strict';

const Hapi = require('hapi');
var Path = require('path');

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : 'root',
  password : '',
  database : 'evaluame'
});

const server = new Hapi.Server();

server.connection({
    host: process.env.IP,
    port: process.env.PORT
});

server.register(require('vision'), function(err) {

  if (err) {
    throw err;
  }
  server.route({
      method: 'GET',
      path:'/',
      handler: function (request, reply) {


          connection.query('SELECT * FROM Evaluaciones', function (error, results, fields) {
            if (error) throw error;
          return reply.view('index', {name: results[0].Profesor});
          });

      }
  });

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates'
  });

});


connection.connect();



// connection.end();

// brew services start mysql

// Create a server with a host and port


// Add the route


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
