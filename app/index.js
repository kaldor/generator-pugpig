'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var themeFolder;
var appDir;


var PugpigGenerator = module.exports = function PugpigGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    process.chdir(themeFolder);
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PugpigGenerator, yeoman.generators.Base);

PugpigGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'list',
    name: 'templateType',
    choices: ['Static', 'Drupal', 'Wordpress'],
    message: 'What type of Pugpig template would you like to create?'
  },
  {
    type: 'input',
    name: 'publisherName',
    message: 'What is the name of the publisher?'
  },
  {
    type: 'input',
    name: 'publicationName',
    message: 'What is the name of the publication?'
  }];

  this.prompt(prompts, function (props) {

    this.templateType = props.templateType;
    this.publisherName = props.publisherName;
    this.publicationName = props.publicationName;

    cb();
  }.bind(this));
};

PugpigGenerator.prototype.appStructure = function appStructure() {

  var projectName = this.publisherName + '-' + this.publicationName + '-Server',
    projectData = {
      projectName: projectName
    },
    modulesFolder;

  themeFolder = 'themes/' + this.publicationName.toLowerCase() + '/';
  appDir = themeFolder + 'app/';

  this.mkdir('themes');
  this.mkdir(themeFolder);

  if (this.templateType === 'Drupal') {
    modulesFolder = 'modules';
  } else if (this.templateType === 'Wordpress') {
    modulesFolder = 'plugins';
  }

  if ( modulesFolder ) {
    this.mkdir(modulesFolder);
    this.mkdir(modulesFolder + '/pugpig-' + this.publicationName.toLowerCase());
  }

  this.mkdir(appDir);

  this.directory('static', appDir + 'static');
  this.directory('styles', appDir + 'styles');

  this.mkdir(appDir + 'static/images');
  this.mkdir(appDir + 'styles/components');

  this.template('index.html', appDir + 'static/index.html', projectData);

  this.copy('Gruntfile.js', themeFolder + 'Gruntfile.js');

  this.template('_package.json', themeFolder + 'package.json', projectData);

  this.template('_bower.json', themeFolder + 'bower.json', projectData);

};

PugpigGenerator.prototype.createImagesDir = function createImagesDir() {
  this.mkdir(appDir + 'images');
};

PugpigGenerator.prototype.createScriptsDir = function createScriptsDir() {
  this.mkdir(appDir + 'scripts');
};

PugpigGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', themeFolder + '.editorconfig');
  this.copy('jshintrc', themeFolder + '.jshintrc');
};

PugpigGenerator.prototype.gitFiles = function gitFiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitmodules', '.gitmodules');
};

PugpigGenerator.prototype.karmaFiles = function karmaFiles() {
  this.copy('karma.conf.js', themeFolder + 'karma.conf.js');
};

PugpigGenerator.prototype.compassFiles = function compassFiles() {
  this.copy('compass.rb', themeFolder + '.compass.rb');
};
