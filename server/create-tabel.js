var server = require('./server');
var ds = server.dataSources.mysql_test;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Book', 'Library'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
