var fs = require('fs');
var loopback = require('loopback');
var app_dir = '../';
var app = require('./server');

var ds = app.dataSources.mysql_test;
var db = 'naidin', owner = 'nicole';

function capitaliseFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function jsFileString(model_name){
  return '' +
    'module.exports = function(' + capitaliseFirstLetter(model_name) + ') {\n' +
      '\t\n' +
    '};';
}

function autoGenerateModelFiles(){
  ds.discoverModelDefinitions({schema:db}, function (err, models) {
    if (err) throw err;

    models.forEach(function (model) {
      ds.discoverSchema(model.name, {associations: true}, function (err, schema) {
        if( schema.options.mysql.schema !== db ){
          console.log('options.mysql.schema !== db', schema);
        }
        fs.writeFile( app_dir + 'common/models/' + model.name + '.json', JSON.stringify(schema, null, '  '), function (err) {
          if (err) throw err;
          console.log('Saved ' + model.name);
        });
        fs.writeFile( app_dir + 'common/models/' + model.name + '.js', jsFileString(model.name), function (err) {
          if (err) throw err;
          console.log('Created ' + model.name + '.json file');
        });
      });
    });
  });
}

autoGenerateModelFiles();
