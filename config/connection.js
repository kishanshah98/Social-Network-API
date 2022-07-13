const { connect, connection } = require('mongoose');

// Connection
connect('mongodb://localhost/reactionsAndThoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
