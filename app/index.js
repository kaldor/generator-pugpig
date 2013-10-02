'use strict';
var util = require('util');
var path = require('path');
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var exec = childProcess.exec;
var yeoman = require('yeoman-generator');
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');

var DRUPAL = 'Drupal';
var WORDPRESS = 'Wordpress';
var STATIC = 'Static';
var promptData = {
  templateType: null,
  publisherName: null,
  publicationName: null
};
var themeFolder;
var appDir;

var writeBuildXML = function writeBuildXML( template ) {
  fs.writeFile('build.xml', template({
    publisher: promptData.publisherName.toLowerCase(),
    publication: promptData.publicationName.toLowerCase()
  }), function (err) {
    if ( err !== null ) {
      console.log( 'Write file error: ' + err );
    }
    console.log('build.xml created');
  });
};

var generateBuildXML = function generateBuildXML() {

  var templateType = promptData.templateType,
    buildTemplateFile;

  if (templateType === DRUPAL) {
    buildTemplateFile = 'buildutils/template-build-drupal_and_static.xml';
  } else if (templateType === WORDPRESS) {
    buildTemplateFile = 'buildutils/template-build-wordpress_and_static.xml';
  } else if (templateType === STATIC) {
    buildTemplateFile = 'buildutils/template-build-static.xml';
  }

  fs.readFile(buildTemplateFile, {
    encoding: 'utf8',
  }, function(err, data) {
    if (err !== null) {
      console.log( 'Read file error: ' + err );
    } else {

      var buildTemplate = _.template( data );

      writeBuildXML( buildTemplate );

    }
  });

};

var addGitSubmodules = function addGitSubmodules() {
  exec('git submodule add git@bitbucket.org:kaldorgroup/kaldor-build-utils.git buildutils', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    if (stderr) {
      console.log('stderr: ' + stderr);
    }
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      generateBuildXML();
    }
  });
};

var initGit = function initGit() {
  var init = spawn('git', ['init']);

  init.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  init.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  init.on('close', function () {
    addGitSubmodules();
  });
};

var PugpigGenerator = module.exports = function PugpigGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    process.chdir(themeFolder);
    this.installDependencies({ skipInstall: options['skip-install'] });
    process.chdir('../../');
    initGit.call( this );
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

util.inherits(PugpigGenerator, yeoman.generators.Base);

PugpigGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var pugpig = chalk.cyan('\n                                                                ' +
  '\n                                                88              ' +
  '\n                                                                ' +
  '\n8b,dPPYba,  88       88  ,adPPYb,d8 8b,dPPYba,  88  ,adPPYb,d8  ' +
  '\n88P\'    "8a 88       88 a8"    `Y88 88P\'    "8a 88 a8"    `Y88  ' +
  '\n88       d8 88       88 8b       88 88       d8 88 8b       88  ' +
  '\n88b,   ,a8" "8a,   ,a88 "8a,   ,d88 88b,   ,a8" 88 "8a,   ,d88  ' +
  '\n88`YbbdP"\'   `"YbbdP\'Y8  `"YbbdP"Y8 88`YbbdP"\'  88  `"YbbdP"Y8  ' +
  '\n88                       aa,    ,88 88              aa,    ,88  ' +
  '\n88                        "Y8bbdP"  88               "Y8bbdP"   ' +
  '\n                                                                ' +
  '\n                                                                ');

  console.log(pugpig);

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

    promptData.templateType = props.templateType;
    promptData.publisherName = props.publisherName;
    promptData.publicationName = props.publicationName;

    cb();
  }.bind(this));
};

PugpigGenerator.prototype.appStructure = function appStructure() {

  var projectName = promptData.publisherName + '-' + promptData.publicationName + '-Server',
    projectData = {
      projectName: projectName
    },
    templateType = promptData.templateType,
    modulesFolder;

  themeFolder = 'themes/' + promptData.publicationName.toLowerCase() + '/';
  appDir = themeFolder + 'app/';

  this.mkdir('themes');
  this.mkdir(themeFolder);

  if (templateType === DRUPAL) {
    modulesFolder = 'modules/';
  } else if (templateType === WORDPRESS) {
    modulesFolder = 'plugins/';
  }

  if ( modulesFolder ) {
    this.mkdir(modulesFolder);
    this.mkdir(modulesFolder + 'pugpig-' + promptData.publicationName.toLowerCase());
  }

  if (templateType === DRUPAL) {
    this.template('drupal/theme.info', appDir + promptData.publicationName.toLowerCase() + '.info', {
      publication: promptData.publicationName
    });
    this.copy('drupal/template.php', appDir + 'template.php');
  } else if (templateType === WORDPRESS) {
    this.template('wordpress/plugins.php', modulesFolder + 'pugpig-' + promptData.publicationName.toLowerCase() + '/pugpig_' + promptData.publicationName.toLowerCase() + '.php', {
      publicationCapitalized: promptData.publicationName,
      publicationLowercase: promptData.publicationName.toLowerCase()
    });
    this.template('wordpress/style.css', appDir + 'style.css', {
      publicationName: promptData.publicationName
    });
  }

  this.mkdir(appDir);

  this.directory('static', appDir + 'static');
  this.directory('styles', appDir + 'styles');

  this.mkdir(appDir + 'static/images');
  this.mkdir(appDir + 'styles/components');

  this.template('index.html', appDir + 'static/index.html', projectData);

  this.template('Gruntfile.js', themeFolder + 'Gruntfile.js', {
    publication: promptData.publicationName.toLowerCase(),
    pkg: this.pkg,
    templateType: promptData.templateType
  });

  this.template('_package.json', themeFolder + 'package.json', projectData);

  this.template('_bower.json', themeFolder + 'bower.json', projectData);
  this.copy('bowerrc', themeFolder + '.bowerrc');

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
};

PugpigGenerator.prototype.compassFiles = function compassFiles() {
  this.copy('compass.rb', themeFolder + '.compass.rb');
};
