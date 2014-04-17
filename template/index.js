'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var TemplateGenerator = module.exports = function TemplateGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(TemplateGenerator, yeoman.generators.NamedBase);

TemplateGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  var prompts = [{
    type: 'input',
    name: 'description',
    message: 'Please provide a description for your template'
  }];

  this.prompt(prompts, function (props) {
    this.description = props.description;
    this.fsTemplateName = this.name.toLowerCase().replace(/\s/g, '-');
    cb();
  }.bind(this));
};

TemplateGenerator.prototype.create = function create() {

  this.template('template.html', this.fsTemplateName + '.html', {
    templateName: this.name
  });

};

TemplateGenerator.prototype.updateTOC = function updateTOC() {

  this.appendToFile('index.html', 'ul', '  <li><a href="' + this.fsTemplateName + '.html">' + this.name + '</a></li>\n  ');
  console.log('Table of Contents updated');

};
