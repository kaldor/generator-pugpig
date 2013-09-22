'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var generateTestingLibraries = function generateTestingLibraries() {
  this.mkdir('test');
  this.directory('lib', 'test/lib');
};

var generateFunctionalTests = function generateFunctionalTests() {
  this.directory('functional', 'test/functional');
};

var generateUnitTests = function generateUnitTests() {
  this.directory('unit', 'test/unit');
  this.copy('test-main.js','test/test-main.js');
  this.copy('karma.conf.js', 'karma.conf.js');
};

var TestingGenerator = module.exports = function TestingGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.

  yeoman.generators.NamedBase.apply(this, arguments);

  generateTestingLibraries.call( this );

  if ( this.name === 'functional' ) {

    generateFunctionalTests.call( this );
  } else if ( this.name === 'unit' ) {
    generateUnitTests.call( this );
  } else if ( this.name === 'all' ) {
    generateUnitTests.call( this );
    generateFunctionalTests.call( this );
  }

};

util.inherits(TestingGenerator, yeoman.generators.NamedBase);

TestingGenerator.prototype.init = function() {
  // Required. Do not remove.
};