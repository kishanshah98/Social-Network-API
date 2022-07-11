const { connect, connection } = require('mongoose');

connect('mongodb://localhost/reactionsAndThoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
