// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var LIVERELOAD_PORT = Math.floor(Math.random() * (39999 - 35729 + 1)) + 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var cms = <% if ( templateType === 'Drupal' ) { %>'drupal'<% } else if ( templateType === 'Wordpress' ) { %>'wordpress'<% } else { %>'YOUR_CMS'<% } %>,
    distRoot = 'dist',
    yeomanConfig = {
      app: 'app',
      dist: {
        'static': distRoot + '/pugpig-<%= publication %>-static',
        'theme': distRoot + '/pugpig-<%= publication %>-theme'
      }
    };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      sass: {
        files: ['<%%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['sass']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%%= yeoman.app %>/static/*.html',
          '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: <%= connectPort %>,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      'static': {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist['static'])
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>/static'
      }
    },
    clean: {
      'static': {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist.static %>/*',
            '!<%%= yeoman.dist.static %>/.git*'
          ]
        }]
      },
      theme: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist.theme %>/*',
            '!<%%= yeoman.dist.theme %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/styles',
          src: [
            '**/*.sass',
            '!**/_*.sass'
          ],
          dest: '<%%= yeoman.app %>/styles',
          ext: '.css'
        }]
      }
    },
    imagemin: {
      'static': {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist.static %>/images'
        }]
      },
      theme: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist.theme %>/images'
        }]
      }
    },
    svgmin: {
      'static': {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist.static %>/images'
        }]
      },
      theme: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist.theme %>/images'
        }]
      }
    },
    cssmin: {
      'static': {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        src: [
          '*.css',
          '!_*.css'
        ],
        dest: '<%%= yeoman.dist.static %>/styles',
        ext: '.css'
      },
      theme: {
        expand: true,
        cwd: '<%%= yeoman.app %>/styles',
        src: [
          '*.css',
          '!_*.css'
        ],
        dest: '<%%= yeoman.dist.theme %>/styles',
        ext: '.css'
      }
    },
    copy: {
      'static': {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist.static %>',
          src: [
            '*.{ico,png,txt,xml,manifest}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'static/**/*',
            'fonts/*'
          ]
        }]
      },
      theme: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist.theme %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,gif}',
            'styles/*.css',
            'fonts/*'
          ]
        }]
      },
      drupal: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist.theme %>',
          src: [
            '<%= publication %>.info'
          ]
        }]
      },
      wordpress: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist.theme %>',
          src: [
            'style.css'
          ]
        }]
      },
      static_scripts: {
        expand: true,
        dot: true,
        cwd: '.tmp/scripts',
        dest: '<%%= yeoman.dist.static %>/scripts',
        src: '{,*/}*.js'
      },
      theme_scripts: {
        expand: true,
        dot: true,
        cwd: '.tmp/scripts',
        dest: '<%%= yeoman.dist.theme %>/scripts',
        src: '{,*/}*.js'
      },
      static_bower_components: {
        expand: true,
        dot: true,
        cwd: '.tmp/bower_components',
        dest: '<%%= yeoman.dist.static %>/bower_components',
        src: '**/*'
      },
      theme_bower_components: {
        expand: true,
        dot: true,
        cwd: '.tmp/bower_components',
        dest: '<%%= yeoman.dist.theme %>/bower_components',
        src: '**/*'
      }
    },
    concurrent: {
      server: [
        'sass'
      ],
      'static': [
        'sass',
        'imagemin:static',
        'svgmin:static'
      ],
      theme: [
        'sass',
        'imagemin:theme',
        'svgmin:theme'
      ]
    },
    replace: {
      drupal: {
        src: ['<%%= yeoman.dist.theme %>/<%= publication %>.info'],
        overwrite: true,
        replacements: [{
          from: /version\s*=\s*".*?"/g,
          to: "version =\"7.x-<%%= grunt.config('meta-version').toString().replace(/\.([^\.]*)$/g, '_$1') %>\""
        }]
      },
      wordpress: {
        src: ['<%%= yeoman.dist.theme %>/style.css'],
        overwrite: true,
        replacements: [{
          from: /Version: [0-9]*\.[0-9]*\.[0-9]*/g,
          to: "Version: <%%= grunt.config('meta-version') %>"
        }]
      }
    },
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist.static %>'
      },
      html: '<%%= yeoman.app %>/static/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%%= yeoman.dist.static %>']
      },
      html: ['<%%= yeoman.dist.static %>/static/{,*/}*.html']
    },
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          findNestedDependencies: true
        }
      }
    },
    rename: {
      bower_components: {
        files: [{
          src: [ distRoot + '/bower_components' ],
          dest: '.tmp/bower_components'
        }]
      },
      scripts: {
        files: [{
          src: [ distRoot + '/scripts' ],
          dest: '.tmp/scripts'
        }]
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:static:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  var buildJSTasks = [
      'useminPrepare',
      'requirejs',
      'uglify',
      'usemin',
      'rename'
    ],
    buildThemeTasks = [
      'clean:theme',
      'concurrent:theme',
      'copy:theme',
      'copy:' + cms,
      'cssmin:theme',
      'describe',
      'replace:' + cms
    ],
    buildStaticTasks = [
      'clean:static',
      'concurrent:static',
      'copy:static',
      'cssmin:static'
    ],
    copyThemeJSTasks = [
      'copy:theme_scripts',
      'copy:theme_bower_components'
    ],
    copyStaticJSTasks = [
      'copy:static_scripts',
      'copy:static_bower_components'
    ];

  grunt.registerTask('build', [
    <% if ( templateType === 'Static' ) { %>//<% } %>'build:theme:nojs',
    'build:static:nojs'
  ].concat(
    // buildJSTasks,
    // copyStaticJSTasks,
    // copyThemeJSTasks,
    'clean:server'
  ));

  grunt.registerTask( 'build:theme', buildThemeTasks.concat( buildJSTasks, copyThemeJSTasks, 'clean:server' ));
  grunt.registerTask( 'build:theme:nojs', buildThemeTasks );

  grunt.registerTask( 'build:static', buildStaticTasks.concat( buildJSTasks, copyStaticJSTasks, 'clean:server' ));
  grunt.registerTask( 'build:static:nojs', buildStaticTasks );

  // TODO: npm module that performs this task
  grunt.registerTask('describe', 'Describes current git commit', function (prop) {

    var done = this.async();

    grunt.log.write('Describe current commit: ');

    grunt.util.spawn({
      cmd: 'git',
      args: [ 'describe', '--tags', '--abbrev=0', '--match', '[0-9]*' ]
    }, function (err, result) {

      var latestVersion = err ? '0.0.0' : result.toString().trim();

      grunt.util.spawn({
        cmd : 'git',
        args : [ 'describe', '--tags', '--abbrev=0', '--exact-match', 'HEAD' ]
      }, function (err, result) {

        if (err || latestVersion !== result) {
          latestVersion = latestVersion + '_dev';
        }

        grunt.util.spawn({
          cmd : 'git',
          args : [ 'diff', '--shortstat' ]
        }, function (err, result) {
          if (err) {
            grunt.log.error(err);
            return done(false);
          }

          if ( result.toString().trim().length ) {
            latestVersion = latestVersion + '_local';
          }

          grunt.config(prop || 'meta-version', latestVersion);

          grunt.log.ok(latestVersion);

          done( latestVersion );

        });

      });

    });

  });

  grunt.registerTask('default', [
    'build'
  ]);

};
