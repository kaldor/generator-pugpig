'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var childProcess = require('child_process');
var exec = childProcess.exec;
var _ = require('lodash');

var generateTestingLibraries = function generateTestingLibraries() {
  fs.exists('test', _.bind( function( exists ) {
    if ( !exists ) {
      this.mkdir('test');
      this.directory('lib', 'test/lib');
    }
  }, this ) );
};

var generateFunctionalTests = function generateFunctionalTests() {
  this.directory('functional', 'test/functional');
};

var generateUnitTests = function generateUnitTests() {
  this.directory('unit', 'test/unit');
  this.copy('test-main.js','test/test-main.js');
  this.copy('karma.conf.js', 'karma.conf.js');
};

var generateVisualRegressionTests = function generateVisualRegressionTests( move ) {
  exec('git clone https://github.com/kaldor/pugpig-css-regression.git visual-regression', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    if (stderr) {
      console.log('stderr: ' + stderr);
    }
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      if ( move ) {
        fs.rename('visual-regression','test/visual-regression');
      }
    }
  });
};

var generateHTMLValidationTests = function generateHTMLValidationTests( move ) {
  exec('git clone https://github.com/kaldor/pugpig-feed-page-validator.git feed-page-validator', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    if (stderr) {
      console.log('stderr: ' + stderr);
    }
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      if ( move ) {
        fs.rename('feed-page-validator','test/feed-page-validator');
      }
    }
  });
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
  } else if ( this.name === 'css' ) {
    generateVisualRegressionTests.call( this );
  } else if ( this.name === 'html' ) {
    generateHTMLValidationTests.call( this );
  } else if ( this.name === 'all' ) {
    generateUnitTests.call( this );
    generateFunctionalTests.call( this );
    generateVisualRegressionTests.call( this, true );
    generateHTMLValidationTests.call( this, true );
  }

};

util.inherits(TestingGenerator, yeoman.generators.NamedBase);

TestingGenerator.prototype.init = function() {
  // Required. Do not remove.
};