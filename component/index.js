'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ComponentGenerator, yeoman.generators.NamedBase);

ComponentGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  var prompts = [{
    type: 'input',
    name: 'description',
    message: 'Please provide a description for your component'
  }];

  this.prompt(prompts, function (props) {
    this.description = props.description;
    cb();
  }.bind(this));
};

ComponentGenerator.prototype.create = function create() {

  this.write('_' + this.name.toLowerCase() + '.sass', [
    '/**',
    ' * COMPONENTS',
    ' * ' + this.name,
    ' * ' + this.description,
    ' */'
  ].join('\n'));

};
